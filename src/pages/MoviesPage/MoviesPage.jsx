import React from 'react';

const MovieList = React.lazy(() => import('../../components/MovieList/MovieList'));

import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

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
            <MovieList 
              movies={movies}
              location={location}
           />
        </div>
    );
}

export default MoviesPage;