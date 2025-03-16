import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            }
        ],
    },
], {
    basename: global.basename
})