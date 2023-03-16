import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Card = () => {

    const [grade, setGrade] = useState([])
    const [details, setDetails] = useState({})
    const {id} = useParams();
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
    <div className='container mx-auto flex flex-col justify-center items-center'>
        <div className='flex gap-10'>
            <h3>Name: {details.firstName}</h3>
            <h3>Section: {details.studsection}</h3>
        </div>
        <table className='shadow-lg bg-white'>
            <thead>
                <tr>
                    <th className='p-3'>Learning Areas</th>
                    <th className='p-3'>1st Quarter</th>
                    <th className='p-3'>2nd Quarter</th>
                    <th className='p-3'>3rd Quarter</th>
                    <th className='p-3'>4th Quarter</th>
                    <th className='p-3'>Final Rating</th>
                    <th className='p-3'>Remarks</th>
                </tr>
            </thead>
            <tbody>
                    {
                        grade.map(data => (
                            <tr>
                                <th>{data.subject}</th>
                                <th>{data.firstGrading}</th>
                                <th>{data.secondGrading}</th>
                                <th>{data.thirdGrading}</th>
                                <th>{data.fourthGrading}</th>
                                <th>{data.finalGrading}</th>
                                <th>{data.remarks}</th>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
    </div>
  )
}

export default Card