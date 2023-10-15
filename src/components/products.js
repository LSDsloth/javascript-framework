import { Badge, Grid, Paper, IconButton, Typography, Container, Card, CardContent, CardActionArea, CardActions, CardMedia, Box, Link, Button, CardHeader, Tooltip, Autocomplete, Stack, useThemeProps, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useEffect, useState } from "react";
import { useApi } from "../api/api";
import { Link as RouterLink } from "react-router-dom";

export const MuiProducts = (updateCartLength) => {
  const { data, isLoading, isError } = useApi("https://api.noroff.dev/api/v1/online-shop");
  const [cart, setCart] = useState([0]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    // Load cart data from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (item) => {
    // Add item to cart state
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    console.log(updatedCart);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update cart length in the Navbar component
    console.log("Cart length updated:", updatedCart.length);
    // updateCartLength(updatedCart.length);
  };

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = data.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Container sx={{ marginY: "50px" }}>
      <Box className="searchBar-wrapper">
        <TextField label="Search for a product" variant="outlined" fullWidth value={searchQuery} onChange={handleSearch} />
      </Box>
      <Grid container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={{ xs: 1, md: 2 }}>
        {filteredProducts.map((product) => {
          return product.discountedPrice === product.price ? (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345, display: "block", margin: "0 auto" }}>
                <Link component={RouterLink} to={`./product?${product.id}`}>
                  <Box sx={{ position: "relative", overflow: "hidden", aspectRatio: "1 / 1" }}>
                    <CardMedia aria-label="Product image" alt={product.title} loading="lazy" component="img" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} image={product.imageUrl} />
                  </Box>
                </Link>
                <Link color="inherit" component={RouterLink} underline="hover" to={`./product?${product.id}`}>
                  <CardHeader aria-label="Product title" title={product.title} />
                </Link>
                <CardContent sx={{ paddingTop: "0" }}>
                  <Typography aria-label="Product description" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Box sx={{ paddingTop: "18px" }}>
                    <Typography aria-label="Product price" variant="h6">
                      {`$${product.discountedPrice}`}
                    </Typography>
                    <Tooltip title="Add" placement="top">
                      <Button onClick={() => addToCart(product)} aria-label="Add to cart" sx={{ mt: 2 }} size="medium" variant="contained" startIcon={<AddShoppingCartIcon />}>
                        Add
                      </Button>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345, display: "block", margin: "0 auto" }}>
                {/* <CardActionArea> */}
                <Link component={RouterLink} to={`./product?${product.id}`}>
                  <Box sx={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
                    <CardMedia aria-label="Product image" alt={product.title} loading="lazy" component="img" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} image={product.imageUrl} />
                    {product.discountedPrice !== product.price && (
                      <Box sx={{ display: "flex", alignItems: "center", position: "absolute", right: "2%", top: "2%", padding: "5px", backgroundColor: "yellow", width: "fit-content", borderRadius: "50%", aspectRatio: "1/1" }}>
                        <Typography variant="h6" color="black">{`-${(100 - (product.discountedPrice / product.price) * 100).toFixed()}%`}</Typography>
                      </Box>
                    )}
                  </Box>
                </Link>
                <Link color="inherit" component={RouterLink} underline="hover" to={`./product?${product.id}`}>
                  <CardHeader aria-label="Product title" title={product.title} />
                </Link>
                <CardContent sx={{ paddingTop: "0" }}>
                  <Typography aria-label="Product description" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Box sx={{ paddingTop: "18px" }}>
                    <Typography aria-label="Price before discount" variant="body2" sx={{ textDecoration: "line-through" }}>
                      Before: {`$${product.price}`}
                    </Typography>
                    <Typography aria-label="Product price" variant="h6">
                      {`$${product.discountedPrice}`}
                    </Typography>
                    <Tooltip title="Add" placement="top">
                      <Button onClick={() => addToCart(product)} aria-label="Add to cart" sx={{ mt: 2 }} size="medium" variant="contained" startIcon={<AddShoppingCartIcon />}>
                        Add
                      </Button>
                    </Tooltip>
                  </Box>
                </CardContent>
                {/* </CardActionArea> */}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
