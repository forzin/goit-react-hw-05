import React from 'react';

const MovieList = React.lazy(() => import('../../components/MovieList/MovieList'));

import axios from 'axios';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const HomePage = () => {

    const [movies, setMovies] = useState(null);

    const location = useLocation();

    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

    const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjRjYjEzZDFmMTZhNThkMTU2ZTdhY2M1MTRlM2MyZCIsIm5iZiI6MTcyOTQxOTY4NC4wNjQ3MjgsInN1YiI6IjY3MTRkMzMyMGNiNjI1MmY5OTA4YWIzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p6BdwHRcEH7c6k55S6rQFoHF0MObjENSsqPa7Z1o_28'
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                await axios.get(url, options)
               .then(response => setMovies(response.data.results))
               .catch(err => console.error(err));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMovies()
    }, []);

    return (
        <MovieList 
           movies={movies}
           location={location}
        />
    )
}

export default HomePage;