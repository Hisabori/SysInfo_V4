// 경로: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'; // App.jsx를 다시 사용
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // 이제 App이 모든 페이지의 껍데기가 된다
        children: [ // App의 Outlet으로 들어갈 자식 페이지들
            {
                index: true, // path: '/' 와 동일한 경로일 때
                element: <HomePage />,
            },
            {
                path: 'dashboard', // path: '/dashboard'
                element: <DashboardPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);