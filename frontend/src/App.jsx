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
import { AuthProvider } from './context/AuthContext'
import CartDrawer from './components/CartDrawer'
import Browse from './pages/Browse'
import Checkout from './pages/Checkout'
import Product from './pages/Product'
import SellPage from './pages/SellPage'
import Profile from './pages/Profile'
import About from './pages/About'
import Login from './pages/Login'
import OrderSuccess from './pages/OrderSuccess'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
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
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/order-success" element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          } />
          <Route path="/sell" element={
            <ProtectedRoute>
              <SellPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  </AuthProvider>
  )
}

export default App
