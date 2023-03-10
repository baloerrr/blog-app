import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const useLogout = () => {
  const { dispatch } = useContext(AuthContext)

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
  }
  return { logout }
}

export default useLogout
