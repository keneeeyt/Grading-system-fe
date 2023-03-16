import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../userContext'
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext)

    const login = (event) => {
        event.preventDefault();


        fetch('http://localhost:4001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data === null){
                Swal.fire({
                    icon: 'error',
                    text: 'Email is not yet registered!'
                })
            }else if(data.role === 'admin'){
                localStorage.setItem('token', data.auth)
                getUserDetails(localStorage.getItem('token'))
                Swal.fire({
                    icon:'success',
                    text: 'Login successfully'
                })
                navigate('/admin')
            }else if(data.role === 'teacher'){
                localStorage.setItem('token', data.auth)
                getUserDetails(localStorage.getItem('token'))
                Swal.fire({
                    icon:'success',
                    text: 'Login successfully'
                })
                navigate('/teacher')
            }else if(data.role === 'user'){
                localStorage.setItem('token', data.auth)
                getUserDetails(localStorage.getItem('token'))
                Swal.fire({
                    icon:'success',
                    text: 'Login successfully'
                })
                navigate('/student')
            }else{
                Swal.fire({
                    icon: 'error',
                    text:'Invalid User!'
                })
            }
        })

    }

    const getUserDetails = (token) => {
        fetch('http://localhost:4001/api/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result => result.json())
        .then(data => {
            console.log(data)
            setUser(data)
        })
    }
  return (
    <div>
        <form onSubmit={event => login(event)}>
            <input type='text' placeholder='Enter Email' value={email} onChange={event => setEmail(event.target.value)} required/>
            <input type='password' placeholder='Enter password' value={password} onChange={event => setPassword(event.target.value)} required/>

            <button type='submit'>Login</button>
        </form>
    
    </div>
  )
}

export default Login