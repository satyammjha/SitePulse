import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";

console.log("Publishable Key Found:", PUBLISHABLE_KEY)
export default function App() {
    return (
        <ThemeProvider>

            <RouterProvider router={router} />

        </ThemeProvider>
    )
}