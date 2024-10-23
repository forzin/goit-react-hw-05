import { Route, Routes} from 'react-router-dom';
import React, { Suspense } from 'react';

const HomePage = React.lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = React.lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = React.lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const MovieReviews = React.lazy(() => import('../MovieReviews/MovieReviews.jsx'));
const MovieCast = React.lazy(() => import('../../components/MovieCast/MovieCast.jsx'));
const NotFoundPage = React.lazy(() => import('../../pages/NotFoundPage'));

const AppRoutes = () => {
    return (
        <div>
          <Suspense>
            <Routes>
               <Route path='/' element={<HomePage />} />
               <Route path='/movies' element={<MoviesPage />} />
               <Route 
                  path='/movies/:movieId/' 
                  element={<MovieDetailsPage />}>
                    <Route path='reviews' element={<MovieReviews />} /> 
                    <Route path='cast' element={<MovieCast />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
    )
}

export default AppRoutes;