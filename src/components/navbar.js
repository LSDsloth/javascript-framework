import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Tooltip, Badge, Link } from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";

export const MuiNavbar = () => {
  const [cartLength, setCartLength] = useState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(storedCart.length);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar component="nav" position="sticky">
      <Toolbar variant="regular" sx={{ justifyContent: "space-between" }}>
        <Tooltip title="Home" placeholder="bottom">
          <Link component={RouterLink} to="/">
            <Button color="inherit">
              <MonetizationOnOutlinedIcon fontSize="medium" sx={{ color: "success.light" }} />
              <Typography color="white" variant="h6" textTransform={"capitalize"}>
                E-com
              </Typography>
            </Button>
          </Link>
        </Tooltip>
        <Stack direction="row" spacing={2}>
          <Link component={RouterLink} to="./">
            <Button color="inherit" sx={{ color: "white" }}>
              Home
            </Button>
          </Link>
          <Link component={RouterLink} to="./contact">
            <Button color="inherit" sx={{ color: "white" }}>
              Contact
            </Button>
          </Link>
          <Tooltip title="Cart" placeholder="bottom">
            <Link component={RouterLink} to="./cart">
              <Badge color="error" badgeContent={cartLength}>
                <IconButton alt="Cart" sx={{ color: "white", marginLeft: "16px" }} onClick={toggleDrawer}>
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
            </Link>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
