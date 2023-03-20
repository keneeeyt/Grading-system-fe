import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import UserContext from '../UserContext'
import { Link } from 'react-router-dom'
import Aside from '../components/Aside'
import Main from '../components/Main'
import Right from '../components/Right'
const Teacher = () => {
  // const {user} = useContext(UserContext)
  // const [section, setSection] = useState([])
  const convertJson = window.localStorage.getItem('user')
  const [currentData, setCurrentData] = useState(JSON.parse(convertJson))
  // useEffect(()=> {
  //   fetch('http://localhost:4001/api/sections', {
  //    headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //    } 
  //   })
  //   .then(result=> result.json())
  //   .then(data => {
  //     console.log(data)
  //      return setSection(data);
  //   })
  //   .catch(err => {
  //     return err
  //   })
  // },[])
  return (
   currentData && currentData.role !== 'teacher' ? <Navigate to ='/*' />
   :
    <div className='grid lg:w-[94%] md:w-[100%] ml-0 mr-auto gap-[1.8rem] md:grid-cols-3 lg:grid-cols-3 grid-cols-1'>
    <div className='md:col-end-1 col-span-1'>
    <Aside />
    </div>
      
      <div className='lg:col-span-2 cols-span-1'>
      <Main />
      </div>
      <div className='md:col-span-2 col-span-1 lg:col-span-1'>
      <Right />
      </div>    
     
      {/* <table>
        <thead>
          <tr>
            <th>Section</th>
            <th>Grade</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {
            section.map((data, index) => (
              <tr key={index}>
               <Link to={`/studsection/${data._id}`}><td>{data.sectionName}</td></Link>
                <td>{data.grade}</td>
              </tr>
            ))
          }
        </tbody>
      </table> */}
    </div>
  )
}

export default Teacher