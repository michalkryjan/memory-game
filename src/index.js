import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';
import GameBoardPage from './routes/GameBoardPage';
import GameSetupPage from './routes/GameSetupPage';
import './styles/global.css';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />
    },
    {
        path: '/setup',
        element: <GameSetupPage />
    },
    {
        path: '/game/:theme/:playersCount/:boardLength',
        element: <GameBoardPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
