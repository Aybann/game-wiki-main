import { Link } from "react-router-dom";

const GridCards = ({games}) => {
  const spans = ['col-span-1 lg:col-span-2 ', 'col-span-1 lg:col-start-4 lg:col-end-5 lg:row-span-2']

  return ( 
    <>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white'>
        {
          games && games.map((game, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.593), rgba(0, 0, 0, 0.747)), url(${game.thumbnail})`
              }}
              className={`border border-gray-600 p-5 rounded-md bg-cover bg-center shadow-md ${(index === 0 || index === 4) ? spans[0] : 'col-span-1'  } ${index === 2 ? spans[1] : 'row-span-1'  }`}
            >
              <div>
                <h3 className='text-2xl font-bold'>{game.title}</h3>
                <p className='text-sm mb-2 text-gray-200 italic'>{game.developer} - {game.genre}</p>
                <p>{game.short_description}</p>
              </div>
              <Link 
                to={`/game/${game.id}`} 
                className="text-sm underline font-semibold rounded-sm pt-5">
                Learn more
              </Link>
            </div>
          ))
        }   
      </div>
    </>
  );
}
 
export default GridCards;