import React, { useState, useEffect } from 'react'
import { MovieCard } from '../movie-card/movie-card'

export const MainView = ({ user, movies, onAddFavorite, onRemoveFavorite }) => {
    const [localMovies, setLocalMovies] = useState([])
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
        // Only use local mock if no movies were provided as a prop
        if (!movies || movies.length === 0) {
            setLocalMovies(mockMovies)
        }
        setLoading(false)
    }, [movies])

    if (loading) {
        return <div className="main-view"><p>Loading movies...</p></div>
    }

    const list = movies && movies.length > 0 ? movies : localMovies

    return (
        <div className="container py-4">
            <h1 className="mb-4">Welcome, {user?.username}!</h1>
            <div className="movies-list">
                {list.map((movie) => (
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
