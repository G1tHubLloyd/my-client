import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { NavigationBar } from './components/navigation-bar/navigation-bar'
import { LoginView } from './components/login-view/login-view'
import { SignupView } from './components/signup-view/signup-view'
import { MainView } from './components/main-view/main-view'
import { MovieView } from './components/movie-view/movie-view'
import { ProfileView } from './components/profile-view/profile-view'

// Mock movies data
const mockMovies = [
    {
        _id: '1',
        title: 'The Matrix',
        description: 'A hacker discovers the truth about his reality.',
        imagePath: 'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg',
        genre: { name: 'Sci-Fi' },
        director: { name: 'Lana Wachowski' },
        releaseDate: '1999-03-31',
    },
    {
        _id: '2',
        title: 'Inception',
        description: 'A skilled thief leads a team through dream worlds.',
        imagePath: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        genre: { name: 'Sci-Fi' },
        director: { name: 'Christopher Nolan' },
        releaseDate: '2010-07-16',
    },
    {
        _id: '3',
        title: 'The Dark Knight',
        description: 'Batman faces his greatest challenge against the Joker.',
        imagePath: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        genre: { name: 'Action' },
        director: { name: 'Christopher Nolan' },
        releaseDate: '2008-07-18',
    },
]

export default function App() {
    const [user, setUser] = useState(null)
    const [movies] = useState(mockMovies)

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const handleLogin = (userData) => {
        const newUser = {
            ...userData,
            favoriteMovies: [],
        }
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
    }

    const handleSignup = (userData) => {
        const newUser = {
            ...userData,
            favoriteMovies: [],
        }
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
    }

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const handleUpdateProfile = (updatedData) => {
        const updatedUser = { ...user, ...updatedData }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    const handleAddFavorite = (movieId) => {
        if (user && !user.favoriteMovies.includes(movieId)) {
            const updatedUser = {
                ...user,
                favoriteMovies: [...user.favoriteMovies, movieId],
            }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
        }
    }

    const handleRemoveFavorite = (movieId) => {
        if (user) {
            const updatedUser = {
                ...user,
                favoriteMovies: user.favoriteMovies.filter((id) => id !== movieId),
            }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
        }
    }

    return (
        <Router>
            <NavigationBar user={user} onLogout={handleLogout} />
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <LoginView onLogin={handleLogin} />}
                />
                <Route
                    path="/signup"
                    element={user ? <Navigate to="/" /> : <SignupView onSignup={handleSignup} />}
                />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={user ? <MainView user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/movies/:movieId"
                    element={
                        user ? (
                            <MovieView
                                movies={movies}
                                user={user}
                                onAddFavorite={handleAddFavorite}
                                onRemoveFavorite={handleRemoveFavorite}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        user ? (
                            <ProfileView
                                user={user}
                                onUpdateProfile={handleUpdateProfile}
                                onRemoveFavorite={handleRemoveFavorite}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
            </Routes>
        </Router>
    )
}
