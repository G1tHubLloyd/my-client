import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { NavigationBar } from './components/navigation-bar/navigation-bar'
import { LoginView } from './components/login-view/login-view'
import { SignupView } from './components/signup-view/signup-view'
import { MainView } from './components/main-view/main-view'
import { MovieView } from './components/movie-view/movie-view'
import { ProfileView } from './components/profile-view/profile-view'
import { getMovies, updateUser, deleteUser, addFavorite, removeFavorite, login as apiLogin, signup as apiSignup } from './api'

export default function App() {
    const [user, setUser] = useState(null)
    const [movies, setMovies] = useState([])
    const [loadingMovies, setLoadingMovies] = useState(false)
    const [moviesError, setMoviesError] = useState('')

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
            if (!saved?.username || !saved?.token) return
            const favorites = loadFavorites(saved.username)
            const mergedUser = { ...saved, favoriteMovies: favorites || saved.favoriteMovies || [] }
            setUser(mergedUser)
            localStorage.setItem('user', JSON.stringify(mergedUser))
            fetchMovies(mergedUser.token)
        } catch {
            /* ignore */
        }
    }, [])

    const fetchMovies = async (token) => {
        setLoadingMovies(true)
        setMoviesError('')
        try {
            const data = await getMovies(token)
            console.log('Received movies:', data.slice(0, 2).map(m => ({ title: m.title, imagePath: m.imagePath })))
            setMovies(data)
        } catch (err) {
            setMoviesError('Failed to load movies')
        } finally {
            setLoadingMovies(false)
        }
    }

    const handleLogin = async (credentials) => {
        try {
            const { token, user: apiUser } = await apiLogin(credentials)
            const newUser = { ...apiUser, token }
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            fetchMovies(token)
            if (newUser.username) saveFavorites(newUser.username, newUser.favoriteMovies || [])
        } catch (err) {
            console.error(err)
            // Re-throw so the caller (LoginView) can show an inline error and avoid navigating
            throw err
        }
    }

    const handleSignup = async (userData) => {
        try {
            const { token, user: created } = await apiSignup(userData)
            const newUser = { ...created, token }
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            fetchMovies(token)
        } catch (err) {
            console.error(err)
            alert('Signup failed')
        }
    }

    const handleLogout = () => {
        setUser(null)
        setMovies([])
        localStorage.removeItem('user')
    }

    const handleUpdateProfile = async (updatedData) => {
        try {
            const saved = await updateUser(user.username, updatedData, user.token)
            const updatedUser = { ...user, ...saved }
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
            const updatedUser = await addFavorite(user.username, movieId, user.token)
            const merged = { ...user, ...updatedUser }
            setUser(merged)
            localStorage.setItem('user', JSON.stringify(merged))
            if (merged.username) saveFavorites(merged.username, merged.favoriteMovies || [])
        } catch (err) {
            console.error(err)
            alert('Failed to add favorite')
        }
    }

    const handleRemoveFavorite = async (movieId) => {
        if (!user) return
        try {
            const updatedUser = await removeFavorite(user.username, movieId, user.token)
            const merged = { ...user, ...updatedUser }
            setUser(merged)
            localStorage.setItem('user', JSON.stringify(merged))
            if (merged.username) saveFavorites(merged.username, merged.favoriteMovies || [])
        } catch (err) {
            console.error(err)
            alert('Failed to remove favorite')
        }
    }

    const handleDeregister = async () => {
        try {
            await deleteUser(user.username, user.token)
            if (user?.username) {
                try { localStorage.removeItem(favKey(user.username)) } catch { /* ignore */ }
            }
            setUser(null)
            setMovies([])
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
                                loading={loadingMovies}
                                error={moviesError}
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
