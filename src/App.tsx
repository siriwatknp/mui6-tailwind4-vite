import {
  createTheme,
  ThemeProvider,
  useColorScheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  GlobalStyles,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

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
              // @ts-expect-error ignore
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              // @ts-expect-error ignore
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
    <StyledEngineProvider enableCssLayer injectFirst>
      <GlobalStyles styles="@layer base, theme, components, mui, utilities;" />
      <ThemeProvider theme={theme} noSsr defaultMode="system">
        <AppContent />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
