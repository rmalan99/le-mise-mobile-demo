# Form Component Architecture

## Goal

Define the base anatomy for form components using the current register screen as the visual source of truth.

This project does **not** want generic design-system primitives detached from product reality.
It wants components coupled to the current app language, but still separated by responsibility for support, targeted fixes, and optimization.

## Source of Truth

- `src/pages/Auth/RegisterPage.tsx`

## Architecture Principle

Use this dependency direction only:

`ui <- form <- rhf-adapter`

Meaning:

- `ui` knows only presentation.
- `form` knows field behavior and composition.
- `rhf-adapter` connects the form layer to React Hook Form.

Never invert that dependency.

## Layer 1: UI

Base primitive:

- `TextInputUI`
- `ButtonUI`

Optional supporting pieces:

- `FieldLabel`
- `FieldHelperText`
- `FieldErrorText`
- `FieldContainer`
- `FieldLeadingIcon`
- `FieldTrailingSlot`

### Responsibilities

- Render the visual shell.
- Apply the register-screen styling.
- Expose slots for label, helper, errors, icons, prefix, and suffix.
- Expose visual states only.

### Rules

- Use `forwardRef`.
- Base contract uses `value` and `onChange`.
- Accept only props needed for UI.
- Support these visual states:
  - default
  - focused
  - error
  - disabled
  - readonly
  - loading
- Single visual variant for now.
- Base size for inputs: `sm`.
- No React Hook Form imports.
- No business rules.
- No touched logic.

## Layer 2: Form

Domain-facing components live here.

Examples:

- `EmailField`
- `PasswordField`
- `PrimaryButton`
- `SecondaryButton`

### Responsibilities

- Compose `TextInputUI` and related pieces.
- Normalize the functional API.
- Decide when helper text is hidden.
- Decide when errors become visible.
- Translate field state into UI state.

### Rules

- Error visibility happens only after `touched`.
- `helperText` disappears when an error is shown.
- Support multiple error messages.
- Password behavior must live in a specialized component.
- Keep naming domain-oriented.
- Accept only props needed for behavior, not raw library payloads.

## Layer 3: RHF Adapter

React Hook Form integration is an adapter responsibility.

Examples:

- `RhfEmailField`
- `RhfPasswordField`

### Responsibilities

- Use `useController` as the base strategy.
- Work with `useFormContext` first.
- Also support explicit `control` when needed.
- Map RHF state into form-layer props.

### Rules

- Pass `errorMessage` into the form layer.
- Pass `isTouched`, `isDirty`, and `invalid` into the form layer.
- Do not introduce styling here.
- Do not duplicate field composition already solved in the form layer.

## Input Decisions

- API uses `value` and `onChange`.
- `forwardRef`: yes.
- `defaultValue` depends on layer responsibilities.
- Native props are curated, not fully dumped into every layer.
- `label`, `helperText`, and `errorMessage` are independent pieces composed into `TextInputUI`.
- Support `prefix`, `suffix`, and `leadingIcon`.
- Password visibility toggle is specialized, not generic.
- Character counter is out for now.

## Button Decisions

- Base primitive: `ButtonUI`
- Variants:
  - `primary`
  - `secondary`
  - `ghost`
  - `link`
- Sizes:
  - `sm`
  - `md`
  - `lg`
- Support:
  - `loading`
  - `leadingIcon`
  - `fullWidth`
- Fully rounded CTA/button can exist as a dedicated variant or specialized button.

## Initial Folder Structure

```txt
src/components/forms/
  ui/
    TextInputUI.tsx
    ButtonUI.tsx
    FieldLabel.tsx
    FieldHelperText.tsx
    FieldErrorText.tsx
    FieldContainer.tsx
    index.ts

  fields/
    EmailField.tsx
    PasswordField.tsx
    PrimaryButton.tsx
    index.ts

  adapters/
    rhf/
      RhfEmailField.tsx
      RhfPasswordField.tsx
      index.ts

  index.ts
```

## Implementation Order

1. Extract visual tokens and anatomy from `RegisterPage.tsx`.
2. Build `TextInputUI`.
3. Build `ButtonUI`.
4. Build `PasswordField` as specialized composition.
5. Build RHF adapters with `useController`.
6. Replace register screen inline inputs once contracts are stable.

---

## Implementation Notes (2026-05-16)

### Done

**UI Layer** (`src/components/forms/ui/`):
- `TextInputUI` — base input primitive with `forwardRef`, `value`/`onChange` contract, visual states (default/focused/error/disabled/readonly/loading), leading icon and trailing slot support, error/helper text rendering. Size `sm` matches RegisterPage anatomy (min-h-[50px], rounded-2xl, 13px labels).
- `ButtonUI` — base button primitive with `forwardRef`, variants (primary/secondary/ghost/link), sizes (sm/md/lg), loading spinner, leading/trailing icon, fullWidth support.
- `FieldLabel`, `FieldHelperText`, `FieldErrorText`, `FieldContainer` — supporting pieces matching RegisterPage spacing and typography.

**Form Layer** (`src/components/forms/fields/`):
- `PasswordField` — specialized composition: composes `TextInputUI` + `FieldContainer` + `FieldLabel` + `FieldErrorText`/`FieldHelperText`. Contains password visibility toggle using `@tabler/icons-react` `IconEye`/`IconEyeOff`. Error replaces helper text per spec rule.
- `PrimaryButton` — thin wrapper over `ButtonUI` with primary variant, lg size, fullWidth. Kept even though AuthShell renders its own CTA (product will need it for other CTAs).

**RHF Adapter Layer** (`src/components/forms/adapters/rhf/`):
- `RhfTextField` — wraps `useController`, maps RHF field state into `TextInputUI`. Supports label, placeholder, type, helperText, disabled, readOnly, required, inputMode, autoComplete.
- `RhfPasswordField` — wraps `useController`, maps RHF field state into `PasswordField`.

**Integration**:
- `RegisterPage.tsx` fully replaced inline inputs with `FormProvider` + `RhfTextField` (firstName, lastName, email) + `RhfPasswordField`.
- Added `react-hook-form` to package.json.

### Key Design Decisions

1. `TextInputUI` passes `...rest` to `<input>` so events forwarded correctly without explicit `onBlur` in the interface — `onBlur` lives in `...rest` and is forwarded to the native input.
2. `PasswordField` does NOT expose `onBlur` as a prop — password toggle is a UX-only concern, blur handling is delegated to the RHF adapter via `field.onBlur` which passes through `...rest` at the `TextInputUI` level.
3. `ButtonUI` uses template literal class composition (not clsx) — consistent with existing project patterns and no extra dependency needed.
4. Error visibility in the form layer follows the "touched" rule via RHF — `error?.message` comes from RHF which only populates after field is touched with `mode: 'onBlur'`.
5. `RhfTextField` does not expose `onBlur` as a prop — it passes through via `...rest` at the TextInputUI level, which is the correct layer boundary.

### Non-Goals Still Valid

- Generic cross-product design system.
- Field success state.
- Character counter.
- Broad field family beyond input and password.

### Follow-up

- `PrimaryButton` was created but AuthShell still uses its own inline button. Next iteration should swap AuthShell primary CTA to use `PrimaryButton` (or create a `PrimaryCta` component that handles the specific AuthShell gradient styling).
- Consider extracting `TextField` (non-RHF text input with same composition) for non-RHF use cases.
- Email field could be specialized to `RhfEmailField` with built-in email validation when needed.

## Non-Goals For Now

- Generic cross-product design system.
- Field success state.
- Character counter.
- Broad field family beyond input and password.
