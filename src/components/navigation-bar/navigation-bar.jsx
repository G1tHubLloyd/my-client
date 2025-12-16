import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const NavigationBar = ({ user, onLogout }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate('/login')
    }

    return (
        <nav className="navigation-bar">
            <div className="nav-brand">
                <Link to="/">MyFlix</Link>
            </div>
            <div className="nav-links">
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                ) : (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/profile">Profile</Link>
                        <span className="user-greeting">Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}
