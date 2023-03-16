import React, { useEffect, useState } from 'react'

const Admin = () => {
  const [teacher, setTeacher] = useState([])

 
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
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>role</th>
            <th>email</th>
            <th>Operation</th>
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
                </tr>
              ))
             }
         
        </tbody>
      </table>
    </div>
  )
}

export default Admin