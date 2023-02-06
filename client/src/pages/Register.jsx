import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const url = 'http://localhost:5000/api/'
  const [inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
  })
  const [err, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(`${url}auth/register`, inputs)
        .then((data) => console.log(data))
      navigate('/login')
    } catch (error) {
      setError(error.response.data)
    }
  }
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="Password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have any account?{' '}
          <Link className="link" to="/login">
            Register
          </Link>{' '}
        </span>
      </form>
    </div>
  )
}

export default Register
