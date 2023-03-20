import React, { useContext, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import { Link } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext)


    const convertJson = window.localStorage.getItem('user')
    const [currentData, setCurrentData] = useState(JSON.parse(convertJson))

    const login = (event) => {
        event.preventDefault();


        fetch('http://localhost:4001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(result => result.json())
            .then(data => {
                if (data === null) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Email is not yet registered!'
                    })
                } else if (data.role === 'admin') {
                    localStorage.setItem('token', data.auth)
                    getUserDetails(localStorage.getItem('token'))

                    Swal.fire({
                        icon: 'success',
                        text: 'Login successfully'
                    })
                    navigate('/admin')
                } else if (data.role === 'teacher') {
                    localStorage.setItem('token', data.auth)
                    getUserDetails(localStorage.getItem('token'))
                    Swal.fire({
                        icon: 'success',
                        text: 'Login successfully'
                    })
                    navigate('/teacher')
                } else if (data.role === 'user') {
                    localStorage.setItem('token', data.auth)
                    getUserDetails(localStorage.getItem('token'))
                    Swal.fire({
                        icon: 'success',
                        text: 'Login successfully'
                    })
                    navigate('/user')
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: 'Invalid User!'
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
                setUser(data)
                window.localStorage.setItem('user', JSON.stringify(data))

            })
    }

    console.log(user)
    return (
        currentData && currentData !== null ?
            <Navigate to='/*' />
            :
            <div className='relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className="w-full bg-white drop-shadow-lg pb-5 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={event => login(event)} className='flex flex-col space-y-5 p-[5rem]'>

                        <input className='p-3 border-5 bg-gray-200 rounded-lg' type='text' placeholder='Enter Email' value={email} onChange={event => setEmail(event.target.value)} required />
                        <input className='p-3 border-5 bg-gray-200 rounded-lg' type='password' placeholder='Enter password' value={password} onChange={event => setPassword(event.target.value)} required />
                        <button type='submit' className='bg-[#6a7ff4] text-xl py-2 text-white rounded-lg active:scale-125 transition duration-300 ease-in'>Login</button>


                    </form>

                    <Link to="/" class="relative inline-flex items-center ml-3 mb-3 justify-start px-3 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                        <span class="w-48 h-48 rounded rotate-[-40deg] bg-[#6a7ff4] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Back to Home</span>
                    </Link>
                </div>
            </div>
    )
}

export default Login