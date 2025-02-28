
## Applications

### Docs (`apps/docs`)

A Next.js application that serves as documentation for the design system.

- **Tech Stack**: Next.js, React 19, Tailwind CSS
- **Purpose**: Showcases and documents the UI components
- **Features**:
  - Component examples
  - Theme switching (light/dark/system)
  - Custom header with search functionality

### Web (`apps/web`)

A Next.js application that serves as a web application using the design system.

- **Tech Stack**: Next.js, React 19, Tailwind CSS
- **Purpose**: Example implementation of the design system in a real application

## Packages

### UI (`packages/ui`)

The core UI component library built with React and Tailwind CSS.

- **Tech Stack**: React 19, Tailwind CSS 4, shadcn
- **Components**:
  - Button (with multiple variants)
  - More components to be added (all from ShadCn + custom)
- **Features**:
  - Light/dark mode support
  - Custom theming capabilities
  - Utility functions for styling

### ESLint Config (`packages/eslint-config`)

Shared ESLint configurations for consistent code quality across the monorepo.

- **Configurations**:
  - `base.js`: Base ESLint configuration for all projects
  - `next.js`: Configuration for Next.js applications
  - `react-internal.js`: Configuration for React libraries

### TypeScript Config (`packages/typescript-config`)

Shared TypeScript configurations for consistent type checking across the monorepo.

- **Configurations**:
  - `base.json`: Base TypeScript configuration
  - `nextjs.json`: Configuration for Next.js applications
  - `react-library.json`: Configuration for React libraries

## Development Workflow

The monorepo uses Turborepo for task orchestration and PNPM as the package manager.

### Available Scripts

- `pnpm dev`: Start development servers for all applications
- `pnpm build`: Build all applications and packages
- `pnpm lint`: Run linting for all applications and packages
- `pnpm check-types`: Run type checking for all applications and packages
- `pnpm format`: Format all code with Prettier

### Dependencies

- Node.js >=18
- PNPM 8.15.6
- Turborepo 2.4.4

## Design System Features

The UI package is built on shadcn principles with a custom design system that includes:

- Custom color schemes with light and dark mode support
- Multiple theme variants (login-one, login-two, login-three)
- Consistent component styling with Tailwind CSS
- Utility functions for class name merging and styling