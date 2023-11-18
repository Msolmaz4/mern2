import React from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Deatail from './pages/Deatail';
import Products from './pages/Products';


const App = () => {
  return (
   
    
   
 

  <div>


    <Router>
    <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path="/product/:id" element={<Deatail/>}/>
         </Routes>
    <Footer/>
    </Router>
       
  </div>
   
  )
}

export default App