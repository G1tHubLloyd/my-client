import React from 'react'
import { Link } from 'react-router-dom'
import './navigation-bar.scss'

export const NavigationBar = ({ user, onLogout }) => {
    return (
        <nav className="navbar diagonal">
            <Link to="/" className="nav-logo">myFlix</Link>
            <div className="nav-links">
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={onLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}
