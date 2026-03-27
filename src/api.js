const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://example.com/api'

const jsonHeaders = (token) => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

export async function getUsers(token) {
    const res = await fetch(`${BASE_URL}/users`, { headers: jsonHeaders(token) })
    if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`)
    return res.json()
}

export async function getMovies(token) {
    const res = await fetch(`${BASE_URL}/movies`, { headers: jsonHeaders(token) })
    if (!res.ok) throw new Error(`Failed to fetch movies: ${res.status}`)
    return res.json()
}

export async function updateUser(username, data, token) {
    const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`, {
        method: 'PUT',
        headers: jsonHeaders(token),
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`Failed to update user: ${res.status}`)
    return res.json()
}

export async function deleteUser(username, token) {
    const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`, {
        method: 'DELETE',
        headers: jsonHeaders(token),
    })
    if (!res.ok) throw new Error(`Failed to delete user: ${res.status}`)
    return res.text()
}

export async function addFavorite(username, movieId, token) {
    const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}/movies/${encodeURIComponent(movieId)}`, {
        method: 'POST',
        headers: jsonHeaders(token),
    })
    if (!res.ok) throw new Error(`Failed to add favorite: ${res.status}`)
    return res.json()
}

export async function removeFavorite(username, movieId, token) {
    const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}/movies/${encodeURIComponent(movieId)}`, {
        method: 'DELETE',
        headers: jsonHeaders(token),
    })
    if (!res.ok) throw new Error(`Failed to remove favorite: ${res.status}`)
    return res.json()
}

export async function login({ username, password }) {
    const res = await fetch(`${BASE_URL}/auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error(`Login failed: ${res.status}`)
    return res.json() // expect { token, user }
}

export async function signup({ username, password, email, birthday }) {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, birthday }),
    })
    if (!res.ok) throw new Error(`Signup failed: ${res.status}`)
    return res.json()
}
