import React, { useEffect, useState } from "react"
import Search from "./components/Search"
import Movie from "./components/Movie"

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_TOKEN

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  } 
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  const fetchMovies = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_OPTIONS)

      if(!res.ok){
        //error
        throw new Error('Failed to load movies')
      }

      const data = await res.json()
      console.log(data)

      setMovies(data.results)

    } catch (error) {
      console.log(error.message)
      setErrorMessage("Error loading movies!")
    }
  }
  useEffect(()=>{
    fetchMovies();
  }, [])
  return (
    <main>
      <header>
        <div className="header">Find <span className="purple-gradient">Movies</span> You'll Enjoy Without The Hassle</div>
        <Search /> 
      </header>

      <section>
        <h2>all movies</h2>
        <ul className="movie-list">
          {movies.map((movie, index)=>(
            <Movie id={index} movie={movie}/>
          ))}
        </ul>
        {errorMessage? <p>{errorMessage}</p> : null}
      </section>
      
    </main>
  )
}

export default App
