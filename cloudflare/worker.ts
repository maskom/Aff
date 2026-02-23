export interface Env {
  AFF_STATIC: KVNamespace;
  AFF_API_BASE?: string;
}

const CACHE_TTL_SECONDS = 60 * 5;
const API_TIMEOUT_MS = 30000;
const PROXY_ALLOWED_HEADERS = [
  'content-type',
  'content-encoding',
  'content-length',
  'cache-control',
  'etag',
  'last-modified',
  'x-request-id',
  'x-ratelimit-limit',
  'x-ratelimit-remaining',
  'x-ratelimit-reset',
];

function log(level: string, message: string, data?: Record<string, unknown>) {
  console.log(JSON.stringify({ level, message, timestamp: new Date().toISOString(), ...data }));
}

async function serveStaticAsset(request: Request, env: Env, cache: Cache) {
  const url = new URL(request.url);
  const assetKey = url.pathname === '/' ? '/index.html' : url.pathname;

  const cacheKey = new Request(url.toString(), request);
  const cached = await cache.match(cacheKey);
  if (cached) {
    cached.headers.set('x-worker-cache', 'HIT');
    return cached;
  }

  const asset = await env.AFF_STATIC.get(assetKey, { type: 'arrayBuffer' });
  if (!asset) {
    return new Response('Not Found', { status: 404 });
  }

  const response = new Response(asset, {
    headers: {
      'content-type': contentType(assetKey),
      'cache-control': `public, max-age=${CACHE_TTL_SECONDS}`,
      'x-worker-cache': 'MISS',
    },
  });

  response.headers.set('content-length', String((asset as ArrayBuffer).byteLength));
  await cache.put(cacheKey, response.clone());
  return response;
}

function contentType(pathname: string): string {
  if (pathname.endsWith('.html')) return 'text/html; charset=utf-8';
  if (pathname.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (pathname.endsWith('.css')) return 'text/css; charset=utf-8';
  if (pathname.endsWith('.json')) return 'application/json; charset=utf-8';
  if (pathname.endsWith('.svg')) return 'image/svg+xml';
  if (pathname.endsWith('.png')) return 'image/png';
  if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) return 'image/jpeg';
  return 'application/octet-stream';
}

async function proxyApi(request: Request, env: Env): Promise<Response> {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  if (!env.AFF_API_BASE) {
    log('error', 'API base not configured', { requestId });
    return new Response(JSON.stringify({ error: 'API base not configured', requestId }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname.replace(/^\/api/, ''), env.AFF_API_BASE);
  targetUrl.search = url.search;

  log('info', 'Proxying API request', { requestId, method: request.method, path: url.pathname });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const upstream = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const responseHeaders = new Headers();
    PROXY_ALLOWED_HEADERS.forEach((header) => {
      const value = upstream.headers.get(header);
      if (value) {
        responseHeaders.set(header, value);
      }
    });
    responseHeaders.set('x-request-id', requestId);

    const duration = Date.now() - startTime;
    log('info', 'API proxy completed', { requestId, status: upstream.status, duration });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    const duration = Date.now() - startTime;

    if (error instanceof Error && error.name === 'AbortError') {
      log('error', 'API proxy timeout', { requestId, duration, timeout: API_TIMEOUT_MS });
      return new Response(JSON.stringify({ error: 'Request timeout', requestId }), {
        status: 504,
        headers: { 'content-type': 'application/json' },
      });
    }

    log('error', 'API proxy error', { requestId, duration, error: error instanceof Error ? error.message : 'Unknown error' });
    return new Response(JSON.stringify({ error: 'Upstream error', requestId }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const cache = caches.default;

    const response = url.pathname.startsWith('/api')
      ? await proxyApi(request, env)
      : await serveStaticAsset(request, env, cache);

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
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'"
  );
}
