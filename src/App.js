import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import GameSetupPage from './routes/GameSetupPage';
import ErrorPage from './routes/ErrorPage';
import GameBoardPage from './routes/GameBoardPage';

const routes = [
    {
        path: '/',
        element: <GameSetupPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/game',
        element: <GameBoardPage />,
        errorElement: <ErrorPage />
    }
];

const router = createBrowserRouter(routes);

const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
            <GlobalStyle />
        </Provider>
    );
};

export default App;
