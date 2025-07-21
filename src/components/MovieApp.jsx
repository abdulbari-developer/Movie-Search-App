import React from 'react'
import { useState, useEffect } from 'react'
import './movie-app.css'
import axios from 'axios'
import search_i from '../assets/search.png'
const MovieApp = () => {
  const [searchQuery, setquery] = useState('')
  const [movies, setmovies] = useState([])
  const [expandedMovieId, setExpandedMovieId] = useState(null)
  const handleSearchChange = (event) => {
    setquery(event.target.value)
  }
  const handleSearchSubmit = async () => {
    const response = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          query:searchQuery || "avengers",
          api_key:import.meta.env.VITE_TMDB_API_ID
        }
      }
    );
    setmovies(response.data.results);
  }
  useEffect(() => {
    handleSearchSubmit();
  }, []);
  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };
  return (
    <>
      <div>
        <h1>MovieHouse</h1>
        <div className="search-bar">
          <input type="text" placeholder='search' value={searchQuery} onChange={handleSearchChange} className='search-input' />
          <img onClick={handleSearchSubmit} className='search-btn' src={search_i} alt="" />
        </div>
      </div>
      <div className="movie-wrapper" >
        {movies.map((movies) => (
          <div className='movie' key={movies.id}>
            <img src={`https://image.tmdb.org/t/p/w400${movies.poster_path}.jpg`} alt="{movies.title}" />
            <h2>{movies.title}</h2>
            <p className="rating">Rating:{movies.vote_average}</p>
            {expandedMovieId === movies.id ? (
              <p>{movies.overview}</p>
            ) : (
              <p>{movies.overview.substring(0, 150)}...</p>
            )}

            <button onClick={() => toggleDescription(movies.id)} className="read-more">
              {expandedMovieId === movies.id ? 'Show Less' : 'Read More'}
            </button>
          </div>

        ))}

      </div>
    </>

  )
}

export default MovieApp
