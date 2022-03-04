import HostelsSearch from "./pages/HostelsSearch";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";

function Main() {
  return (
    <Stack spacing={3} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={createTheme()}>
        <Header />
        <HostelsSearch />
      </ThemeProvider>
    </Stack>
  );
}

export default Main;
