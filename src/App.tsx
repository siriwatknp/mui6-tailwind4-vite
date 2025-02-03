import { CacheProvider } from "@emotion/react";
import {
  createTheme,
  ThemeProvider,
  useColorScheme,
} from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import createCache, { StylisPlugin } from "@emotion/cache";

const wrapInLayer: (layerName: string) => StylisPlugin =
  (layerName) => (node) => {
    // if we're not at the root of a <style> tag, leave the tree intact
    // if the node is an @layer rule, leave it intact
    if (node.root || node.type === "@layer") return;

    // if we're at the root, replace node with `@layer layerName { node }`
    const child = { ...node, parent: node, root: node };
    Object.assign(node, {
      children: [child],
      length: 6,
      parent: null,
      props: [layerName],
      return: "",
      root: null,
      type: "@layer",
      value: `@layer ${layerName}`,
    });
  };

const cache = createCache({
  key: "css",
  // By default, Tailwind has layer "@components" configured
  // from the main CSS file, so this will work.
  stylisPlugins: [wrapInLayer("components")],
});

function AppContent() {
  const { mode, setMode } = useColorScheme();

  return (
    <Box
      className="bg-gray-50 dark:bg-gray-900"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16 }}
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        color="inherit"
      >
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign In
          </Typography>
          <Box component="form" sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function App() {
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
    },
    colorSchemes: {
      light: true,
      dark: true,
    },
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <AppContent />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
