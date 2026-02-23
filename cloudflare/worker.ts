export interface Env {
  AFF_STATIC: KVNamespace;
  AFF_API_BASE?: string;
  ENVIRONMENT?: string;
}

const CACHE_TTL_SECONDS = 60 * 5;
const UPSTREAM_TIMEOUT_MS = 10000;
const ALLOWED_HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] as const;

const SENSITIVE_HEADERS = new Set([
  'host',
  'cookie',
  'authorization',
  'proxy-authorization',
  'x-request-id',
  'x-forwarded-for',
  'x-forwarded-proto',
  'x-forwarded-host',
  'x-real-ip',
  'cf-connecting-ip',
  'cf-connecting-ipv6',
  'cf-ipcountry',
  'cf-ray',
  'cf-visitor',
  'cf-worker',
]);

function generateRequestId(): string {
  return crypto.randomUUID();
}

function filterHeaders(headers: Headers): Headers {
  const filtered = new Headers();
  for (const [key, value] of headers.entries()) {
    if (!SENSITIVE_HEADERS.has(key.toLowerCase())) {
      filtered.set(key, value);
    }
  }
  return filtered;
}

function log(level: string, message: string, data: Record<string, unknown> = {}): void {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data,
    })
  );
}

async function serveStaticAsset(
  request: Request,
  env: Env,
  cache: Cache,
  requestId: string
): Promise<Response> {
  const url = new URL(request.url);
  const assetKey = url.pathname === '/' ? '/index.html' : url.pathname;
  const startTime = Date.now();

  const cacheKey = new Request(url.toString(), request);
  const cached = await cache.match(cacheKey);
  if (cached) {
    cached.headers.set('x-worker-cache', 'HIT');
    cached.headers.set('x-request-id', requestId);
    log('info', 'cache_hit', { requestId, path: url.pathname, durationMs: Date.now() - startTime });
    return cached;
  }

  const asset = await env.AFF_STATIC.get(assetKey, { type: 'arrayBuffer' });
  if (!asset) {
    log('warn', 'asset_not_found', { requestId, path: url.pathname });
    return new Response('Not Found', {
      status: 404,
      headers: { 'content-type': 'text/plain', 'x-request-id': requestId },
    });
  }

  const response = new Response(asset, {
    headers: {
      'content-type': contentType(assetKey),
      'cache-control': `public, max-age=${CACHE_TTL_SECONDS}`,
      'x-worker-cache': 'MISS',
      'x-request-id': requestId,
    },
  });

  response.headers.set('content-length', String((asset as ArrayBuffer).byteLength));
  await cache.put(cacheKey, response.clone());
  log('info', 'asset_served', {
    requestId,
    path: url.pathname,
    durationMs: Date.now() - startTime,
  });
  return response;
}

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function contentType(pathname: string): string {
  const ext = pathname.slice(pathname.lastIndexOf('.')).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

async function proxyApi(request: Request, env: Env, requestId: string): Promise<Response> {
  const startTime = Date.now();
  const method = request.method.toUpperCase();

  if (!ALLOWED_HTTP_METHODS.includes(method as (typeof ALLOWED_HTTP_METHODS)[number])) {
    log('warn', 'method_not_allowed', { requestId, method });
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: {
        'content-type': 'application/json',
        'x-request-id': requestId,
        allow: ALLOWED_HTTP_METHODS.join(', '),
      },
    });
  }

  if (!env.AFF_API_BASE) {
    log('error', 'api_base_not_configured', { requestId });
    return new Response(JSON.stringify({ error: 'Service Unavailable' }), {
      status: 503,
      headers: { 'content-type': 'application/json', 'x-request-id': requestId },
    });
  }

  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname.replace(/^\/api/, ''), env.AFF_API_BASE);
  targetUrl.search = url.search;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  const sanitizedHeaders = filterHeaders(request.headers);

  try {
    const upstream = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: sanitizedHeaders,
      body: request.body,
      redirect: 'manual',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    log('info', 'api_proxy_success', {
      requestId,
      path: url.pathname,
      method: request.method,
      status: upstream.status,
      durationMs: Date.now() - startTime,
    });

    const response = new Response(upstream.body, {
      status: upstream.status,
      headers: upstream.headers,
    });
    response.headers.set('x-request-id', requestId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      log('error', 'api_proxy_timeout', {
        requestId,
        path: url.pathname,
        method: request.method,
        durationMs: Date.now() - startTime,
      });
      return new Response(JSON.stringify({ error: 'Gateway Timeout' }), {
        status: 504,
        headers: { 'content-type': 'application/json', 'x-request-id': requestId },
      });
    }

    log('error', 'api_proxy_error', {
      requestId,
      path: url.pathname,
      method: request.method,
      error: error instanceof Error ? error.message : 'Unknown error',
      durationMs: Date.now() - startTime,
    });
    return new Response(JSON.stringify({ error: 'Bad Gateway' }), {
      status: 502,
      headers: { 'content-type': 'application/json', 'x-request-id': requestId },
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const cache = caches.default;
    const requestId = generateRequestId();

    log('info', 'request_received', {
      requestId,
      method: request.method,
      path: url.pathname,
      environment: env.ENVIRONMENT || 'unknown',
    });

    const response = url.pathname.startsWith('/api')
      ? await proxyApi(request, env, requestId)
      : await serveStaticAsset(request, env, cache, requestId);

    applySecurityHeaders(response);
    return response;
  },
};

function applySecurityHeaders(response: Response) {
  response.headers.set('strict-transport-security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('x-frame-options', 'DENY');
  response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'content-security-policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'"
  );
  response.headers.set(
    'permissions-policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  );
  response.headers.set('cross-origin-opener-policy', 'same-origin');
  response.headers.set('cross-origin-resource-policy', 'same-origin');
}
