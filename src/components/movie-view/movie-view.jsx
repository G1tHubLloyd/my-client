import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

export const MovieView = ({ movies, user, onAddFavorite, onRemoveFavorite }) => {
    const { movieId } = useParams()
    const navigate = useNavigate()

    const movie = movies.find((m) => m._id === movieId)

    if (!movie) {
        return (
            <div className="movie-view">
                <p>Movie not found</p>
                <Link to="/">Back to Home</Link>
            </div>
        )
    }

    const isFavorite = user?.favoriteMovies?.includes(movie._id)

    const handleToggleFavorite = () => {
        if (isFavorite) {
            onRemoveFavorite(movie._id)
        } else {
            onAddFavorite(movie._id)
        }
    }

    return (
        <div className="movie-view">
            <Link to="/">Back to Home</Link>
            <div className="movie-details">
                <img src={movie.imagePath} alt={movie.title} className="movie-poster" />
                <div className="movie-info">
                    <h2>{movie.title}</h2>
                    <p><strong>Description:</strong> {movie.description}</p>
                    <p><strong>Genre:</strong> {movie.genre?.name}</p>
                    <p><strong>Director:</strong> {movie.director?.name}</p>
                    <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                    <button onClick={handleToggleFavorite}>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        </div>
    )
}
