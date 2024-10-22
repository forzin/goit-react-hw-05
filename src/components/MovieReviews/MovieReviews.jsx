import axios from 'axios';

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieReviews = () => {

    const { movieId } = useParams();

    const [movieReviews, setMovieReviews] = useState(null);

    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;

    const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjRjYjEzZDFmMTZhNThkMTU2ZTdhY2M1MTRlM2MyZCIsIm5iZiI6MTcyOTQxOTY4NC4wNjQ3MjgsInN1YiI6IjY3MTRkMzMyMGNiNjI1MmY5OTA4YWIzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p6BdwHRcEH7c6k55S6rQFoHF0MObjENSsqPa7Z1o_28'
        }
    };

    console.log(movieReviews);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                await axios.get(url, options)
               .then(response => setMovieReviews(response.data.results))
               .catch(err => console.error(err));
            } catch (error) {
                console.log(error);
            }
        }

        fetchReviews()
    }, [])

    if (!movieReviews) {
        return;
    }

    return(
        <div>
            <ul>
                {Array.isArray(movieReviews) && movieReviews.map(review => {
                    return (
                        <li key={review.id}>
                            <h5>{review.author_details.username}</h5>
                            {movieReviews.length === 0 ? (<p>Reviews none</p>) : (<p>{review.content}</p>)}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MovieReviews;