import Footer from "./components/Footer"
import Navigation from "./components/Navigation"
import GameDetails from "./pages/GameDeatails"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import useFetch from "./hooks/useFetch"
import React, { useState } from 'react';
import Bookmarks from "./pages/Bookmarks"


function App() {
   const { data : games, isPending, error } = useFetch('https://free-to-play-games-database.p.rapidapi.com/api/games');
   const [font, setFont] = useState('font-serif')

  return (
    <div className={`${font} bg-gray-50 text-gray-600 dark:text-slate-200 dark:bg-slate-950`}>
      <Navigation  setFont={setFont}/>
      <main className="md:mx-auto md:max-w-[1320px] px-4">
        <Routes>
          <Route 
            path="/" 
            element={ 
              <Home 
                games={games} 
                isPending={isPending} 
                error={error}   
              />
            } 
          />
          <Route path="/bookmarks" element={ <Bookmarks />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>     
      </main>
      <Footer />
    </div>
  )
}

export default App
