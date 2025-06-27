import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import { lazy, Suspense } from 'react';

const ReusableFav = lazy(() => import('./components/FavoritesPage/FavoritesPage'));
const ViewHousePage = lazy(() => import('./components/ViewHousePage/ViewHousePage'));
const HomePage = lazy(() => import('./components/HomePage/HomePage'));


function App() {

  return (
    <div>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="homePage/house/:id" element={<ViewHousePage />}></Route>
            <Route path="homePage" element={<HomePage />}></Route>
            <Route path="favorites" element={<ReusableFav />}></Route>
          </Routes>
        </Suspense>
      </Router>

    </div>
  )
}

export default App
