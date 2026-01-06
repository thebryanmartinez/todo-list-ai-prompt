# AGENTS.md - Todo List AI Prompt

This document provides essential information for agentic coding assistants working in this repository.

## Build, Lint, and Test Commands

### Development

```bash
pnpm dev          # Start development server (Next.js)
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality

```bash
pnpm lint         # Run ESLint (uses eslint-config-next)
pnpm format       # Format code with Prettier
pnpm format:check # Check if code is formatted correctly
```

### Testing

**Note:** No test framework is currently configured in this project. When adding tests:

1. Install a testing framework (Jest, Vitest, etc.)
2. Add test scripts to `package.json`
3. Create test files alongside components (e.g., `Component.test.tsx`)
4. Run tests with the appropriate command (to be added)

## Code Style Guidelines

### TypeScript Configuration

- **Target:** ES2017
- **Module Resolution:** Bundler (for Next.js)
- **Strict Mode:** Enabled (required)
- **JSX:** React JSX transform
- **Path Aliases:** `@/*` maps to `./src/*`

### Import Organization

Imports are automatically sorted by Prettier with this order:

1. `^react$` - React itself
2. `^next` - Next.js imports
3. `<THIRD_PARTY_MODULES>` - External dependencies
4. `^@/.*/(.*)$` - Internal modules with sub-paths
5. `^@/*/(.*)$` - Internal modules
6. `^[./]` - Relative imports

### Formatting Rules (Prettier)

```json
{
    "plugins": ["prettier-plugin-tailwindcss", "@trivago/prettier-plugin-sort-imports"],
    "singleQuote": true,
    "trailingComma": "es5",
    "arrowParens": "always",
    "tabWidth": 4,
    "useTabs": false,
    "printWidth": 100,
    "bracketSpacing": true,
    "jsxSingleQuote": true,
    "semi": true
}
```

### Naming Conventions

#### Components

- **React Components:** PascalCase (e.g., `TaskList`, `TaskCounter`)
- **Files:** PascalCase for component files (e.g., `TaskList.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useTaskState`)
- **Props/Functions:** camelCase (e.g., `onToggleComplete`, `taskId`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `PRIORITY_COLORS`)
- **Types/Interfaces:** PascalCase (e.g., `TaskProps`, `Priority`)

### Component Patterns

#### Functional Components with TypeScript

```typescript
interface ComponentProps {
    propName: string;
    optionalProp?: number;
}

export function ComponentName({ propName, optionalProp }: ComponentProps) {
    // Component logic
}
```

#### Client Components

Use `'use client'` directive at the top for components that use:

- React hooks (`useState`, `useEffect`, etc.)
- Browser APIs
- Event handlers

#### Component Variants (shadcn/ui style)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const componentVariants = cva('base-classes', {
    variants: {
        variant: {
            default: 'default-styles',
            secondary: 'secondary-styles',
        },
        size: {
            default: 'default-size',
            sm: 'small-size',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

interface ComponentProps extends VariantProps<typeof componentVariants> {
    // additional props
}

export function Component({ variant, size, className, ...props }: ComponentProps) {
    return (
        <div className={cn(componentVariants({ variant, size }), className)} {...props} />
    );
}
```

### Styling

#### Tailwind CSS

- Use Tailwind classes with the `cn()` utility for conditional styling
- Follow mobile-first responsive design
- Use Tailwind's design tokens (colors, spacing, etc.)

#### Utility Function

```typescript
import { cn } from '@/lib/utils';

// Usage
<div className={cn('base-classes', condition && 'conditional-class')} />
```

### Error Handling

- Use TypeScript's strict mode for compile-time error catching
- Handle runtime errors in components with try-catch blocks
- Use proper error boundaries for React components
- Validate props with TypeScript interfaces

### File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── modules/               # Feature modules
│   └── tasks/            # Task management module
│       └── components/   # Task components
├── lib/                  # Shared utilities
│   ├── db.ts            # Database configuration
│   └── utils.ts         # Utility functions
└── types/               # Type definitions (if needed)
```

### Database (Dexie)

- Use IndexedDB through Dexie for client-side storage
- Define interfaces for data models
- Use proper typing for database operations
- Follow Dexie's schema versioning for migrations

### Best Practices

#### React Patterns

- Use functional components with hooks
- Prefer controlled components
- Implement proper key props for lists
- Use `React.memo` for expensive components when needed
- Handle side effects with `useEffect`

#### Performance

- Use Next.js Image component for images
- Implement proper code splitting
- Avoid unnecessary re-renders
- Use React's optimization techniques (memo, useMemo, useCallback)

#### Accessibility

- Include proper ARIA labels
- Use semantic HTML elements
- Ensure keyboard navigation works
- Maintain proper color contrast

#### Security

- Validate user inputs
- Use proper sanitization for dynamic content
- Follow Next.js security best practices
- Avoid client-side secret storage

### Development Workflow

1. **Start development:** `pnpm dev`
2. **Make changes** following the code style guidelines
3. **Run linting:** `pnpm lint`
4. **Format code:** `pnpm format`
5. **Test changes** (when tests are implemented)
6. **Build for production:** `pnpm build`

### Dependencies

#### UI Components

- **Radix UI:** Headless UI primitives
- **shadcn/ui:** Styled components built on Radix
- **Tailwind CSS:** Utility-first CSS framework
- **Lucide React:** Icon library

#### State Management

- **React Hooks:** Built-in state management
- **Dexie:** IndexedDB wrapper for client-side storage

#### Development Tools

- **TypeScript:** Type checking
- **ESLint:** Code linting (Next.js config)
- **Prettier:** Code formatting
- **Tailwind CSS v4:** Styling

Remember to run linting and formatting before committing changes to maintain code quality.</content>
<parameter name="filePath">AGENTS.md
