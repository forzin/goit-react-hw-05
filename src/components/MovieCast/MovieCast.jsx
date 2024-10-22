import axios from 'axios';
import styles from './MovieCast.module.css'

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieCast = () => {

    const { movieId } = useParams();

    const [movieCast, setMovieCast] = useState(null);

    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

    const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjRjYjEzZDFmMTZhNThkMTU2ZTdhY2M1MTRlM2MyZCIsIm5iZiI6MTcyOTQxOTY4NC4wNjQ3MjgsInN1YiI6IjY3MTRkMzMyMGNiNjI1MmY5OTA4YWIzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p6BdwHRcEH7c6k55S6rQFoHF0MObjENSsqPa7Z1o_28'
        }
    };

    useEffect(() => {
        const fetchCasts = async () => {
            try {
                await axios.get(url, options)
               .then(response => setMovieCast(response.data.cast))
               .catch(err => console.error(err));
            } catch (error) {
                console.log(error);
            }
        }

        fetchCasts()
    }, [])

    return(
        <div>
            <ul className={styles.listCasts}>
                {Array.isArray(movieCast) && movieCast.map(cast => {
                    return (
                        <li key={cast.id}>
                            <img src={cast.profile_path === null ? 'https://via.placeholder.com/300x450?text=No+Image&icon=camera' : `https://image.tmdb.org/t/p/w300${cast.profile_path}`} alt="" />
                            <h4>{cast.original_name}</h4>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MovieCast;