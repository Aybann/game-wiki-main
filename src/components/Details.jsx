import bookmarkIcon from '../assets/bx-bookmarks.svg'
import bookmarkIconMark from '../assets/bxs-bookmarks.svg'
import { useBookmarks } from "../context/BookMarkProvider";

const Details = ({game}) => {
  const { bookmarks , setBookMarks} = useBookmarks()
  const handleStoreBookmark = () => {
    if(bookmarks.some(data => data.id ===  game.id)) {
      const localData = bookmarks.filter(data => data.id !== game.id)
      localStorage.setItem("bookmarks", JSON.stringify(localData))
      setBookMarks(localData)
    } else {
      const localData = [...bookmarks, game]
      localStorage.setItem("bookmarks", JSON.stringify(localData))
      setBookMarks(localData)
    }
  }
  return ( 
    <section className="w-full md:mx-auto lg:w-[80ch] my-4">
      <div className="h-[16em] overflow-hidden">
        <img src={game.screenshots[0].image} alt="" className=""/>
      </div>
      <article className="my-6 w-fit">
        <div className="flex gap-4">
          <img src={game.thumbnail} alt="" className="w-16"/>
          <div className="flex justify-between gap-4 w-full">
          <div>
            <h1 className="text-3xl text-black font-bold dark:text-white">{game.title}</h1>
            <p className="italic text-sm">{game.developer} - {game.platform}</p>
          </div>
            <button onClick={handleStoreBookmark}>
              {
                bookmarks.some(data => data.id ===  game.id) 
                ? <img src={bookmarkIconMark} alt="" className="dark:invert"/>
                : <img src={bookmarkIcon} alt="" className="dark:invert"/>
              }
              
            </button>
          </div>
        </div>
        <div className="my-4 text-sm">
          <p>Publisher: {game.publisher}</p>
          <p>Developer: {game.developer}</p>
          <p>Genre: {game.genre}</p>
          <p>Release Date: {game.release_date}</p>
          <a href="game_url" target="_blank" rel="noopener noreferrer" className="underline italic">{game.game_url}</a>
        </div>
        <div className="my-4">
          <h2 className="text-2xl text-black font-bold dark:text-white">Description</h2>
          <p>{game.description}</p>
        </div>
        {
          game.minimum_system_requirements &&
            <div className="my-4">
              <h2 className="text-2xl text-black font-bold dark:text-white">Minimum System Requirements</h2>
              <ul className="list-disc list-inside">
                {
                  Object.keys(game.minimum_system_requirements).map((key) => (
                    <li key={key}>
                      <span className="capitalize">{key}</span> : {game.minimum_system_requirements[key]}
                    </li>
                  ))
                }
              </ul>
            </div>
        }
        <div className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {
            game.screenshots && game.screenshots.map((shot, index) => (
              <img key={index} src={shot.image} alt=""  />
            ))
          }
          </div>
        </div>
      </article>
    </section>
  );
}
 
export default Details;