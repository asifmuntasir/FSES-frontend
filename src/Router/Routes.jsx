import {
    createBrowserRouter,
} from "react-router-dom";

import Login from "../pages/Login"
import Main from "../Layout/Main";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Login></Login>
            },
            
        ],
    },
]);