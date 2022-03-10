import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

/**
 * Source: Material Docs
 * @param {String} label
 * @returns ReactElement
 */
export function appBarLabel(variant, label) {
  return (
    <Toolbar>
      <Typography variant={variant} noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

export default function Header({ theme, setTheme = () => {} }) {
  return (
    <AppBar position="static" color="primary">
      {appBarLabel("h6", "Hotels")}
    </AppBar>
  );
}
