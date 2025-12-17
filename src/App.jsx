import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { NavigationBar } from './components/navigation-bar/navigation-bar'
import { LoginView } from './components/login-view/login-view'
import { SignupView } from './components/signup-view/signup-view'
import { MainView } from './components/main-view/main-view'
import { MovieView } from './components/movie-view/movie-view'
import { ProfileView } from './components/profile-view/profile-view'
import { getUsers, getMovies, updateUser, deleteUser, addFavorite, removeFavorite, login as apiLogin, signup as apiSignup } from './api'

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
    const [movies, setMovies] = useState(mockMovies)

    // Local favorites persistence helpers (declared before useEffect)
    const favKey = (username) => `favorites:${username}`
    const loadFavorites = (username) => {
        try {
            const raw = localStorage.getItem(favKey(username))
            return raw ? JSON.parse(raw) : []
        } catch {
            return []
        }
    }
    const saveFavorites = (username, ids) => {
        try {
            localStorage.setItem(favKey(username), JSON.stringify(ids))
        } catch { }
    }

    // Load user and migrate favorites on mount
    useEffect(() => {
        const raw = localStorage.getItem('user')
        if (!raw) return
        try {
            const saved = JSON.parse(raw)
            if (!saved?.username) {
                setUser(saved)
                return
            }
            let favorites = loadFavorites(saved.username)
            if ((!favorites || favorites.length === 0) && Array.isArray(saved.favoriteMovies) && saved.favoriteMovies.length > 0) {
                favorites = saved.favoriteMovies
                saveFavorites(saved.username, favorites)
            }
            const mergedUser = { ...saved, favoriteMovies: favorites || [] }
            setUser(mergedUser)
            localStorage.setItem('user', JSON.stringify(mergedUser))
        } catch {
            // if parsing fails, ignore and start fresh
        }
    }, [])

    const handleLogin = async (userData) => {
        try {
            // If you have an API, uncomment next line and remove mock
            // const { token, user: apiUser } = await apiLogin(userData)
            // const newUser = { ...apiUser, token }
            const existingFavs = userData?.username ? loadFavorites(userData.username) : []
            const newUser = { ...userData, favoriteMovies: existingFavs, token: 'mock-token-' + Date.now() }
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            // Optionally load movies from API
            // const moviesData = await getMovies(newUser.token)
            // setMovies(moviesData)
        } catch (err) {
            console.error(err)
            alert('Login failed')
        }
    }

    const handleSignup = async (userData) => {
        try {
            // If you have an API, uncomment next line and remove mock
            // const created = await apiSignup(userData)
            const newUser = { ...userData, favoriteMovies: [], token: 'mock-token-' + Date.now() }
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
        } catch (err) {
            console.error(err)
            alert('Signup failed')
        }
    }

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const handleUpdateProfile = async (updatedData) => {
        try {
            // const saved = await updateUser(user.username, updatedData, user.token)
            const updatedUser = { ...user, ...updatedData }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
        } catch (err) {
            console.error(err)
            alert('Update failed')
        }
    }

    const handleAddFavorite = async (movieId) => {
        if (!user) return
        try {
            // await addFavorite(user.username, movieId, user.token)
            if (!user.favoriteMovies.includes(movieId)) {
                const updatedFavs = [...user.favoriteMovies, movieId]
                const updatedUser = { ...user, favoriteMovies: updatedFavs }
                setUser(updatedUser)
                localStorage.setItem('user', JSON.stringify(updatedUser))
                if (user.username) saveFavorites(user.username, updatedFavs)
            }
        } catch (err) {
            console.error(err)
            alert('Failed to add favorite')
        }
    }

    const handleRemoveFavorite = async (movieId) => {
        if (!user) return
        try {
            // await removeFavorite(user.username, movieId, user.token)
            const updatedFavs = user.favoriteMovies.filter((id) => id !== movieId)
            const updatedUser = { ...user, favoriteMovies: updatedFavs }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
            if (user.username) saveFavorites(user.username, updatedFavs)
        } catch (err) {
            console.error(err)
            alert('Failed to remove favorite')
        }
    }

    const handleDeregister = async () => {
        try {
            // await deleteUser(user.username, user.token)
            // Clear local favorites for this user on deregister
            if (user?.username) {
                try { localStorage.removeItem(favKey(user.username)) } catch { }
            }
            setUser(null)
            localStorage.removeItem('user')
        } catch (err) {
            console.error(err)
            alert('Failed to deregister')
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
                    element={
                        user ? (
                            <MainView
                                user={user}
                                movies={movies}
                                onAddFavorite={handleAddFavorite}
                                onRemoveFavorite={handleRemoveFavorite}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
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
                                movies={movies}
                                onUpdateProfile={handleUpdateProfile}
                                onRemoveFavorite={handleRemoveFavorite}
                                onDeregister={handleDeregister}
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
