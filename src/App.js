import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from 'sonner';

import Home from "./components/home/Home";
import ProductPage from "./components/productpage/ProductPage";
import ProductCatalog from "./components/prodcatalog/ProductCatalog";
import CartPage from "./components/cartpage/CartPage";
import AccountInfoPage from "./components/accountInfoPage/AccountInfoPage";
import SelectAddressPage from "./components/Checkout/SelectAddressPage";
import PaymentPage from "./components/Checkout/PaymentPage";
import GoldMembershipPage from "./components/goldmembershipcard/GoldMembershipPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="products" element={<ProductCatalog />} />
            <Route path="productDetail" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="cart/address" element={<SelectAddressPage />}></Route>
            <Route path="AccountInfo" element={<AccountInfoPage />}></Route>
            <Route path="cart/payment" element={<PaymentPage />}></Route>
            <Route path="goldMembership" element={<GoldMembershipPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center"></Toaster>
    </div>
  );
}

export default App;
