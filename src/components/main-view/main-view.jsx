import React, { useState, useEffect } from 'react'
import { MovieCard } from '../movie-card/movie-card'

export const MainView = ({ user, onAddFavorite, onRemoveFavorite }) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Mock movies data - replace with API call
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
        setMovies(mockMovies)
        setLoading(false)
    }, [])

    if (loading) {
        return <div className="main-view"><p>Loading movies...</p></div>
    }

    return (
        <div className="container py-4">
            <h1 className="mb-4">Welcome, {user?.username}!</h1>
            <div className="row g-3">
                {movies.map((movie) => (
                    <div key={movie._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <MovieCard
                            movie={movie}
                            user={user}
                            onAddFavorite={onAddFavorite}
                            onRemoveFavorite={onRemoveFavorite}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
