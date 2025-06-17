import { AppBar, Toolbar, Typography } from "@mui/material";
import { DRAWER_WIDTH } from "../NodesDrawer/NodesDrawer";

export const TopBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="h1">
          GeoJSON Nodes
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
