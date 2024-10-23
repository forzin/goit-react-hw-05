import React, { Suspense } from 'react';

const Navigation = React.lazy(() => import('./components/Navigation/Navigation'));
const AppRoutes = React.lazy(() => import('./components/AppRoutes/AppRoutes'));

function App() {
  return (
    <>
      <Suspense>
        <Navigation />
        <AppRoutes />
      </Suspense>
    </>
  )
}

export default App
