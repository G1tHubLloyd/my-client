import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const NavigationBar = ({ user, onLogout }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">MyFlix</Link>
            <div className="ms-auto d-flex align-items-center gap-3">
                {!user ? (
                    <>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="btn btn-outline-light btn-sm" to="/signup">Sign Up</Link>
                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/profile">Profile</Link>
                        <span className="text-light">Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="btn btn-danger btn-sm">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}
