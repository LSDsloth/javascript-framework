import "./App.css";
import { MuiNavbar } from "./components/navbar";
import { MuiProducts } from "./components/products";
import { Routes, Route } from "react-router-dom";
import { MUICart } from "./components/cart";
import { MUIContact } from "./components/contact";
import { MUIProduct } from "./components/product";
import { MUICheckout } from "./components/checkout";

function App() {
  return (
    <div>
      <MuiNavbar />
      <Routes>
        <Route index element={<MuiProducts />} />
        <Route path="cart" element={<MUICart />} />
        <Route path="contact" element={<MUIContact />} />
        <Route path="product" element={<MUIProduct />} />
        <Route path="checkout" element={<MUICheckout />} />
      </Routes>
    </div>
  );
}

export default App;
