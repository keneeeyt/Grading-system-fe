import React,{useState, useEffect, useContext, Fragment} from 'react'
import UserContext from '../userContext'

const Student = () => {
  const [grade, setGrade] = useState([])
  const [details, setDetails] = useState({})
  const {user} = useContext(UserContext);
  const [showDetails, setShowDetails] = useState(false)

  const showGrade = () => {
      fetch(`http://localhost:4001/api/studentcard/${user._id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(result => result.json())
      .then(data => {
          setGrade(data.card)
          setDetails(data)
      })
      setShowDetails(true)
  }
  return (
     
    <div className='container mx-auto flex flex-col justify-center items-center'>
    {
      showDetails ?  
      <Fragment>
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
                    grade.map((data, index) => (
                        <tr key={index}>
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
    </Fragment>
    :
    <button onClick={event => showGrade(event)}>Show Grades</button>
    }
   
</div>
  )
}

export default Student