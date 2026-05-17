# AGENTS.md

This file defines project-level instructions for AI agents working in this repository.

## Scope

- These rules apply to the whole repository unless a deeper `AGENTS.md` overrides them.
- When changing application code, prefer the conventions already established in `le-mise-app-demo/`.

## Rules

### 1. Respect existing libraries

- Reuse the libraries already adopted by the project before introducing new ones.
- Do not swap libraries casually for icons, forms, routing, state, or UI primitives.
- If a new dependency seems necessary, explain why before introducing it.

### 2. Icon usage

- Use the project's current icon library as the default choice for UI icons.
- In this repository, prefer `@tabler/icons-react` unless the user explicitly requests another icon set.
- Do not use emoji as production UI icons.
- Keep icon choice visually and semantically consistent with nearby components.

### 3. Styling

- Prefer Tailwind CSS for styling.
- Use inline styles only when there is a real technical reason, such as:
  - Ionic CSS custom properties
  - safe-area `env(...)`
  - dynamic values not expressible cleanly with utilities
  - CSS features that would become less clear if forced into arbitrary classes
- Do not introduce large `CSSProperties` objects as the default styling approach.

### 4. Component changes

- Preserve the existing public API of shared components unless the task explicitly requires changing it.
- Keep changes narrow in scope.
- Prefer small, readable components over large multi-purpose components.
- Do not break existing flows just to satisfy a visual refactor.

### 5. Accessibility

- Interactive icons must have accessible labels when needed.
- Decorative icons should be marked with `aria-hidden="true"`.
- Do not rely on color or emoji alone to communicate state.

## Limits

- Do not introduce a new design system, icon pack, or styling strategy without explicit approval.
- Do not replace project conventions with personal preference.
- Do not broaden a focused task into a full refactor.
- Do not remove framework-specific behavior from Ionic components unless the impact is verified.

## Recommendations

- Check `package.json` and nearby components before choosing patterns or imports.
- Match the conventions of the closest existing feature first, then improve only where necessary.
- When in doubt, prefer consistency over novelty.
- If a rule must be broken, leave the smallest possible exception and document why.

## Practical default

When editing UI in this repo, the default stack should be:

- React component patterns already present in the feature
- Tailwind for styling
- `@tabler/icons-react` for icons
- existing Ionic primitives where the feature already depends on them
