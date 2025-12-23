import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const ProfileView = ({ user, movies = [], onUpdateProfile, onRemoveFavorite, onDeregister }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        birthday: user?.birthday || '',
        password: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSave = () => {
        const updates = { email: formData.email, birthday: formData.birthday }
        if (formData.password) {
            updates.password = formData.password
        }
        onUpdateProfile(updates)
        setIsEditing(false)
        setFormData({ ...formData, password: '' })
    }

    const handleDeregister = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            onDeregister()
        }
    }

    const favoriteMovies = movies.filter((m) =>
        user?.favoriteMovies?.some(fav =>
            (typeof fav === 'string' ? fav : fav._id) === m._id
        )
    )

    return (
        <div className="container py-4">
            <h2 className="mb-4">My Profile</h2>

            {/* User Information Section */}
            <div className="card shadow mb-4">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">User Information</h3>
                </div>
                <div className="card-body">
                    {isEditing ? (
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled
                                />
                                <small className="text-muted">Username cannot be changed</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Leave blank to keep current password"
                                />
                                <small className="text-muted">Only fill this if you want to change your password</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthday" className="form-label">Birthday</label>
                                <input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    className="form-control"
                                    value={formData.birthday}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success">Save Changes</button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                            username: user?.username || '',
                                            email: user?.email || '',
                                            birthday: user?.birthday || '',
                                            password: ''
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="row mb-3">
                                <div className="col-sm-3"><strong>Username:</strong></div>
                                <div className="col-sm-9">{user?.username}</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3"><strong>Email:</strong></div>
                                <div className="col-sm-9">{user?.email || 'Not set'}</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-3"><strong>Birthday:</strong></div>
                                <div className="col-sm-9">{user?.birthday ? new Date(user.birthday).toLocaleDateString() : 'Not set'}</div>
                            </div>
                            <div className="d-flex gap-2 mt-4">
                                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                                <button className="btn btn-danger" onClick={handleDeregister}>
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Favorite Movies Section */}
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Favorite Movies ({favoriteMovies.length})</h3>
                </div>
                <div className="card-body">
                    {favoriteMovies.length > 0 ? (
                        <div className="profile-favorites">
                            {favoriteMovies.map((movie) => (
                                <div key={movie._id} className="profile-favorite-item">
                                    <div className="movie-card">
                                        <Link to={`/movies/${movie._id}`}>
                                            <img
                                                src={movie.imagePath}
                                                alt={movie.title}
                                                className="card-img-top"
                                            />
                                        </Link>
                                        <div className="movie-body">
                                            <h5 className="movie-title">
                                                <Link to={`/movies/${movie._id}`} className="text-decoration-none text-dark">
                                                    {movie.title}
                                                </Link>
                                            </h5>
                                            <p className="movie-text">{movie.description}</p>
                                        </div>
                                        <div className="movie-footer d-flex justify-content-between align-items-center">
                                            <span className="badge bg-secondary">{movie.genre?.name}</span>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onRemoveFavorite(movie._id)}
                                                title="Remove from favorites"
                                            >
                                                ♥ Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-muted mb-3">You haven't added any favorite movies yet.</p>
                            <Link to="/" className="btn btn-primary">Browse Movies</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
