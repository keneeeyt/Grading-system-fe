import React, { useState } from 'react'
import Swal from 'sweetalert2';

const AddTeacher = ({setAddTeacher}) => {



  
      const [firstName,setFirstName] = useState('')
      const  [lastName, setLastName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [role, setRole] = useState('')


   


    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:4001/api/adduser', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: role
            })
        })
        .then(result => result.json())
        .then(data => {

            if(data){
                Swal.fire({
                    icon: 'success',
                    text: `Teacher has been successfully added!`
                })
                setFirstName('')
                setLastName('')
                setEmail('')
                setPassword('')
                setRole('')
            } else {

                Swal.fire({
                    icon: 'error',
                    text: 'email is already exists!'
                })
            }
            setAddTeacher(false)
        })
        .catch(err => {
            return err
        })

    }
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-[#0008] z-50  overflow-auto">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border mt-[50px]  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div
          onClick={() => setAddTeacher(false)}
          className="w-full px-4 py-2 text-xl text-[#F26F21] flex justify-end cursor-pointer"
        >
          	&times;
        </div>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="form_group">
              <div className="relative">
                <input
                  onChange={event => setFirstName(event.target.value)}
                  value={firstName}
                  type="text"
                  name="firstname"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#6a7ff4] focus:ring-[#6a7ff4] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter firstname"
                />
              </div>
              <div>
                <input
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                  type="text"
                  name="lastname"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#6a7ff4] focus:ring-[#6a7ff4] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter lastname"
                />
              </div>
              <div>
                <input
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                  type="text"
                  name="email"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#6a7ff4] focus:ring-[#6a7ff4] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-2 relative">
                <input
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#6a7ff4] focus:ring-[#6a7ff4] focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <select
                value={role}
                  name="gender"
                  onChange={event => setRole(event.target.value)}
                  className="mb-5 w-full rounded-lg focus:ring-0 focus:border-[#6a7ff4]"
                >
              
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                  
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#6a7ff4] rounded-md hover:bg-[#2a2c7e] focus:outline-none disabled:opacity-30"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddTeacher