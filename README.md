# Nuxt Starter Template

Nuxt Starter Template is a minimal Nuxt 3 boilerplate that ships with sensible defaults for building performant Vue applications. It is configured for static pre-rendering of the landing route, includes Nuxt DevTools for inspection, and is ready to deploy to hosting providers such as Vercel out of the box.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Building for Production](#building-for-production)
- [Static Site Generation](#static-site-generation)
- [Deployment](#deployment)
- [Further Reading](#further-reading)

## Features
- **Nuxt 3 + Vue 3** — Modern application framework with hybrid rendering, file-based routing, and auto-imported composables.
- **Nuxt DevTools enabled** — Inspect routes, components, and performance diagnostics directly in the browser using the bundled DevTools module configured in `nuxt.config.ts`.
- **Static pre-rendering** — The default route `/` is pre-rendered during build time via Nuxt route rules, providing fast Time to First Byte for landing pages.
- **One-command deployment** — Deploy to Vercel or another Node-compatible host with zero additional configuration.

## Project Structure
Key files and directories you will interact with:

| Path | Description |
| --- | --- |
| `app.vue` | Root Vue component that currently renders the default Nuxt welcome screen. |
| `nuxt.config.ts` | Nuxt configuration enabling DevTools and declaring route rules for static pre-rendering. |
| `public/` | Public assets served as-is (for example, favicons). |
| `.nuxt/` | Auto-generated build artifacts and type declarations (ignored during development). |
| `server/tsconfig.json` | TypeScript configuration that inherits Nuxt's server defaults. |
| `package.json` | Package metadata and script definitions for building, developing, and generating the project. |

## Prerequisites
- **Node.js** 18.0 or newer. Nuxt 3 supports Node 18 LTS and later for the best developer experience.
- **Package manager** of your choice. This project ships with a `pnpm-lock.yaml` by default, but you can also use npm or yarn.

Check your versions with:

```bash
node --version
pnpm --version
```

## Installation
Install dependencies using your preferred package manager:

```bash
# pnpm (recommended)
pnpm install

# npm
npm install

# yarn
yarn install
```

After installation, Nuxt runs `nuxt prepare` automatically (via the `postinstall` script) to generate type definitions.

## Available Scripts
Run any of the following scripts from the project root:

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `pnpm dev` | Starts the Nuxt development server with hot module replacement on `http://localhost:3000`. |
| `build` | `pnpm build` | Compiles the application for production, generating the `.output/` directory. |
| `preview` | `pnpm preview` | Serves the production build locally for verification. |
| `generate` | `pnpm generate` | Generates a fully static version of the site, outputting pre-rendered HTML files. |

_Replace `pnpm` with `npm run` or `yarn` if you use a different package manager._

## Development Workflow
1. Install dependencies (`pnpm install`).
2. Run the development server (`pnpm dev`).
3. Open `http://localhost:3000` to preview the app. Edits to Vue files are reflected instantly thanks to Vite-powered HMR.
4. Customize `app.vue` or add files under `pages/` to create new routes. Nuxt automatically maps files to routes.

> Tip: Use Nuxt DevTools by pressing <kbd>Alt</kbd> + <kbd>D</kbd> in the browser to inspect the app structure, view routing information, and analyze performance during development.

## Building for Production
To create an optimized build:

```bash
pnpm build
```

The compiled output is placed in `.output/`. You can run `pnpm preview` to simulate the production environment locally before deploying.

## Static Site Generation
If you prefer a static site:

```bash
pnpm generate
```

Nuxt will produce pre-rendered HTML in the `dist/` directory. Because the index route is already set to be prerendered, the generated output is ready for static hosting providers.

## Deployment
This starter works seamlessly with Vercel:

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Create a new project on Vercel and import the repository.
3. Vercel detects Nuxt automatically and builds the project using `pnpm build` (or your chosen package manager).
4. Each commit triggers a new deployment preview.

For alternative hosts (Netlify, Render, etc.), follow their Nuxt deployment guides and point to the production build directory.

## Further Reading
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Nuxt DevTools](https://devtools.nuxt.com/)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
- [Vercel Nuxt Quickstart](https://vercel.com/guides/deploying-nuxt-with-vercel)
