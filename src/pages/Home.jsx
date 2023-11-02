import { useState, useEffect, useMemo } from "react";
import GridCards from "../components/GridCards";
import filterIcon from "../assets/bx-filter.svg"
import { useSearchParams } from "react-router-dom"
import arrowTop from '../assets/bxs-up-arrow.svg'
import searchIcon from '../assets/bx-search.svg'

const Home = ({ games, isPending, error}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filterSelected, setIFilterSelected] = useState([])
  const filters = [ 
    "MMORPG",
    "Shooter",
    "MOBA",
    "Anime",
    "Battle Royale",
    "Strategy",
    "Fantasy",
    "Sci-Fi",
    "Card Games",
    "Racing",
    "Fighting",
    "Social",
    "Sports",
  ]

  const [searchParams, setSearchParams ] = useSearchParams({query: ""})
  const query = searchParams.get("query")

  const filteredGames = useMemo(() => { 
    return games?.filter(game => {
      return  filterSelected.length === 0 
        ? 
          game.title.toLowerCase().includes(query.toLowerCase()) || game.genre.includes(query.toLowerCase())
        : 
          (game.title.toLowerCase().includes(query.toLowerCase()) || game.genre.includes(query.toLowerCase())) && filterSelected.includes(game.genre)
    })
  },[filterSelected, query, games])

  const handleOpenFiltered  = () => {
    setIsOpen(prev => {
      return prev = !prev
    })
  }

  const handleAddFilter = (filter) => {
    if(!filterSelected.includes(filter)) {
      setIFilterSelected(prev => {
        return prev = [...prev, filter]
      })
    }
  }

  const handleRemoveFilter = (filter) => {
    setIFilterSelected(prev => {
      return prev = prev.filter(item => filter !== item)
    })
  }

  return ( 
    <>
      <a 
        href="#header" 
        className="border border-gray-400 p-2 bg-white shadow-md fixed bottom-4 right-4 rounded-md">
        <img src={arrowTop} alt="" className="w-6"/>
      </a>
      <header id="header" className="w-fit md:max-w-[60ch] mx-auto text-center mt-10">
        <div>
          <h1 className="text-3xl md:text-5xl text-black font-bold mb-4 dark:text-white">
            Explore Our Game Library</h1>
          <p>Dive into Our Vast and Varied Collection of games from Different Genres, Platform and Category!</p>
        </div>
        <form className="mt-4 flex gap-2 justify-center sticky top-1">
          <div className="flex justify-between px-4 py-3 w-full md:w-[40ch] border border-gray-600 rounded-md shadow-md dark:text-white dark:border-gray-200">
            <input 
              onChange= {e => setSearchParams(prev => {
                prev.set("query", e.target.value)
                return prev
              }, {replace: true} )}
              value={query} 
              type="search" placeholder="Looking for Specific game?" className="w-full outline-none bg-transparent" 
            />
            <img src={searchIcon} alt="" className="dark:invert"/>
          </div>
        </form>
      </header>
      <section className="my-8">
        <div className="flex flex-col md:flex-row gap-5 my-4">
          <button 
            onClick={handleOpenFiltered}
            className="bg-gray-100 text-gray-900 text-sm rounded-3xl font-semibold w-fit p-2 px-7 md:mt-0 relative h-fit"
          >
            All Filters
            <img src={filterIcon} alt="" className="ml-2 inline" />
            <div className={`${isOpen ? 'absolute' : 'hidden'} top-12 left-0  flex gap-2 border border-gray-500 w-[18em] py-2 bg-white  rounded-md shadow-sm`}>
              <ul className={` text-center  z-20 `}>
                {
                  filters && filters.slice(0,6).map((filter, index) => (
                    <li key={index} className='py-2 px-5 text-sm '>
                      <div onClick= {e => handleAddFilter(filter)} type="button" className="capitalize">
                        {filter}
                      </div>
                    </li>
                  ))
                }
              </ul>
              <ul className={` text-center z-20 `}>
                {
                  filters && filters.slice(6).map((filter, index) => (
                    <li key={index} className='py-2 px-5 text-sm '>
                      <div onClick= {e => handleAddFilter(filter)} type="button" className="capitalize">
                        {filter}
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </button>
          <ul className='flex flex-wrap justify-start items-center gap-4 '>
            {
              filterSelected && filterSelected.map((filter, index) => (
                <li key={index} className='p-2 px-5 text-sm font-semibold rounded-3xl bg-white  dark:bg-slate-900 w-fit'>
                  <button onClick= {e => handleRemoveFilter(filter)} type="button">
                    {filter} <span className="font-bold ml-4">x</span>
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        {
          isPending && <div className="flex items-center justify-center h-[12em]">Loading....</div>
        }
        {
          error && <div className="flex items-center justify-center h-[12em]">Ops! Something went wrong!....</div>
        }
        {
          (filteredGames  &&  filteredGames.length !== 0) || error
          ? <GridCards games={filteredGames}/>
          : <div className="flex items-center justify-center h-[7em]">No games found on  {query}</div>
        }     
      </section>
  
    </>
  );
}
 
export default Home;