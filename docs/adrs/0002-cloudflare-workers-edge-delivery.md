# ADR-0002: Cloudflare Workers for Edge Delivery

## Status

Accepted

## Context

The Affiliate Connect application requires a globally performant delivery mechanism that can:

- Serve pre-rendered static assets with minimal latency
- Proxy API requests to affiliate networks securely
- Enable edge caching for improved response times
- Scale automatically without infrastructure management overhead

Traditional server hosting or simple CDN solutions would require separate configuration for static assets, API proxying, and caching logic, increasing operational complexity.

## Decision

We will use Cloudflare Workers as the edge delivery layer for the application:

1. **Static Asset Serving**: Workers serve pre-rendered Nuxt assets from Cloudflare KV storage
2. **API Proxying**: Requests to `/api/*` are proxied to upstream affiliate APIs with proper error handling
3. **Edge Caching**: Responses are cached using Cloudflare's cache API with configurable TTLs
4. **Security Headers**: Workers apply security headers (CSP, HSTS, etc.) uniformly across all responses

The Worker implementation lives in `cloudflare/worker.ts` and is deployed via Wrangler.

## Consequences

### Benefits

- Sub-50ms response times for cached assets globally
- Single codebase handles both static and dynamic routing
- Built-in DDoS protection and SSL termination
- Seamless integration with KV for asset storage
- Future-ready for Durable Objects (Phase 4, AFF-15)
- Zero cold-start concerns compared to serverless functions

### Drawbacks

- Vendor lock-in to Cloudflare ecosystem
- Limited compute time per request (can be mitigated with proper architecture)
- Local development requires Wrangler for full feature parity

### Impact on Existing Systems

- Deployment pipeline requires Wrangler configuration (AFF-05)
- Preview deployments can leverage Cloudflare's PR previews (AFF-09)

## Alternatives Considered

1. **Vercel Edge Functions**: Good DX but less control over caching; pricing model less predictable at scale
2. **AWS Lambda@Edge**: More complex configuration; higher latency for cold starts
3. **Traditional VPS with CDN**: More operational overhead; requires separate caching layer setup
4. **Netlify Functions**: Simpler but less flexible for custom routing and caching logic

## References

- Task: AFF-00 (Establish documentation baseline)
- Task: AFF-05 (Cloudflare deployment pipeline)
- Task: AFF-09 (Preview deployments)
- Implementation: `cloudflare/worker.ts`
- Architecture: `docs/ARCHITECTURE.md` (Cloudflare Integration section)
