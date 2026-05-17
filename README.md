# le mise

`le-mise` is a digital recipe product for home cooking.

Its goal is to help people decide what to cook faster, discover relevant recipes, and move from exploration to cooking with less friction.

## Purpose

The product is built to solve three clear problems:

- finding relevant recipes based on real user needs
- making decisions easier through filters, categories, and context
- connecting discovery, recipe detail, and guided cooking in one flow

## Value Proposition

`le-mise` brings together in one experience:

- recipe exploration and search
- content organization
- filters based on preferences and needs
- a clear recipe detail experience
- continuity between choosing, preparing, and cooking

## Current Status

This demo focuses on the mobile app as the main end-user surface.

The current implementation is an initial version of the product with:

- mobile navigation
- a local catalog
- recipe discovery
- recipe detail reading

This serves as the foundation for a more complete product.

## Tech Stack

This demo is built with:

- React
- Ionic
- Tailwind CSS
- Vite

## Project Architecture

This project is organized by **domains**.

The goal of this structure is simple: make the codebase easier to scale, easier to maintain, and easier to split across features and responsibilities.

### Core Rule

Everything related to a feature must live inside its own domain first.

If a module, page, component, model, schema, or helper is reused outside of its own scope, it must move up to a higher level that matches that reuse.

### Scope Rule

- **Page scope**: used by only one page
- **Module scope**: shared inside the same feature/domain
- **Shared scope**: reused across multiple domains
- **Store scope**: global state or app-wide concerns

Start local. Move up only when reuse is real.

### High-Level Structure

```text
src/
├── shared/
│   ├── components/
│   ├── models/
│   └── helpers/
│
├── store/
│
└── modules/
    └── [module-name]/
        ├── components/
        └── pages/
            └── [page-name]/
                ├── components/
                ├── models/
                └── schemas/
```

### Responsibilities

- `modules/`: feature ownership lives here
- `store/`: global application state lives here
- `shared/`: cross-domain reusable code only

`shared` is not a dumping ground. If something belongs to one feature, it should stay inside that feature.

## Styling Convention

- Always prioritize **Tailwind CSS** for layout, spacing, sizing, typography, colors, and state styling.
- Use inline styles only when Tailwind cannot express the requirement cleanly, or when a dynamic value is genuinely necessary.
- Do not introduce vanilla `CSSProperties` or ad-hoc inline styling as the default approach.

## CSS Architecture — Ionic Interference Reduction

Ionic ships several global stylesheets that aggressively target native HTML elements (`button`, `h1`, `span`, etc.). In a mixed React/HTML codebase, this can create unexpected layout and typography side effects.

### What was kept

- `@ionic/react/css/core.css` — required for Ionic components to function
- `@ionic/react/css/structure.css` — required for layout shell (ion-app, ion-content, ion-router-outlet)
- `@ionic/react/css/flex-utils.css` — used by some Ionic layout utilities
- `@ionic/react/css/display.css` — used by some Ionic display utilities

### What was removed

- `normalize.css` — not needed; Tailwind preflight already provides baseline reset
- `typography.css` — was overriding h1–h6/small and anchor defaults globally
- `padding.css` — Ionic utility classes only (`.ion-padding*`, `.ion-margin*`), currently unused in this codebase
- `text-alignment.css` — Ionic text utility classes only (`.ion-text-*`), currently unused in this codebase
- `text-transformation.css` — Ionic text utility classes only (`.ion-text-*-uppercase/lowercase/capitalize`), currently unused in this codebase

### Recovery reset in index.css

A minimal `*` reset was added to `src/index.css` so native elements (`h1`–`h6`, `button`, `a`) keep predictable defaults after removing those sheets.

This reset is intentionally minimal. It does not re-apply the full Tailwind cascade. It only restores baseline behavior so Ionic components still render correctly in their own layer while raw HTML stays under control.

## Disclaimer

This application is a basic demo of a personal project.

Its goal is not to remain an isolated experiment. It is the first visible version of a product intended to evolve into a real, useful solution for real users.
