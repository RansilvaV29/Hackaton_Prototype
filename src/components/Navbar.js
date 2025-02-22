import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Página principal", path: "/" },
    { text: "Escanear Archivos", path: "/scan" },
    { text: "Análisis de Directorios", path: "/analysis" },
  ];

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {/* Botón de menú en pantallas pequeñas */}
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            sx={{ display: { xs: "block", md: "none" } }} 
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Título */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            openDLP
          </Typography>

          {/* Menú normal en pantallas grandes */}
          <div sx={{ display: { xs: "none", md: "block" } }}>
            {menuItems.map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path}>
                {item.text}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>

      {/* Menú lateral en pantallas pequeñas */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
