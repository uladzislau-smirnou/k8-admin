# Project Overview

This is a Next.js project that appears to be an admin dashboard for Kubernetes (k8-admin). It uses React, TypeScript, and Tailwind CSS. The project also includes a separate build process using Vite to create a web component bundle.

# Building and Running

To run the development server, use the following command:

```bash
npm run dev
```

To build the project for production, use the following command:

```bash
npm run build
```

To start the production server, use the following command:

```bash
npm run start
```

To build the web component, you will likely need to run a Vite command. Based on the `wc-build/vite.config.ts` file, the output will be a single file named `widget.js`. A potential command to build the web component (you may need to add this to your `package.json`):

```bash
vite build --config wc-build/vite.config.ts
```

# Development Conventions

The project uses TypeScript and follows standard Next.js project structure. It also uses Tailwind CSS for styling. The `.prettierrc` file indicates that Prettier is used for code formatting.
