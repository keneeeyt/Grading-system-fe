import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../userContext'
import { Link } from 'react-router-dom'
const Teacher = () => {
  const {user} = useContext(UserContext)
  const [section, setSection] = useState([])

  useEffect(()=> {
    fetch('http://localhost:4001/api/sections', {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
     } 
    })
    .then(result=> result.json())
    .then(data => {
      console.log(data)
       return setSection(data);
    })
    .catch(err => {
      return err
    })
  },[])
  console.log(user)
  return (
    <div>
      <table>
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
      </table>
    </div>
  )
}

export default Teacher