# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `npm run dev` - Start development server with Turbopack at http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint for code quality checks

## Architecture Overview

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS v4.

**Key Technologies:**
- Next.js 15.3.3 with App Router
- React 19
- TypeScript with strict mode
- Tailwind CSS v4 with modern inline theme configuration
- Turbopack for development builds

**Project Structure:**
- `app/` directory contains pages and layouts using App Router
- `app/layout.tsx` configures Geist fonts and global styles
- `app/globals.css` uses Tailwind v4 with CSS variables for theming
- Path aliases: `@/*` points to project root

**Styling System:**
- Tailwind CSS v4 with inline theme configuration in globals.css
- CSS variables for light/dark theming (`--background`, `--foreground`)
- Automatic dark mode via `prefers-color-scheme`
- Geist Sans and Geist Mono fonts via `next/font/google`