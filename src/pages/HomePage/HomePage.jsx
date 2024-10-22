import styles from './HomePage.module.css'
import axios from 'axios';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        <div className={styles.sectionTopMovies}>
            <h2 className={styles.moviesTitle}>Top Movies per day</h2>
            <ul className={styles.movieList}>
                {Array.isArray(movies) && movies.map((movie) => {
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
                    );
                })}
            </ul>
        </div>
    )
}

export default HomePage;