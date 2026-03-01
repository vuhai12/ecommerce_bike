import ProductDetail from "@pages/ProductDetail";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Checkout from "@pages/Checkout";

import ScrollHandler from "@components/ScrollHandler";
import { Suspense, lazy } from "react";
import LoadingSpinner from "@components/LoadingSpinner";

const HomePage = lazy(() => import("@pages/HomePage"));
const ProductList = lazy(() => import("@pages/ProductList"));
const AddressList = lazy(() => import("@pages/AddressList"));
const PaymentMethods = lazy(() => import("@pages/PaymentMethods"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const BlogPage = lazy(() => import("@pages/BlogPage"));
const BlogList = lazy(() => import("@pages/BlogList"));
const AboutUs = lazy(() => import("@pages/AboutUs"));

function App() {
  return (
    <>
      <ScrollHandler />
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </>
  );
}

export default App;
