export interface Env {
  AFF_STATIC: KVNamespace;
  AFF_API_BASE?: string;
}

const CACHE_TTL_SECONDS = 60 * 5;

function generateRequestId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function getOrCreateRequestId(request: Request): string {
  const existingId = request.headers.get('x-request-id');
  if (existingId && /^[a-f0-9-]{16,36}$/i.test(existingId)) {
    return existingId;
  }
  return generateRequestId();
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

async function proxyApi(request: Request, env: Env, requestId: string) {
  if (!env.AFF_API_BASE) {
    return new Response('API base not configured', { status: 500 });
  }

  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname.replace(/^\/api/, ''), env.AFF_API_BASE);
  targetUrl.search = url.search;

  const proxyHeaders = new Headers(request.headers);
  proxyHeaders.set('x-request-id', requestId);

  try {
    const upstream = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: proxyHeaders,
      body: request.body,
      redirect: 'manual',
    });

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set('x-request-id', requestId);

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upstream request failed';
    return new Response(JSON.stringify({ error: message, requestId }), {
      status: 502,
      headers: { 'content-type': 'application/json', 'x-request-id': requestId },
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const cache = caches.default;
    const requestId = getOrCreateRequestId(request);

    const response = url.pathname.startsWith('/api')
      ? await proxyApi(request, env, requestId)
      : await serveStaticAsset(request, env, cache);

    response.headers.set('x-request-id', requestId);
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
}
