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

```diff
diff --git a/src/App.tsx b/src/App.tsx
index bf740f6..154635b 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,3 +1,4 @@
+import { CacheProvider } from "@emotion/react";
 import {
   createTheme,
   ThemeProvider,
@@ -13,6 +14,34 @@ import {
 } from "@mui/material";
 import Brightness4Icon from "@mui/icons-material/Brightness4";
 import Brightness7Icon from "@mui/icons-material/Brightness7";
+import createCache, { StylisPlugin } from "@emotion/cache";
+
+const wrapInLayer: (layerName: string) => StylisPlugin =
+  (layerName) => (node) => {
+    // if we're not at the root of a <style> tag, leave the tree intact
+    // if the node is an @layer rule, leave it intact
+    if (node.root || node.type === "@layer") return;
+
+    // if we're at the root, replace node with `@layer layerName { node }`
+    const child = { ...node, parent: node, root: node };
+    Object.assign(node, {
+      children: [child],
+      length: 6,
+      parent: null,
+      props: [layerName],
+      return: "",
+      root: null,
+      type: "@layer",
+      value: `@layer ${layerName}`,
+    });
+  };
+
+const cache = createCache({
+  key: "css",
+  // By default, Tailwind has layer "@components" configured
+  // from the main CSS file, so this will work.
+  stylisPlugins: [wrapInLayer("components")],
+});

 function AppContent() {
   const { mode, setMode } = useColorScheme();
@@ -90,9 +119,11 @@ function App() {
   });

   return (
-    <ThemeProvider theme={theme}>
-      <AppContent />
-    </ThemeProvider>
+    <CacheProvider value={cache}>
+      <ThemeProvider theme={theme}>
+        <AppContent />
+      </ThemeProvider>
+    </CacheProvider>
   );
 }

```

Then run the dev server, you should see styles of Material UI components under `@components` layer.

## Dark mode

Follow [Tailwind docs](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) and update Material UI to use `.dark` selector.

```diff
diff --git a/src/index.css b/src/index.css
index f1d8c73..9c0f814 100644
--- a/src/index.css
+++ b/src/index.css
@@ -1 +1,3 @@
 @import "tailwindcss";
+
+@custom-variant dark (&:where(.dark, .dark *));

```

```diff
diff --git a/src/App.tsx b/src/App.tsx
index 154635b..2dad18b 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -48,6 +48,7 @@ function AppContent() {

   return (
     <Box
+      className="bg-gray-50 dark:bg-gray-900"
       sx={{
         bgcolor: "background.default",
         color: "text.primary",
@@ -112,6 +113,9 @@ function AppContent() {

 function App() {
   const theme = createTheme({
+    cssVariables: {
+      colorSchemeSelector: "class",
+    },
     colorSchemes: {
       light: true,
       dark: true,
```

## Tailwind Intellisense

To enable autocompletion when using `className: "..."`, open the VS Code `settings.json` and add this

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*:\\s*['\"]([^'\"]*)['\"]"]
  ]
}
```
