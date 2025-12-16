import React, { useEffect, useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase.js"
import Search from "./components/Search"
import Movie from "./components/Movie"

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_API_KEY


const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  const fetchMovies = async (query) => {
    try {
      let res;
      if(query==null || query===""){
        res = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`)
      } else {
        res = await fetch(`${API_BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`)
      }

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
  const handleSearch = (query) => {
    setSearchQuery(query)
    console.log(`user searched for ${query}`)
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
      alert('Failed to sign out. Please try again.')
    }
  }
  useEffect(()=>{
    fetchMovies();
  }, [])
  useEffect(()=>{
     fetchMovies(searchQuery)  
  }, [searchQuery])

  return (
    <main>
      <header>
        <div className="header-container">
          <div className="header">Find <span className="purple-gradient">Movies</span> You'll Enjoy Without The Hassle</div>
          
        </div>
        <Search onSend={handleSearch} /> 
      </header>

      <section>
        <ul className="movie-list">
          {movies.map((movie, index)=>(
            <Movie id={index} movie={movie}/>
          ))}
        </ul>
        {errorMessage? <p>{errorMessage}</p> : null}
      </section>
      <footer>
        <div className="footer-container"><button onClick={handleSignOut} className="sign-out-button">Sign Out</button></div>
      </footer>
      
    </main>
  )
}

export default App
