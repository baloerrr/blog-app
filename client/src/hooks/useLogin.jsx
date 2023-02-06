import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const login = async (username, password) => {
    setLoading(true)

    const data = {
      username: username,
      password: password,
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )

      if (res) {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data))
          dispatch({ type: 'LOGIN', payload: res.data })
          setLoading(false)
          navigate('/')
        }
      }
    } catch (err) {
      setLoading(false)
      setError(err.response.data.msg)
    }
  }
  return { login, loading, error }
}

export default useLogin
