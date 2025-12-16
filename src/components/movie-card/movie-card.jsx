import React from 'react'
import { Link } from 'react-router-dom'

export const MovieCard = ({ movie, user, onAddFavorite, onRemoveFavorite }) => {
    const isFavorite = user?.favoriteMovies?.includes(movie._id)
    const handleToggle = (e) => {
        e.preventDefault()
        if (!user) return
        isFavorite ? onRemoveFavorite(movie._id) : onAddFavorite(movie._id)
    }

    return (
        <div className="card h-100 shadow-sm">
            <Link to={`/movies/${movie._id}`} className="text-decoration-none text-dark">
                <img src={movie.imagePath} alt={movie.title} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.description}</p>
                </div>
            </Link>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <span className="badge bg-secondary">{movie.genre?.name}</span>
                {user && (
                    <button className={`btn btn-sm ${isFavorite ? 'btn-outline-danger' : 'btn-outline-primary'}`} onClick={handleToggle}>
                        {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                    </button>
                )}
            </div>
        </div>
    )
}
