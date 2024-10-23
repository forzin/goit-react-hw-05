import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import styles from './MoviesPage.module.css'

const MoviesPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState(null);

    const location = useLocation();

    const searchParam = searchParams.get('query');

    const url = `https://api.themoviedb.org/3/search/movie?query=${searchParam}`;

    const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjRjYjEzZDFmMTZhNThkMTU2ZTdhY2M1MTRlM2MyZCIsIm5iZiI6MTcyOTQxOTY4NC4wNjQ3MjgsInN1YiI6IjY3MTRkMzMyMGNiNjI1MmY5OTA4YWIzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p6BdwHRcEH7c6k55S6rQFoHF0MObjENSsqPa7Z1o_28'
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const searchparam = form.elements.searchparam.value.trim();
      
        if (!searchparam) {
          alert('You need to input some word!')
          return;
        }

        setSearchParams({ query: searchparam });
  
        form.elements.searchparam.value = '';
    }

    useEffect(() => {
        if (searchParam === null) return;

        const fetchMovies = async () => {
            try {
                await axios.get(url, options)
               .then(response => setMovies(response.data.results))
               .catch(err => console.error(err));
            } catch (error) {
                console.log(error);
            }
        }

        fetchMovies();
    }, [searchParam])

    return (
        <div>
            <form className={styles.formSearch} onSubmit={handleSubmit}>
               <input
                   name="searchparam"
                   type="text"
                   placeholder="Search images and photos"
               />
               <button type="submit">Search</button>
            </form>
            <div>
                <ul className={styles.movieList}>
                    {Array.isArray(movies) && movies.map(movie => {
                        return (
                            <Link key={movie.id} state={{
                                from: location
                            }} to={`/movies/${movie.id}`}>
                               <li className={styles.movieItem}>
                                  <div >
                                      <h3>{movie.title}</h3>
                                      <img src={movie.poster_path === null ? 'https://via.placeholder.com/300x450?text=No+Image&icon=camera' : `https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.original_title} />
                                  </div>
                               </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default MoviesPage;