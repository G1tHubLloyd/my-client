import React, { useState } from 'react'

export const ProfileView = ({ user, onUpdateProfile, onRemoveFavorite }) => {
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

    return (
        <div className="profile-view">
            <h2>My Profile</h2>

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
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <div className="profile-info">
                        <p><strong>Username:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Birthday:</strong> {user?.birthday || 'Not set'}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                )}
            </div>

            <div className="profile-section">
                <h3>Favorite Movies</h3>
                {user?.favoriteMovies && user.favoriteMovies.length > 0 ? (
                    <ul>
                        {user.favoriteMovies.map((movieId) => (
                            <li key={movieId}>
                                Movie ID: {movieId}
                                <button onClick={() => onRemoveFavorite(movieId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You haven't added any favorite movies yet.</p>
                )}
            </div>
        </div>
    )
}
