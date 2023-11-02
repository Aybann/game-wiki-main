import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '29d0143e42msh9c4ec37b5c0bc53p14b0a3jsnc25f9da0eed3',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  useEffect(() =>{
    const abortCont = new AbortController();
 
    fetch(url, options, { signal: abortCont.signal } )
    .then(res => {
     if(!res.ok){
       throw Error("Could not get the data the resources")
     }
     return res.json()
    }).then(data => {
      setData(data)
      setIsPending(false)
      setError(null)
    }).catch(error => {
      if(error.name === 'AbortError') {
      } else {
        setIsPending(false)
        setError(error.message)
      }
    })
    return () => abortCont.abort();
 }, [url])

 return { data, isPending, error }
}

export default useFetch;