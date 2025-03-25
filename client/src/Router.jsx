import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout.jsx";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Incidents from "./pages/Incidents"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/",
                element: <Home />
            }, {
                path: "/incidents",
                element: <Incidents />
            }
        ],
    },
], {
    basename: global.basename
})