import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import NotFound from '../components/NotFound'
import UserContext from '../UserContext'
import Aside from '../components/Aside'
import Right from '../components/Right'
import Swal from 'sweetalert2'
const Admin = () => {
  const [teacher, setTeacher] = useState([])
  const {user} = useContext(UserContext)
  const convertJson = window.localStorage.getItem('user')
  const [currentData, setCurrentData] = useState(JSON.parse(convertJson))
 useEffect(() => {
  fetch('http://localhost:4001/api/teachers',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(result => result.json())
  .then(data => {
   setTeacher(data)
  })
  .catch(err => {
    return err
  })
 }, [])

  return (
   currentData && currentData.role !== 'admin' ? <Navigate to ='/*'/>
    : 
    <div className='grid lg:w-[94%] md:w-[100%] ml-0 mr-auto gap-[1.8rem] md:grid-cols-1 lg:grid-cols-3 grid-cols-1'>
    <div className='md:col-end-1 col-span-1'>
    <Aside />
    </div>
    <div className='lg:col-span-2 col-span-1'>
    <main>
      <div className="top-students">
      <table>
        <thead>
          <tr>
            <th className='pt-5'>ID</th>
            <th className='pt-5'>Firstname</th>
            <th className='pt-5'>Lastname</th>
            <th className='pt-5'>role</th>
            <th className='pt-5'>email</th>
            <th className='pt-5'>Operation</th>
          </tr>
        </thead>
        <tbody>
         
             {
              teacher.map((data, index) => (
                <tr key={data._id}>
                  <td>{index}</td>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.role}</td>
                  <td>{data.email}</td>
                  <td>

                  <Link to={`/delete/${data._id}`}> <button class="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>

	DELETE
  </button>
</Link>

                  </td>
                </tr>
              ))
             }
         
        </tbody>
      </table>
      </div>
      </main>
    </div>
    <div className='md:col-span-2 col-span-1 lg:col-span-1'>
      <Right />
    </div>
    </div>
  )
}

export default Admin