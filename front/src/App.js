import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Deatail from "./pages/Deatail";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./redux/userSlice";
import Profile from "./pages/Profile";
import ProductRouter from "./components/ProductRouter";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";

const App = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

 
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reset/:token" element={<ResetPassword />} />


          <Route element={<ProductRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/product/:id" element={<Deatail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
