import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Categories from './components/Categories'
import Reviews from './components/Reviews'
import Sell from './components/Sell'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Browse from './pages/Browse'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
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
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
