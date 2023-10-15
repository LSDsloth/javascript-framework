import "./App.css";
import { MuiNavbar } from "./components/navbar";
import { MuiProducts } from "./components/products";
import { MUIasideDrawer } from "./components/asideDrawer";
import { BrowserRouter, Routes, Route, Switch, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MUICart } from "./components/cart";
import { MUIContact } from "./components/contact";
import { MUIProduct } from "./components/product";
import { MUICheckout } from "./components/checkout";

function App() {
  return (
    <>
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
      {/* <BrowserRouter>
        <header>
          <MuiNavbar />
        </header>
        <main>
          <Routes>
            <Route index element={<MuiProducts />}></Route>
            <Route path="components" element={<MUICart />}></Route>
          </Routes>
        </main>
        <aside>
          <MUIasideDrawer />
        </aside>
        <footer></footer>
      </BrowserRouter> */}
    </>
  );
}

export default App;
