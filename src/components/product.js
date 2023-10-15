import { Box, Button, CardMedia, CircularProgress, Container, Grid, Stack, Typography } from "@mui/material";
import { useApi } from "../api/api";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// console.log(queryString);

// console.log(params);

export function MUIProduct() {
  const unusableQueryString = document.location.search;
  const queryString = unusableQueryString.slice(1);
  const { data, isLoading, isError } = useApi("https://api.noroff.dev/api/v1/online-shop");
  const [cart, setCart] = useState([0]);

  useEffect(() => {
    // Load cart data from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (item) => {
    // Add item to cart state
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    console.log("added!");

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update cart length in the Navbar component
    console.log("Cart length updated:", updatedCart.length);
  };

  //   useEffect(() => {

  //     fetch('https://api.noroff.dev/api/v1/online-shop')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Handle the data, set states as needed
  //       })
  //       .catch(() => {
  //         // Handle errors
  //       });
  //   }, [queryString]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", position: "absolute", left: "50%", top: "50%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  const product = data.find((product) => product.id === queryString);
  console.log(product);

  if (!product) {
    return <Box>Product not found</Box>;
  }

  return (
    <Container sx={{ marginY: "50px" }}>
      <main>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%", aspectRatio: "1 / 1", position: "relative", overflow: "hidden" }}>
              <CardMedia aria-label="Product image" alt={product.title} component="img" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} image={product.imageUrl} />
              {product.discountedPrice !== product.price && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    right: "2%",
                    top: "2%",
                    padding: "5px",
                    backgroundColor: "yellow",
                    width: "50px",
                    borderRadius: "50%",
                    aspectRatio: "1/1",
                  }}>
                  <Typography variant="h6">{`-${(100 - (product.discountedPrice / product.price) * 100).toFixed()}%`}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={5}>
              <Box>
                <Typography variant="h4" component="h1" mb={3}>
                  {product.title}
                </Typography>
                <Typography>{product.description}</Typography>
              </Box>
              <Box>
                {product.discountedPrice !== product.price ? (
                  <>
                    <Typography aria-label="Price before discount" variant="subtitle2" sx={{ textDecoration: "line-through" }}>
                      Before: {product.price}
                    </Typography>
                    <Typography aria-label="Product price" variant="h6">
                      {product.discountedPrice}
                    </Typography>
                  </>
                ) : (
                  <Typography aria-label="Product price" variant="h6">
                    {product.discountedPrice}
                  </Typography>
                )}
                <Button onClick={() => addToCart(product)} aria-label="Add to cart" sx={{ mt: 2, width: "100%" }} size="medium" variant="contained" startIcon={<AddShoppingCartIcon />}>
                  Add
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </main>
      <aside></aside>
    </Container>
  );
}
