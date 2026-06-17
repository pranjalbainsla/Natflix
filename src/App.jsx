import React, { useState } from 'react';
import Search from './components/Search';
import Movie from './components/Movie';
import Chat from './components/Chat';
import { useMovies } from './hooks/useMovies';

const App = () => {
  const { searchQuery, setSearchQuery, movies, loading, errorMessage } = useMovies();
  const [currentMovie, setCurrentMovie] = useState(null);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchQuery('');
  };

  return (
    <main>
      <header className="app-header">
        <button
          aria-label="home-button"
          onClick={handleHomeClick}
          className="header-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
      </header>

      <section className="new-header">
        <div className="header-container">
          <div className="header">
            Hi chat, what are we <span className="purple-gradient">watching?</span>
          </div>
        </div>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </section>

      <section className="body-content">
        {errorMessage && (
          <div className="error-message">
            <p style={{ color: 'grey' }}>{errorMessage}</p>
          </div>
        )}
        {loading && (
          <div className="spinner-container">
            <div className="spinner" />
          </div>
        )}
        <ul className="movie-list">
          {movies.map((movie, index) =>
            currentMovie && currentMovie.id === movie.id ? (
              <Chat
                key={movie.id}
                movie={movie}
                onClick={() => setCurrentMovie(null)}
              />
            ) : (
              <Movie
                key={movie.id}
                movie={movie}
                onClick={() => setCurrentMovie(movie)}
                isLCP={index === 0}
              />
            )
          )}
        </ul>
      </section>
    </main>
  );
};

export default App;
