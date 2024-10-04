import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Basket from "./components/Basket";
import Category from "./components/Category";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import Layout from "./components/Layout";
import OrderConfirmation from "./components/OrderConfirmation";
import ProductDetail from "./components/ProductDetail";
import SearchResults from "./components/SearchResults";
import { getCategories } from "./fetcher";

const App = () => {
  const [categories, setCategories] = useState({ errorMessage: "", data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    };
    fetchData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout categories={categories} />}>
            {/* index in Route meaning the Home page */}
            <Route index element={<Home />} />
            <Route path="basket" element={<Basket />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orderConfirmation" element={<OrderConfirmation />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="categories/:categoryId" element={<Category />} />
            <Route path="products/:productId" element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
