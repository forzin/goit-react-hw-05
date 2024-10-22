import axios from 'axios';
import styles from './MovieDetailsPage.module.css'

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

const MovieDetailsPage = () => {
    const { movieId } = useParams();

    const [movieInfo, setMovieInfo] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const url = `https://api.themoviedb.org/3/movie/${movieId}`;

    const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjRjYjEzZDFmMTZhNThkMTU2ZTdhY2M1MTRlM2MyZCIsIm5iZiI6MTcyOTQxOTY4NC4wNjQ3MjgsInN1YiI6IjY3MTRkMzMyMGNiNjI1MmY5OTA4YWIzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p6BdwHRcEH7c6k55S6rQFoHF0MObjENSsqPa7Z1o_28'
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                await axios.get(url, options)
               .then(response => setMovieInfo(response.data))
               .catch(err => console.error(err));
            } catch (error) {
                console.log(error);
            }
        }

        fetchDetails()
    }, [])

    if (!movieInfo) {
      return <p>Loading movie details...</p>;  
    }

    const goBack = () => {
      if (location.state && location.state.from) {
        navigate(location.state.from);
    } else {
        navigate('/movies');  
    }
    }

    return (
       <div className={styles.detailsContainer}>
          <div>
            <div className={styles.linkBack}>
              <Link className={styles.linkBackButton} onClick={(e) => { e.preventDefault(); goBack(); }}>Go back</Link>
            </div>
            <img src={movieInfo.poster_path === null ? 'https://via.placeholder.com/300x450?text=No+Image&icon=camera' : `https://image.tmdb.org/t/p/w300${movieInfo.poster_path}`} alt={movieInfo.original_title} />
          </div>
          <div className={styles.infoMovie}>
             <h3 className={styles.movieTitle}>{movieInfo.title}</h3>
             <div>
               <h4>Release date</h4>
               <p>{movieInfo.release_date ? movieInfo.release_date : 'This movie will be released'}</p>
             </div>
             <div>
               <h4>Country</h4>
               <p>{movieInfo.origin_country ? movieInfo.origin_country : 'Country is unknown'}</p>
             </div>
             <div>
               <h4>Overview</h4>
               <p>{movieInfo.overview ? movieInfo.overview : 'Overview none'}</p>
             </div>
             <div className={styles.additionals}>
                <h4>Additional information</h4>
                <ul>
                  <li>
                    <Link state={{ from: location.state && location.state.from ? location.state.from : '/movies' }} to={`/movies/${movieId}/cast`}>Cast</Link>
                  </li>
                  <li>
                    <Link state={{ from: location.state && location.state.from ? location.state.from : '/movies' }}  to={`/movies/${movieId}/reviews`}>Reviews</Link>
                  </li>
                </ul>
                <Outlet />
             </div>
          </div>
       </div>
    )
}

export default MovieDetailsPage;