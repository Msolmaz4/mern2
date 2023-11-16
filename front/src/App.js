import React from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './layout/Header'
import Footer from './layout/Footer'


const App = () => {
  return (
   
    
   
 

  <div>

 <Header/>
    <Router>
   
        <Routes>
          <Route path="/" element={<Home/>}/>
         </Routes>
    <Footer/>
    </Router>
       
  </div>
   
  )
}

export default App