import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const LoginView = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        if (!username || !password) {
            setError('Username and password are required')
            return
        }

        // Call parent onLogin function with user data
        onLogin({
            username,
            // In a real app, you'd receive a token from your API
            token: 'mock-token-' + Date.now(),
        })

        setError('')
        navigate('/')
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                            <p className="text-center mt-3 mb-0">
                                Don't have an account? <Link to="/signup">Sign up here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
