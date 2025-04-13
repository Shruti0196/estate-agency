import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ViewHousePage from './components/ViewHousePage/ViewHousePage'

function App() {
  const [data, setData] = useState([])

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="house/:id" element={<ViewHousePage />}></Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App
