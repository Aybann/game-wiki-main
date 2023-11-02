import { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext({});

export function useBookmarks() {
  return useContext(DataContext)
}

export const BookMarkProvider = ({ children }) => {
  const [bookmarks, setBookMarks] = useState([])

  useEffect(() => {
    const retrieveLocalData = localStorage.getItem('bookmarks')
    if(retrieveLocalData) {
      setBookMarks(JSON.parse(retrieveLocalData))
    }
  },[])

  return ( 
    <DataContext.Provider value={{bookmarks, setBookMarks}}>
        {children}
    </DataContext.Provider>
  );
}
 
export default DataContext;