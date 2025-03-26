import { useEffect } from "react";
import { Button } from "../../ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import addUser from "@/service/addUser";

const AuthComponent = () => {
    const { user, isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

    console.log("User is", user);

    useEffect(() => {
        const registerUser = async () => {
            if (isAuthenticated && user?.name && user?.email) {
                const storedUser = localStorage.getItem("registeredUser");

                if (storedUser === user.email) {
                    console.log("User is already registered, skipping API call.");
                    return;
                }

                try {
                    const token = await getAccessTokenSilently();
                    console.log("Fetched access token:", token);  // ✅ Check if token refreshes
                    await addUser(user.name, user.email);
                    localStorage.setItem("registeredUser", user.email);
                } catch (error) {
                    console.error("Error fetching token or adding user:", error);
                }
            } else {
                console.log("User is not authenticated");
            }
        };

        registerUser();
    }, [isAuthenticated, user, getAccessTokenSilently]);

    return (
        <div className="flex gap-4">
            {!isAuthenticated ? (
                <Button onClick={() => loginWithRedirect({ appState: { screen_hint: "signup" } })}>
                    Get Started
                </Button>
            ) : (
                <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout
                </Button>
            )}
        </div>
    );
};

export default AuthComponent;
