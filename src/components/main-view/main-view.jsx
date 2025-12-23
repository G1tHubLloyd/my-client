import React from 'react'
import { MovieCard } from '../movie-card/movie-card'

export const MainView = ({ user, movies, loading, error, onAddFavorite, onRemoveFavorite }) => {
    if (loading) {
        return (
            <div className="container py-4">
                <div className="alert alert-info">Loading movies...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        )
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="container py-4">
                <h1 className="mb-4">Welcome, {user?.username}!</h1>
                <div className="alert alert-warning">No movies available.</div>
            </div>
        )
    }

    return (
        <div className="container py-4">
            <h1 className="mb-4">Welcome, {user?.username}!</h1>
            <div className="movies-list">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        user={user}
                        onAddFavorite={onAddFavorite}
                        onRemoveFavorite={onRemoveFavorite}
                    />
                ))}
            </div>
        </div>
    )
}
