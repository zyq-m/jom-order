# JomOrder — AGENTS.md

## Commands
- Dev: `npm run dev` (Vite dev server)
- Build: `npm run build` (runs `tsc -b && vite build` — typecheck then bundle)
- Lint: `npm run lint` (ESLint, only `src/components/ui/button.tsx` has pre-existing error)
- No test framework

## Stack
- React 19, Vite 8, TypeScript 6, Tailwind CSS 4, React Router 7
- State: Zustand with `persist` middleware (localStorage keys: `jomorder-cart`, `jomorder-kitchen`, `jomorder-admin`)
- shadcn/ui components in `src/components/ui/` (button, card, dialog, select, textarea)
- Radix UI primitives: dialog, select, slot
- Icons: lucide-react

## Path alias
`@/` → `./src` (configured in both vite.config.ts and tsconfig paths)

## Routing (src/main.tsx)
Three logical flows sharing a single-page app:
- `/t/:tableId/*` — Customer flow (Layout → Landing / Menu / Cart / Success / Status)
- `/kitchen` — Kitchen dashboard (standalone, no wrapper)
- `/admin/*` — Admin panel (AdminLayout → Dashboard / Menu / Orders / QR)
- `/` — Marketing homepage
- `/demo` — Demo landing page

## Architecture
- **No backend** — all state is in-memory Zustand stores persisted to localStorage. Orders placed by customer → `orderStore.placeOrder()` + `kitchenStore.addOrder()`. No API calls.
- CustomerLayout syncs `tableId` from URL params on mount.
- AdminLayout has inline sidebar navigation.
- MenuList uses a custom modal (not shadcn Dialog) for food details.

## Styling
- Tailwind v4 CSS-based config (`@theme inline` in `src/index.css`). No `tailwind.config.js`.
- All `<Button>` components use `rounded-full` (project convention).
- `cn()` utility in `src/lib/utils.ts` for class merging.

## TypeScript
- `noUnusedLocals`, `noUnusedParameters` — strict
- `verbatimModuleSyntax` — use `import type` for type-only imports
- `erasableSyntaxOnly` — no enums, no namespaces, no parameter properties
- `noEmit: true` — Vite handles bundling

## Key gotchas
- ESLint react-refresh rule errors if a file exports non-component alongside components. `button.tsx` exports `buttonVariants` constant, causing the only lint error. This is pre-existing.
- All shadcn components were hand-created (not via CLI), following the patterns in existing ui/* files.
- FoodDetails route (`/t/:id/menu/:itemId`) still exists but is not navigated to from MenuList (uses modal instead).
