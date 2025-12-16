import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const SignupView = ({ onSignup }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault()

        if (!username || !password || !email) {
            setError('Username, password, and email are required')
            return
        }

        // Call parent onSignup function with user data
        onSignup({
            username,
            password,
            email,
            birthday,
            token: 'mock-token-' + Date.now(),
        })

        setError('')
        navigate('/')
    }

    return (
        <div className="signup-view">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                            placeholder="Create a password"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Birthday (optional):
                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    )
}
