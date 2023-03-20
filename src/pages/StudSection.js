import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Aside from '../components/Aside'
import Right from '../components/Right'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import AddStudent from '../components/AddStudent'
const StudSection = () => {
    const [students, setStudents] = useState([])
    const [data, setData] = useState({})
    const {id} = useParams();
    const [addStudent, setAddStudent] = useState(false)
    const [studentSection, setStudentSection] = useState('')


    const convertJson = window.localStorage.getItem('user')
    const [currentData, setCurrentData] = useState(JSON.parse(convertJson))

    useEffect(()=> {
           fetch(`http://localhost:4001/api/studsection/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
           })
           .then(result => result.json()) 
           .then(data => {
               setStudents(data.students)
               setData(data)
                setStudentSection(data.sectionName)
               console.log(data)

           })
    }, [])
    console.log(students)
  return (
    currentData && currentData.role !== 'teacher' ? <Navigate to='/*' />
    :
    <div className='grid lg:w-[94%] md:w-[100%] ml-0 mr-auto gap-[1.8rem] md:grid-cols-1 lg:grid-cols-3 grid-cols-1'>
    <div className='md:col-end-1 col-span-1'>
    <Aside />
    </div>

<div className='lg:col-span-2 col-span-1'>
<main>


       
            <h1>Dashboard</h1>
            <div class="date">
            </div>
 
            <div class="insights">
                 <div class="total-students">
                    <span class="material-symbols-sharp">analytics</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Total Students</h3>
                            <h1>{students.length}</h1>
                        </div>
                        <div class="progress">
                            <svg>
                            <circle cx='38' cy='38' r='36'></circle>
                            </svg>
                            <div class="number">
                                <p>100%</p>
                            </div>
                        </div>

                    </div>
                    <small class="text-muted">2022-2023</small>
                 </div>
                 {/* <!-- END OF TOTAL STUDENTS --> */}
                 <div class="total-passed">
                    <span class="material-symbols-sharp">download_done</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Total Passed</h3>
                            <h1>40</h1>
                        </div>
                            <div class="progress">
                             <svg>
                                <circle cx='38' cy='38' r='36'></circle>
                             </svg>
                             <div class="number">
                                  <p>60%</p>
                             </div>
                            </div>
                     </div>
                     <small class="text-muted">2022-2023</small>
                </div>
                {/* <!-- END OF TOTAL PASSED --> */}
                <div class="total-failed">
                    <span class="material-symbols-sharp">trending_down</span>
                    <div class="middle">
                        <div class="left">
                            <h3>Total failed</h3>
                            <h1>15</h1>
                        </div>
                            <div class="progress">
                             <svg>
                                <circle cx='38' cy='38' r='36'></circle>
                             </svg>
                             <div class="number">
                                  <p>40%</p>
                             </div>
                            </div>
                        
                     </div>
                     <small class="text-muted">2022-2023</small>
                </div>
                {/* <!-- END OF TOTAL FAIL --> */}
             </div>
             {/* <!-- END OF INSIGHTS --> */}
             
        

      <div className="top-students" onClick={()=> setAddStudent(true)}>
        <div className='flex items-center gap-2 mb-5 ml-5 text-[#6f81eb] cursor-pointer w-[9rem]'>
            <AiOutlinePlusCircle size={26} className='text-[#6f81eb]'/>
            Add Student
        </div>
      <table>
        <thead>
          <tr>
            <th className='pt-5'>Firstname</th>
            <th className='pt-5'>Lastname</th>
            <th className='pt-5'>Section</th>
            <th className='pt-5'>Email</th>
            <th className='pt-5'>Operation</th>
          </tr>
        </thead>
        <tbody>
         
             {
              students.map((data, index) => (
                <tr key={data._id}>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.studsection}</td>
                  <td>{data.email}</td>
                  <td>

                    <div className='flex items-start'>
                 <Link to={`/card/${data._id}`}><button class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
	</svg>

	Card
  </button></Link>


                  <Link to={`/delete/${data._id}`}> <button class="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>

	DELETE
  </button>
</Link>
</div>
                  </td>
                </tr>
              ))
             }
         
        </tbody>
      </table>
      </div>
      {addStudent && <AddStudent setAddStudent={setAddStudent} studentSection={studentSection} />}
      </main>
            </div>

      <div className='md:col-span-2 col-span-1 lg:col-span-1'>
      <Right />
    </div>
        {/* <table>
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>email</th>
                    <th>section</th>
                    <th>Operation</th>
                </tr>
            </thead>
            <tbody>
                    {
                        students.map((data, index) => (
                            <tr key={index}>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.email}</td>
                                <td>{data.studsection}</td>
                                <td><Link to={`/card/${data._id}`}><button>Card</button></Link><button>delete</button></td>
                            </tr>
                        ))
                    }
            </tbody>
        </table> */}
    
    </div>
  )
}

export default StudSection