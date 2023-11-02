import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useBookmarks } from "../context/BookMarkProvider";
import { useMemo } from "react";
import Details from "../components/Details";

const GameDetails = () => {
  const { bookmarks } = useBookmarks()
  const { id } = useParams()
  const { data : game, isPending, error } = useFetch('https://free-to-play-games-database.p.rapidapi.com/api/game?id=' + id);
  const offLineData = useMemo(() => {
    return bookmarks.find(bookmark => bookmark.id === parseInt(id))
  },[id])
 
  return ( 
    <>
      {
        isPending && <div className="flex items-center justify-center h-[20em]">Loading....</div>
      }
      {
        error && 
          <div>
            {
              offLineData 
              ? <Details game={offLineData} />
              : <div  className="flex items-center justify-center h-[20em]">Ops! You're Offline!....</div>
            }
            
          </div>
      }
      {
        game && 
          <Details game={game} />
      }
    </>
  );
}
 
export default GameDetails;