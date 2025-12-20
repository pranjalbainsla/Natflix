import React, { useEffect, useState, useRef } from "react"
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
      if(data.results.length === 0){
        setErrorMessage("Uh-oh, no movies found!")
      }
      else{
        setErrorMessage(null)
      }

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
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchQuery("");
  }
  useEffect(()=>{
    fetchMovies();
  }, [])
  useEffect(()=>{
     if(searchQuery === ""){
      fetchMovies(searchQuery)
      return;
     }

     const timeoutId = setTimeout(()=>{
      fetchMovies(searchQuery)
     }, 500)
     return () => clearTimeout(timeoutId)
  }, [searchQuery])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [])

  function useAutoLogout() {
    const timerRef = useRef(null);
  
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
         signOut(auth)
      }, 5*60*1000);
    };
  
    useEffect(() => {
      const events = [
        "mousemove",
        "mousedown",
        "keydown",
        "scroll",
        "touchstart",
        "visibilitychange",
      ];
  
      const handleVisibility = () => {
        if (document.visibilityState === "visible") {
          resetTimer();
        }
      };
  
      events.forEach((e) => window.addEventListener(e, resetTimer));
      document.addEventListener("visibilitychange", handleVisibility);
  
      resetTimer(); // start timer on mount
  
      return () => {
        events.forEach((e) => window.removeEventListener(e, resetTimer));
        document.removeEventListener("visibilitychange", handleVisibility);
        clearTimeout(timerRef.current);
      };
    }, []);
  }
  useAutoLogout();

  return (
    <main>
      <header className="sign-out">
            <button aria-label="home-button" onClick={handleHomeClick} className="sign-out-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </button>
            <button aria-label='sign-out-button' onClick={handleSignOut} className="sign-out-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
              </svg>
            </button>
      </header>
      <section className="new-header">
        <div className="header-container">
          <div className="header">Hi chat, what are we <span className="purple-gradient">watching?</span></div>
        </div>
        <Search onSend={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
      </section>

      <section className="body-content">
        <div className="error-message">{errorMessage? <p style={{ color: 'grey'}}>{errorMessage}</p> : null}</div>
        <ul className="movie-list">
          {movies.map((movie, index)=>(
            currentMovie && currentMovie.id === movie.id ? (
              <Chat key={movie.id} movie={movie} user={user} onClick={()=>setCurrentMovie(null)} />
            ) : (
              <Movie key={movie.id} movie={movie} onClick={()=>setCurrentMovie(movie)} isLCP={index===0}/>
            )
          ))}
        </ul>
        
      </section> 
    </main>
  )
}

export default App
