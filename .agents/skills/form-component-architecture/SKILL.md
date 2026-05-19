---
name: form-component-architecture
description: "Trigger: TextInputUI, ButtonUI, React Hook Form, form fields, input components, button components. Define layered form components with stable UI, form, and RHF boundaries."
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.1"
---

# Form Component Architecture

## Activation Contract

Use when designing, implementing, refactoring, or reviewing form-related components such as inputs, password fields, buttons, and React Hook Form integrations.

## Why This Skill Exists

Most form component systems fail because they mix three different concerns in one place:

- visual rendering
- field behavior
- form-library integration

This skill prevents that collapse.

Its job is to help agents build future form components with the same repeatable anatomy, so maintenance, targeted fixes, performance work, and library changes stay cheap.

## Core Model

Use this dependency direction only:

`ui <- form <- RHF`

- `ui` = presentation primitives
- `form` = field semantics and composition
- `RHF` = React Hook Form wiring

Never invert this dependency.

## Hard Rules

- Keep responsibilities isolated by layer.
- Accept only props that belong to the current layer.
- Prefer curated APIs over dumping every native or library prop everywhere.
- Use `forwardRef` for low-level UI primitives.
- Do not import form libraries into the `ui` layer.
- Do not leak library objects through the public API of the `form` layer.
- Create specialized components when behavior materially changes; do not solve everything with flags.
- If a change touches multiple layers, split the work by responsibility instead of collapsing it into one file.

## Layer Anatomy

### Level 1 — `ui`

#### Purpose

Own visual primitives such as `TextInputUI`, `ButtonUI`, labels, helper text, error text, icon slots, containers, and loading visuals.

#### Why

Visual structure changes often. Keeping it isolated allows styling, spacing, states, and slots to evolve without breaking field logic or form-library integration.

#### Approach

- presentation-first
- minimal curated props
- composable slots
- no business knowledge
- no form-library knowledge

#### Objective

Render the visual shell and expose stable hooks for upper layers.

#### Limits

- no validation timing rules
- no touched/dirty logic
- no business decisions
- no orchestration across fields
- no third-party form library imports

### Level 2 — `form`

#### Purpose

Own field semantics and composition.

Examples: email field, password field, search field, submit button variants, field groups.

#### Why

This layer defines the component API that application code should actually use, without coupling that API to a specific library.

#### Approach

- compose `ui` primitives
- translate state into visual behavior
- centralize field semantics
- remain library-agnostic

#### Objective

Provide a stable, meaningful API for labels, helper text, error visibility, specialized behaviors, and field state translation.

#### Limits

- no direct dependency on a form library
- no duplicated styling already solved in `ui`
- no leaking raw RHF objects into callers
- no generic hacks when a dedicated component is clearer

### Level 3 — `RHF`

#### Purpose

Connect the `form` layer to external form libraries such as React Hook Form.

#### Why

Library integration changes faster than field semantics. Isolating RHF wiring protects the rest of the system from library churn.

#### Approach

- adapt library state into form-layer props
- map value and validation state cleanly
- prefer library-native best practices

#### Objective

Translate `name`, `control`, `value`, `onChange`, `onBlur`, touched state, dirty state, and validation errors into the form layer without contaminating lower layers.

#### Limits

- no new styling rules
- no duplicated field composition
- no product-specific business validation here
- no reverse dependency into `ui`

## Ownership Guide

| If the change is about... | Put it in... |
|---|---|
| borders, spacing, typography, slot layout, icons, loading visuals, base states | `ui` |
| helper/error visibility, specialized field behavior, semantic props, field composition | `form` |
| `control`, `name`, `useController`, `useFormContext`, error mapping, touched/dirty wiring | `RHF` |

## Implementation Workflow

1. Decide which layer owns the requested change.
2. Define the smallest API for that layer.
3. Keep lower layers generic enough to be reused, but not abstract for abstraction's sake.
4. Add specialized components when semantics differ meaningfully.
5. Keep exports predictable and grouped by layer.
6. Reuse the same anatomy for future fields unless there is a real architectural reason not to.

## Output Contract

When using this skill, return:

- impacted layer: `ui`, `form`, or `RHF`
- why that layer owns the change
- API introduced or changed
- behaviors or states supported
- boundaries intentionally preserved
- any deviation from the anatomy and why it was necessary
