import React from 'react'
import { Button } from '../../ui/button'
import { useAuth0 } from '@auth0/auth0-react'

const AuthComponent = () => {
    const { loginWithPopup, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <div className="flex gap-4">
            {!isAuthenticated ? (
                <>
                    <Button onClick={() => loginWithRedirect({ appState: { screen_hint: "signup" } })}>
                        Get Started
                    </Button>
                </>
            ) : (
                <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout
                </Button>
            )}
        </div>
    );
}

export default AuthComponent;