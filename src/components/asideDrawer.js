import { Box, Button, Container, List, ListItem, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

export const MUIasideDrawer = () => {
  const inBasket = JSON.parse(localStorage.getItem("cart"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Container>
      <Button onClick={() => setIsDrawerOpen(true)}>Open basket</Button>
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box textAlign="center" p={1}>
          <Typography variant="h6">In Cart</Typography>
        </Box>
        <Container>
          <List>
            {inBasket.map((basketItem) => (
              <ListItem key={basketItem.id}>
                <Link component={RouterLink} underline="hover" to="./">
                  {basketItem.title}
                </Link>
              </ListItem>
            ))}
          </List>
          <Box>
            <Button variant="contained" color="info">
              Go to checkout
            </Button>
          </Box>
        </Container>
      </Drawer>
    </Container>
  );
};
