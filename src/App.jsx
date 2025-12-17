import React, { useEffect, useState } from "react"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase.js"
import Search from "./components/Search"
import Movie from "./components/Movie"
import Chat from "./components/Chat"

const API_BASE_URL = 'https://getmovies-cxzephsa4a-uc.a.run.app'




const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [currentMovie, setCurrentMovie] = useState(null)
  const [user, setUser] = useState(null)

  // Auto sign-out after a period of inactivity (in ms)
  const AUTO_SIGN_OUT_MS = 1 * 60 * 1000 // 30 minutes

  const fetchMovies = async (query) => {
    try {
      const url = query
      ? `${API_BASE_URL}/getMovies?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/getMovies`;

      const res = await fetch(url)

      if(!res.ok){
        //error
        throw new Error('Failed to load movies')
      }

      const data = await res.json()

      setMovies(data.results)

    } catch (error) {
      if (!navigator.onLine) {
        setErrorMessage("You're offline. Check your internet connection.");
      } else {
        setErrorMessage("Error loading movies!");
      }
    }
  }
  const handleSearch = (query) => {
    setSearchQuery(query)

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [])

  return (
    <main>
      <header>
        <div className="header-container">
          <div className="header">Hi chat, what are we <span className="purple-gradient">watching?</span></div>
          
        </div>
        <Search onSend={handleSearch} /> 
      </header>

      <section className="body-content">
      <div className="error-message">{errorMessage? <p style={{ color: 'grey'}}>{errorMessage}</p> : null}</div>
        <ul className="movie-list">
          {movies.map((movie)=>(
            currentMovie && currentMovie.id === movie.id ? (
              <Chat key={movie.id} movie={movie} user={user} onClick={()=>setCurrentMovie(null)} />
            ) : (
              <Movie key={movie.id} movie={movie} onClick={()=>setCurrentMovie(movie)}/>
            )
          ))}
        </ul>
        
      </section>
      <footer>
        <div className="footer-container"><button onClick={handleSignOut} className="sign-out-button">Sign Out</button></div>
      </footer>
      
    </main>
  )
}

export default App
