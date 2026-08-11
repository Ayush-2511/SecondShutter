import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Categories from './components/Categories'
import Reviews from './components/Reviews'
import Sell from './components/Sell'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Browse from './pages/Browse'
import Checkout from './pages/Checkout'
import Product from './pages/Product'
import SellPage from './pages/SellPage'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <CartDrawer />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Shop />
              <Categories />
              <Reviews />
              <Sell />
              <Newsletter />
            </>
          } />
          <Route path="/browse" element={<Browse />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sell" element={<SellPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App
