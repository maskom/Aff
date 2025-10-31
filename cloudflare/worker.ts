export interface Env {
  AFF_STATIC: KVNamespace;
  AFF_API_BASE?: string;
}

const CACHE_TTL_SECONDS = 60 * 5;

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

async function proxyApi(request: Request, env: Env) {
  if (!env.AFF_API_BASE) {
    return new Response('API base not configured', { status: 500 });
  }

  const url = new URL(request.url);
  const targetUrl = new URL(url.pathname.replace(/^\/api/, ''), env.AFF_API_BASE);
  targetUrl.search = url.search;

  const upstream = await fetch(targetUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'manual',
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
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
