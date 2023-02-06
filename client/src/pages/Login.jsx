import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import useLogin from '../hooks/useLogin'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
    <div className="auth">
      <h1>Login User</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="Password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleSubmit} disabled={loading}>
          Login
        </button>
        {error && <p>{error}</p>}
        <span>
          Don't you have any account?{' '}
          <Link className="link" to="/register">
            Register
          </Link>{' '}
        </span>
      </form>
    </div>
  )
}

export default Login
