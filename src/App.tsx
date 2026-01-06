import ProductDetail from "@pages/ProductDetail";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ProductList from "@pages/ProductList";
import Checkout from "@pages/Checkout";
import AddressList from "./pages/AddressList";
import PaymentMethods from "./pages/PaymentMethods";
import Login from "@pages/Login";
import Register from "@pages/Register";
import BlogPage from "@pages/BlogPage";
import BlogList from "@pages/BlogList";
import AboutUs from "@pages/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/blog-list" element={<BlogList />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/checkout/address" element={<AddressList />} />
        <Route path="/checkout/payment" element={<PaymentMethods />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
