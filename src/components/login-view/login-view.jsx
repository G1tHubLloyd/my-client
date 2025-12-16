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
        <div className="login-view">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
        </div>
    )
}
