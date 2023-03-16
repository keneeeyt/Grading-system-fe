import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
const StudSection = () => {
    const [students, setStudents] = useState([])
    const [data, setData] = useState({})
    const {_id} = useParams();







    useEffect(()=> {
           fetch(`http://localhost:4001/api/studsection/${_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
           })
           .then(result => result.json()) 
           .then(data => {
               setStudents(data.students)
               setData(data)

           })
    }, [])
    console.log(students)
  return (
    <div>
        <table>
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
        </table>
       
    </div>
  )
}

export default StudSection