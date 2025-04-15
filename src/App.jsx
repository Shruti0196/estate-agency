import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ViewHousePage from './components/ViewHousePage/ViewHousePage'
import LandingPage from './components/LandingPage/LandingPage'

function App() {
  const [data, setData] = useState([])

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="house/:id" element={<ViewHousePage />}></Route>
          <Route path="homePage" element={<HomePage />}></Route>

        </Routes>
      </Router>

    </div>
  )
}

export default App
