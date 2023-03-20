import React, { useContext, useEffect } from 'react'
import UserContext from '../UserContext'
import { Navigate } from 'react-router-dom'
const Logout = () => {
    const {setUser, unSetUser} = useContext(UserContext)
    
    useEffect(()=> {
        unSetUser();
        setUser(null)
    })
  return (
        <Navigate to ='/' />
  )
}

export default Logout