import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
const Delete = () => {
 
  const navigate = useNavigate();
    const {id} = useParams();
    useEffect(()=> {
        fetch(`http://localhost:4001/api/delete/${id}`,{
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(data => {
    Swal.fire({
      icon:'success',
      text: 'Teacher successfully deleted!'
    })
    
  })
  .catch(err=> {
    return false
  })
    })
  return (
        <Navigate to='/admin' />
  )
}

export default Delete