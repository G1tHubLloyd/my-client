import React, { useState } from 'react'

export const ProfileView = ({ user, movies = [], onUpdateProfile, onRemoveFavorite, onDeregister }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        birthday: user?.birthday || '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSave = () => {
        onUpdateProfile(formData)
        setIsEditing(false)
    }

    const favoriteMovies = movies.filter((m) => user?.favoriteMovies?.includes(m._id))

    return (
        <div className="container py-4">
            <h2 className="mb-4">My Profile</h2>

            <div className="profile-section">
                <h3>User Information</h3>
                {isEditing ? (
                    <div className="edit-form">
                        <div>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Birthday:
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-success" onClick={handleSave}>Save</button>
                            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-info">
                        <p><strong>Username:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Birthday:</strong> {user?.birthday || 'Not set'}</p>
                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                            <button className="btn btn-outline-danger" onClick={onDeregister}>Deregister</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="profile-section">
                <h3>Favorite Movies</h3>
                {favoriteMovies.length > 0 ? (
                    <div className="profile-favorites">
                        {favoriteMovies.map((movie) => (
                            <div key={movie._id} className="profile-favorite-item">
                                <div className="movie-card">
                                    <img
                                        src={movie.imagePath}
                                        alt={movie.title}
                                        className="card-img-top"
                                    />
                                    <div className="movie-body">
                                        <h5 className="movie-title">{movie.title}</h5>
                                        <p className="movie-text">{movie.description}</p>
                                    </div>
                                    <div className="movie-footer d-flex justify-content-between align-items-center">
                                        <span className="badge bg-secondary">{movie.genre?.name}</span>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => onRemoveFavorite(movie._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You haven't added any favorite movies yet.</p>
                )}
            </div>
        </div>
    )
}
