# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking

## Project Architecture

This is a Next.js 15 application with TypeScript and React 19. The project uses:

- **App Router**: Pages are defined in the `app/` directory following Next.js 13+ app router structure
- **TypeScript**: Configured with loose settings (`strict: false`) for flexibility
- **Package Manager**: Uses pnpm with specific version 10.12.4
- **Language**: Japanese locale (`lang="ja"` in root layout)

### Key Files

- `app/layout.tsx` - Root layout component with Japanese locale
- `app/page.tsx` - Home page component (currently minimal)
- `eslint.config.mjs` - ESLint configuration with React, TypeScript, and accessibility rules
- `tsconfig.json` - TypeScript configuration with Next.js plugin

### Code Style

- Uses ESLint with TypeScript, React, React Hooks, and JSX A11y plugins
- Prettier for code formatting
- Unused variables with underscore prefix are allowed
- React imports not required in JSX files
- Accessibility rules enforced via jsx-a11y plugin

## Development Notes

- The project is in early stages with minimal page content
- TypeScript strict mode is disabled
- No testing framework is currently configured
- Uses modern React patterns (React 19, Next.js 15)