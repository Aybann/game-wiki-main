import { useBookmarks } from "../context/BookMarkProvider";
import GridCards from "../components/GridCards";
import clearIcon from "../assets/bxs-message-square-x.svg"

const Bookmarks = () => {
  const { bookmarks, setBookMarks } = useBookmarks()

  const clearBookMarks = () => {
    setBookMarks([])
    localStorage.setItem("bookmarks", [])
  }

  return ( 
    <>
      <section className="my-8">
        <header className="flex gap-4 justify-between">
          <h1 className="text-2xl text-black font-bold dark:text-white" >
            Bookmarks
          </h1>
          <button 
            className="bg-red-500 text-white py-1 px-2 rounded-md flex gap-2 font-semibold hover:bg-red-400 transition-colors text-sm items-center"
            onClick={clearBookMarks}
          >
            <img src={clearIcon} alt="" className="invert w-4"/>
            Clear
          </button>
        </header>
        <section className="my-8">
          {
            bookmarks && bookmarks.length !== 0
            ?
              <GridCards games={bookmarks}/>
            :
              <div className="h-[12em] grid place-items-center"> No Saved Bookmarks at the moment!</div>
          }
         
        </section>
      </section>
    </>
  );
}
 
export default Bookmarks;