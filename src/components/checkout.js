import { Container, Typography } from "@mui/material";

export const MUICheckout = () => {
  localStorage.setItem("cart", JSON.stringify([]));
  return (
    <Container>
      <Typography variant="h3" component="h1">
        Thank you for your purchase
      </Typography>
    </Container>
  );
};
