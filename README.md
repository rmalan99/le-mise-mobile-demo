# Le Mise

A mobile recipe experience designed to help people decide what to cook faster, discover relevant recipes more naturally, and move from exploration to cooking with less friction.

---

## Product Overview

Choosing what to cook is often more frustrating than it should be.

Too many options, unclear discovery flows, and disconnected cooking experiences create unnecessary friction before the user even starts preparing a meal. Most recipe products focus on content volume instead of decision quality.

Le Mise takes a different direction: **reduce the cognitive load of choosing what to cook** by making discovery, browsing, and recipe reading feel like one connected mobile experience.

### What the current demo includes

- mobile navigation with tab-based structure (home, explore, categories, favorites, plan, profile)
- local recipe catalog with category-driven discovery
- recipe detail reading with structured ingredient and step information
- cooking mode for guided preparation
- onboarding flow
- authentication flow (login, register, password reset)
- product branding and visual identity

### What it intentionally does not include

This demo represents the **conceptual foundation** of a personal product. Further iterations — such as richer personalization, persistence, backend integration, and deeper cooking guidance — will continue privately.

This repository exists as a product showcase, not as an open-source contribution target.

---

## My Role

I built this project from scratch as the sole product designer and developer.

My ownership covered:

- **product direction** — defining what problems to solve and which experience to prioritize first
- **information architecture** — structuring content, navigation, and discovery flows for a mobile context
- **UI/UX design** — visual identity, layout, interactions, and the full mobile interface
- **frontend architecture** — codebase organization, module boundaries, state management, form system
- **implementation** — all React, Ionic, Tailwind, and Vite code
- **technical decisions** — SSR avoidance, CSS strategy, dependency choices, domain-based structure

Every product and technical decision described below was made with full ownership over the outcome.

---

## Architecture Decisions

The codebase reflects deliberate architectural choices, not framework defaults.

### Domain-based structure

The project is organized by **domains**, not by technical type. Everything related to a feature lives inside its own module first — pages, components, models, schemas, and helpers are co-located.

If something is reused across domains, it moves up to `shared/`. If it is global, it lives in `store/`. Nothing ends up in `shared` by accident.

```
src/
├── shared/
│   ├── components/       # UI primitives, recipe cards, form system, page states, alerts
│   ├── config/           # branding, recipe categories
│   └── mocks/            # local recipe data
│
├── store/                # global state (zustand): session, favorites
│
└── modules/
    ├── auth/             # login, register, password reset, auth shell
    ├── onboarding/       # onboarding flow and slides
    ├── splash/           # splash screen
    ├── tabs/             # tab navigation + home, explore, categories, favorites, plan, profile
    └── recipes/          # recipe detail, cooking mode
```

**Why:** co-location reduces cognitive load when navigating the codebase. A developer touching a feature does not need to jump across five directories. It also makes the structure naturally resistant to over-engineering — local code stays local until reuse is proven.

### Layered form system

Forms follow a three-layer architecture to separate concerns cleanly:

1. **UI layer** — presentational components (`TextInputUI`, `ButtonUI`, `FieldContainer`) with no form logic
2. **Field layer** — standalone form fields that compose UI and validation (`PasswordField`, `PrimaryButton`)
3. **Adapter layer** — React Hook Form integration (`RhfTextField`, `RhfPasswordField`) that bridges the field API into RHF

**Why:** this keeps the form primitives testable and reusable. The UI layer does not know about form state. The adapter layer does not own presentation. Swapping form libraries or adding uncontrolled variants requires changes only in the adapter layer.

### CSS strategy and Ionic coexistence

Ionic ships global stylesheets that target native HTML elements aggressively (`button`, `h1`, `span`). In a codebase that uses both Ionic components and raw HTML with Tailwind, this creates unpredictable layout side effects.

The solution was surgical:

- **kept** only the Ionic sheets required for components to function (`core.css`, `structure.css`, `flex-utils.css`, `display.css`)
- **removed** `normalize.css` (Tailwind preflight covers this), `typography.css` (global overrides on `h1`–`h6`), and all Ionic utility-only sheets
- **recovery reset** in `src/index.css` restores predictable defaults for raw HTML elements without reapplying the full Tailwind cascade

**Why:** this avoids CSS conflicts between Tailwind utilities and Ionic's opinionated base styles while keeping Ionic components fully functional in their own layer.

### State management

Global state is managed with **zustand** and split by concern:

- `session.ts` — authentication state, login persistence
- `favorites.ts` — saved recipes state

**Why:** zustand was chosen over React Context for its simplicity, minimal boilerplate, and natural alignment with the domain-based architecture. Each store owns one concern, matching the module boundaries.

### Validation

Form validation uses **zod** schemas, co-located with their respective pages inside each auth module. This keeps validation rules discoverable and tightly coupled to the form they serve, not scattered in a global validation directory.

### Icons and design consistency

The project uses `@tabler/icons-react` as the single icon library. No emoji as UI icons, no mixed icon families. Visual decisions — colors, spacing, typography — flow through Tailwind utilities, with inline styles reserved only for dynamic or framework-required values (e.g., Ionic CSS custom properties).

### Decisions against certain defaults

- **no SSR** — this is a mobile-first Capacitor target; server-side rendering adds complexity with no user-facing benefit
- **no CSS-in-JS** — Tailwind provides sufficient expressive power without runtime style generation
- **no global component directory** — components start inside their feature module; they move up only when proven reusable

---

## Tech Stack

| Layer          | Choice                | Notes                                      |
| -------------- | --------------------- | ------------------------------------------ |
| Framework      | React 19              | UI library                                 |
| Mobile shell   | Ionic Framework       | Native-feeling mobile navigation and shell |
| Styling        | Tailwind CSS v4       | Utility-first CSS                          |
| Build          | Vite 8                | Fast ES module dev server and bundler      |
| State          | Zustand               | Global state (session, favorites)          |
| Forms          | React Hook Form + Zod | Form state management and schema validation |
| Routing        | React Router v5       | Page-level routing inside Ionic shell      |
| Animations     | react-transition-group| Enter/exit transitions                     |
| Icons          | @tabler/icons-react   | Consistent icon family                     |
| Type checking  | TypeScript 6          | Static type safety                         |

---

## Product Vision

Le Mise is the conceptual foundation of a personal product that will evolve over time through private iterations.

The current demo validates the core direction: a mobile-first recipe experience that prioritizes decision clarity over content volume. Future iterations — whether they involve backend integration, richer personalization, or deeper cooking guidance — will build on top of this foundation without altering the product's essential goal.

This repository exists to present the product thinking, architecture, and implementation quality behind the concept. It is not an open-source project seeking contributions.

---

## For Developers

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh)

### Setup

```bash
# Install dependencies
bun install

# Start the development server
bun run dev

# Build for production
bun run build

# Preview the production build locally
bun run preview

# Run linting
bun run lint
```

The dev server starts at `http://localhost:5173` by default.

### Project aliases

The project uses Vite path aliases for clean imports:

| Alias                  | Path                              |
| ---------------------- | --------------------------------- |
| `@/`                   | `src/`                            |
| `@modules/`            | `src/modules/`                    |
| `@shared/`             | `src/shared/`                     |
| `@store/`              | `src/store/`                      |
| `@auth/`               | `src/modules/auth/`               |
| `@auth-pages/`         | `src/modules/auth/pages/`         |
| `@onboarding/`         | `src/modules/onboarding/`         |
| `@splash/`             | `src/modules/splash/`             |
| `@tabs/`               | `src/modules/tabs/`               |
| `@shared-components/`  | `src/shared/components/`          |
| `@shared-forms/`       | `src/shared/components/forms/`    |
| `@shared-fields/`      | `src/shared/components/forms/fields/` |

### Structure convention

When adding a feature, start inside its own module:

```
src/modules/[module-name]/
├── components/       # Module-specific components
└── pages/
    └── [page-name]/
        ├── components/   # Page-specific components
        ├── models/       # Types and interfaces
        └── schemas/      # Validation schemas
```

Promote to `shared/` only when the same code is needed by multiple modules.

---

## Visual Showcase

> Add product screenshots, mockups, or a demo video here.

Suggested assets:

- discovery / home screen
- category browsing
- recipe detail
- cooking mode
- onboarding flow
- short product demo video

---

## Current Status

This project is in an **early product demo stage**.

The mobile experience foundation is functional and showcases the core product direction. The private product roadmap will continue evolving independently.

---
