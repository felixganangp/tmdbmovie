import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from 'react-router-dom';

import RootLayout from '../layout/RootLayout';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import ErrorPage from '../pages/Error';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/movies" replace />,
      },
      {
        path: '/movies',
        element: <HomePage />,
      },
      {
        path: '/movies/:slug',
        element: <DetailPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
