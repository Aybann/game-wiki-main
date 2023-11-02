import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import hamIcon from '../assets/Hamburger Menu.svg'
import logo from '../assets/logo.png'

const Navigation = ({setFont}) => {
  const element = document.documentElement
  const [isDark, setIsDark] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if(isDark){
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  },[isDark])

   const handleToggleDark = () => {
    if(isDark){
      setIsDark(false)   
    } else {
      setIsDark(true)
    }
  }

  const handleOpenPreference = () => {
    if(isOpen){
      setIsOpen(false)   
    } else {
      setIsOpen(true)
    }
  }

  return ( 
    <div className="flex gap-8 items-center justify-between px-4 py-4 md:px-8 shadow-sm border-b dark:border-gray-800 relative">
      <div className="flex gap-4 md:gap-8 items-center">
        <div>
          <Link to={`/`}>
            <img src={logo} alt="" className="w-10 dark:invert" />
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-4 font-semibold"> 
            <li>
              <Link to={`/bookmarks`}>Bookmarks</Link>
            </li>
          </ul>
        </nav>
      </div>
      <button onClick={handleOpenPreference} className="block md:hidden">
        <img src={hamIcon} alt="" srcset="" className="dark:invert w-8"/>
      </button>
      <div className={`${isOpen ? 'flex' : 'hidden'} flex-col-reverse absolute top-14 right-5 bg-white dark:bg-slate-900 rounded-md p-4 md:p-0 md:static md:flex  md:flex-row md:bg-transparent md:dark:bg-transparent gap-2 items-center`}>
        <select 
          onChange={e => setFont(e.target.value)}
          className="bg-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-4 dark:text-slate-200 dark:bg-slate-800"
        >
          <option defaultValue="font-serif"> Serif</option>
          <option value='font-sans'>Sans</option>
          <option value="font-mono">Mono</option>
          <option value="font-thin">Thin</option>
        </select>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" onClick={handleToggleDark} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-900 dark:bg-slate-800"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {
              isDark 
              ?<svg className="h-6 w-6 text-gray-400"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              : <svg className="h-5 w-5 text-gray-400"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" /></svg>
            }
          </span>
        </label>
        <nav className="block md:hidden">
          <ul className="flex gap-4 font-semibold"> 
            <li>
              <Link to={`/bookmarks`}>Bookmarks</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
 
export default Navigation;