# Todo List AI Prompt

A minimalist todo app with AI-powered task creation. Create tasks through a natural language chat interface or a traditional form — all stored locally in your browser.

## Features

- **Dual task creation** — use a chat interface or structured form, whichever fits your flow
- **Subtasks** — break tasks down into smaller steps
- **Priority levels** — mark tasks as High, Medium, or Low priority
- **Progress tracking** — circular progress indicator and task counter
- **Bulk cleanup** — delete all completed tasks at once
- **Local-first** — all data is stored in your browser's IndexedDB, no backend required
- **Markdown support** — chat messages render markdown with syntax-highlighted code blocks

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI / shadcn/ui |
| Storage | Dexie (IndexedDB) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io)

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!NOTE]
> This app runs entirely in the browser. There is no backend or external API — your tasks live in IndexedDB and are private to your device.

## Available Scripts

```bash
pnpm dev           # Start dev server
pnpm build         # Build for production
pnpm start         # Start production server
pnpm lint          # Run ESLint
pnpm format        # Format code with Prettier
pnpm format:check  # Check formatting without writing
```

## Project Structure

```
src/
├── app/                  # Next.js App Router (layout, page, global styles)
├── lib/
│   ├── db.ts             # Dexie IndexedDB setup (tasks + subtasks tables)
│   └── utils.ts          # cn() utility (clsx + tailwind-merge)
└── modules/
    ├── tasks/            # Task list, task item, progress, hooks, types
    ├── chat/             # Chat interface, form, input, hooks
    └── shared/           # Shared UI components (shadcn/ui, prompt-kit)
```
