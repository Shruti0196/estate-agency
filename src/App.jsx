import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import HouseListCardView from './components/HouseListCardView/HouseListCardView'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Header />
      <HouseListCardView />
    </div>
  )
}

export default App
