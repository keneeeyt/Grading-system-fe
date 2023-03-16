import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../userContext'

export const NavBar = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
    {
        user ?  <Link to  = '/logout'>Logout</Link>
        :
        <Link>Login?</Link>
    }
       
    </div>
  )
}
