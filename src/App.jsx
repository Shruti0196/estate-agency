import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import HouseListCardView from './components/HouseListCardView/HouseListCardView'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ViewHousePage from './components/ViewHousePage/ViewHousePage'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData(params) {
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}houses`)
        if (!response.ok) {
          throw new Error('Not ok');
        }
        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (error) {
        console.error('Error: ', error)
      }
    }
    fetchData();
  }, [])
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HouseListCardView />}></Route>

          <Route path="house/:id" element={<ViewHousePage />}></Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App
