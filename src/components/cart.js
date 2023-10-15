import React, { useEffect, useState } from "react";
import { Box, Container, Link, Divider, Grid, IconButton, List, ListItem, Stack, Typography, Card, CardHeader, CardContent, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const divStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
};

export const MUICart = () => {
  const [cart, setCart] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0); // Initialize orderTotal to 0
  const [discountTotal, setDiscountTotal] = useState(0); // Initialize orderTotal to 0

  const handleDeleteClick = (cartItem) => {
    const itemsInLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedItems = itemsInLocalStorage.filter((item) => item.id !== cartItem.id);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setCart(updatedItems);
    // Recalculate the order total after item deletion
    const total = updatedItems.reduce((acc, item) => acc + item.discountedPrice, 0);
    setOrderTotal(total);
    const discount = updatedItems.reduce((acc, item) => acc + item.price, 0);
    setDiscountTotal(discount);
  };

  useEffect(() => {
    const itemsInLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(itemsInLocalStorage);
    // Calculate the initial order total when the component mounts
    const total = itemsInLocalStorage.reduce((acc, item) => acc + item.discountedPrice, 0);
    setOrderTotal(total);
    const discount = itemsInLocalStorage.reduce((acc, item) => acc + item.price, 0);
    setDiscountTotal(discount);
  }, []);

  return (
    <Container sx={{ marginY: "50px" }}>
      <Typography variant="h3" component="h1" textAlign="center">
        Checkout
      </Typography>
      <Divider />

      {/* <Grid item sm={6}>
          <StyledCheckoutForm noValidate action="./"></StyledCheckoutForm>
        </Grid> */}

      <Card>
        <CardHeader sx={{ textAlign: "center", paddingBottom: "0" }} aria-label="Cart overview" title="Cart overview" />
        <CardContent sx={{ paddingTop: "0" }}>
          <Grid container>
            <Grid item xs={6}>
              <List sx={{ width: "100%" }}>
                {cart.map((cartItem) => (
                  <React.Fragment key={cartItem.id}>
                    <ListItem>
                      <Box mr={2} sx={{ aspectRatio: "16/9", overflow: "hidden", position: "relative", width: "150px" }}>
                        <img style={divStyle} srcSet={`${cartItem.imageUrl}`} alt={cartItem.title} src={`${cartItem.imageUrl}`} />
                      </Box>
                      <Box>
                        <Box display="inline-block">
                          <Link underline="hover" variant="subtitle1" fontWeight="bold" component={RouterLink} to={`../product?${cartItem.id}`} color="black">
                            {cartItem.title}
                          </Link>
                          <Typography sx={{ textDecoration: "line-through" }}>${cartItem.price}</Typography>
                          <Typography fontSize={20} fontWeight="bold" sx={{ display: "inline" }}>
                            ${cartItem.discountedPrice}
                          </Typography>
                        </Box>
                        <IconButton color="error" aria-label="delete" onClick={() => handleDeleteClick(cartItem)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Grid>
            <Grid item xs={6} sx={{ position: "relative" }}>
              <Box sx={{ textAlign: "right" }}>
                <Box sx={{ padding: "20px 10px" }}>
                  <Box display="flex" justifyContent="space-between" sx={{ paddingY: "5px" }}>
                    <Typography>Subtotal:</Typography>
                    <Typography sx={{ fontWeight: "bold" }}> {`$${discountTotal.toFixed(2)}`}</Typography>
                  </Box>
                  <Divider />

                  <Box display="flex" justifyContent="space-between" sx={{ paddingY: "5px" }}>
                    <Typography sx={{ paddingY: "5px" }}>Discount:</Typography>
                    <Typography sx={{ fontWeight: "bold" }}> {`-$${orderTotal !== discountTotal ? `${Math.abs(orderTotal - discountTotal)}` : "--"}`}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ paddingY: "5px", textAlign: "right" }}>
                    <Typography sx={{ display: "inline", paddingY: "5px", alignSelf: "center" }}>{"Total "}</Typography>
                    <Typography sx={{ display: "inline", fontWeight: "bold", fontSize: "24px" }}>${orderTotal.toFixed(2)}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Link component={RouterLink} to="../checkout">
                    <Button component="button" variant="contained" aria-label="purchae">
                      Purchase
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
