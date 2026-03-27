import React from 'react'
import { Link } from 'react-router-dom'

export const MovieCard = ({ movie, user, onAddFavorite, onRemoveFavorite }) => {
    const isFavorite = user?.favoriteMovies?.some(fav =>
        (typeof fav === 'string' ? fav : fav._id) === movie._id
    )

    const handleToggle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!user) return
        isFavorite ? onRemoveFavorite(movie._id) : onAddFavorite(movie._id)
    }

    return (
        <div className="movie-card">
            <Link to={`/movies/${movie._id}`} className="text-decoration-none text-dark">
                <img src={movie.imagePath} alt={movie.title} className="card-img-top" />
                <div className="movie-body">
                    <h5 className="movie-title">{movie.title}</h5>
                    <p className="movie-text">{movie.description}</p>
                </div>
            </Link>
            <div className="movie-footer d-flex justify-content-between align-items-center">
                <span className="badge bg-secondary">{movie.genre?.name}</span>
                {user && (
                    <button
                        className={`btn btn-sm ${isFavorite ? 'btn-outline-danger' : 'btn-outline-primary'}`}
                        onClick={handleToggle}
                    >
                        {isFavorite ? '♥ Favorited' : '♡ Favorite'}
                    </button>
                )}
            </div>
        </div>
    )
}
