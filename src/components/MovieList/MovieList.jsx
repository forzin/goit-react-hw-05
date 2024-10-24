import { Link } from 'react-router-dom';

import styles from './MovieList.module.css'

const MovieList = ({ location, movies }) => {
    return (
        <div className={styles.sectionTopMovies}>
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

export default MovieList;