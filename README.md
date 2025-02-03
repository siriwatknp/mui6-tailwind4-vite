# Material UI v6 + Tailwind CSS v4

## Vite

```bash
pnpm create vite muiv6-tailwindv4-vite --template react-ts
```

## Material UI

```bash
pnpm install @mui/material @emotion/styled @emotion/react
```

## Tailwind CSS

Follow [Vite setup](https://tailwindcss.com/docs/installation/using-vite)

## CSS layer

Since Tailwind v4 uses CSS Layer natively, Material UI needs to use CSS layer too.

The configuration requires a custom cache to the Emotion.

```bash
pnpm install @emotion/cache
```
