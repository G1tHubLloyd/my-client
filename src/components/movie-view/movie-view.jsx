import React from 'react'
import { useParams, Link } from 'react-router-dom'

export const MovieView = ({ movies, user, onAddFavorite, onRemoveFavorite }) => {
    const { movieId } = useParams()

    const movie = movies.find((m) => m._id === movieId)

    if (!movie) {
        return (
            <div className="container py-4">
                <div className="alert alert-warning">
                    <h4>Movie not found</h4>
                    <p>The movie you're looking for doesn't exist.</p>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </div>
        )
    }

    const isFavorite = user?.favoriteMovies?.some((fav) => (typeof fav === 'string' ? fav : fav._id) === movie._id)

    const handleToggleFavorite = () => {
        if (isFavorite) {
            onRemoveFavorite(movie._id)
        } else {
            onAddFavorite(movie._id)
        }
    }

    return (
        <div className="container py-4">
            <Link to="/" className="btn btn-outline-secondary mb-4">
                ← Back to Movies
            </Link>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <img
                        src={movie.imagePath}
                        alt={movie.title}
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-8">
                    <h1 className="mb-3">{movie.title}</h1>

                    <div className="mb-3">
                        <span className="badge bg-primary me-2">{movie.genre?.name}</span>
                        {movie.releaseDate && (
                            <span className="badge bg-secondary">{new Date(movie.releaseDate).getFullYear()}</span>
                        )}
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Description</h5>
                            <p className="card-text">{movie.description}</p>
                        </div>
                    </div>

                    {movie.director?.name && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Director</h5>
                                <p className="card-text mb-0">{movie.director.name}</p>
                                {movie.director.bio && (
                                    <small className="text-muted">{movie.director.bio}</small>
                                )}
                            </div>
                        </div>
                    )}

                    {movie.genre?.description && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">About the Genre</h5>
                                <p className="card-text mb-0">{movie.genre.description}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-4">
                        <button
                            className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'} btn-lg`}
                            onClick={handleToggleFavorite}
                        >
                            {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
