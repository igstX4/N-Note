import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import {Header} from "./components/Header";
import {Note} from "./pages/Note";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import {Provider} from "react-redux";
import {store, useAppDispatch} from "./redux/store";
import {fetchMe} from "./redux/slices/UserSlice";
import {CreateNote} from "./pages/CreateNote";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
    {
        path: "/",
        element: <Header/>,
        children: [
            {
                path: "/",
                element: <App/>,
            },
            {
                path: "/:id",
                element: <Note/>,
            },
            {
                path: "/createNote",
                element: <CreateNote />
            },
            {
                path: "/login",
                element: <SignIn/>,
            },
            {
                path: "/register",
                element: <SignUp/>,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
