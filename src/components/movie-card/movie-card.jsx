import React from 'react'
import { Link } from 'react-router-dom'

export const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movies/${movie._id}`}>
                <img src={movie.imagePath} alt={movie.title} className="movie-poster" />
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
            </Link>
        </div>
    )
}
