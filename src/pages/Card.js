import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Aside from '../components/Aside'
import { Link } from 'react-router-dom'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import Right from '../components/Right'
const Card = () => {

    const [grade, setGrade] = useState([])
    const [details, setDetails] = useState({})
    const {id} = useParams();
    const [average, setAverage] = useState(false)

    const convertJson = window.localStorage.getItem('user')
    const [currentData, setCurrentData] = useState(JSON.parse(convertJson))


    useEffect(()=> {
        fetch(`http://localhost:4001/api/studentcard/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(result => result.json())
        .then(data => {
            setGrade(data.card)
            setDetails(data)
        })
    }, [])
  return (
    currentData && currentData.role !== 'teacher'? <Navigate to = '/*' />
    :
    <div className='grid lg:w-[94%] md:w-[100%] ml-0 mr-auto gap-[1.8rem] md:grid-cols-1 lg:grid-cols-2 grid-cols-1'>
    <div className='md:col-end-1 col-span-1'>
    <Aside />
    </div>
    <div class="md:hidden">
                <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:rotate-180">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>


                    <span><Link to={`/${currentData && currentData.role}`}>Go back</Link></span>
                </button>
            </div>
    <div className='lg:col-span-2 col-span-1'>
    <main>
    <div className="top-students">
    <div className='flex items-center gap-2 mb-5 ml-5 text-[#6f81eb] cursor-pointer w-[9rem]'>
            <AiOutlinePlusCircle size={26} className='text-[#6f81eb]'/>
            Add Subject
        </div>
    <table>
        <thead>
        <tr>
                    <th className='p-3'>Learning Areas</th>
                    <th className='p-3'>1st Quarter</th>
                    <th className='p-3'>2nd Quarter</th>
                    <th className='p-3'>3rd Quarter</th>
                    <th className='p-3'>4th Quarter</th>
                    <th className='p-3'>Final Rating</th>
                    <th className='p-3'>Remarks</th>
                    <th className='p-3'>Operation</th>
                </tr>
        </thead>
        <tbody>
         
             {
                grade.map(data => (
                <tr key={data._id}>
                                <td>{data.subject}</td>
                                <td>{data.firstGrading}</td>
                                <td>{data.secondGrading}</td>
                                <td>{data.thirdGrading}</td>
                                <td>{data.fourthGrading}</td>
                                <td>{data.finalGrading}</td>
                                <td>{data.remarks}</td>
                  <td>
                        
                    <div className='flex items-start'>
                 <Link to={`/card/${data._id}`}><div class="w-auto h-auto">
        <div class="flex-1 h-full">
          <div class="flex items-center justify-center flex-1 h-full p-2 bg-[#6a82e8] hover:bg-[#272b80] text-white shadow rounded-lg">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
          </div>
        </div>
      </div></Link>


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
    </main>
    </div>
    </div>
  )
}

export default Card