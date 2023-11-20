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

const App = () => {


  const dispatch = useDispatch()

  const {user,isAuth} = useSelector(state=>state.user)
  useEffect(()=>{
    dispatch(profile())
  },[dispatch])

console.log(user,isAuth,'appIserIasauth')
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Deatail />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
