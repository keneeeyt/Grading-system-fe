import React,{useState, useEffect, useContext, Fragment} from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../UserContext'
import Aside from '../components/Aside'
import Right from '../components/Right'
const Student = () => {
  const [grade, setGrade] = useState([])
  const [details, setDetails] = useState({})
  const {user} = useContext(UserContext);
  const [showDetails, setShowDetails] = useState(false)



  const convertJson = window.localStorage.getItem('user')
  const [currentData, setCurrentData] = useState(JSON.parse(convertJson))


  const showGrade = () => {
      fetch(`http://localhost:4001/api/studentcard/${(user && user._id) || (currentData && currentData._id)}`, {
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
        currentData && currentData.role !== 'user' ? <Navigate to ='user' />
    : 
    <div className='grid lg:w-[94%] md:w-[100%] ml-0 mr-auto gap-[1.8rem] md:grid-cols-1 lg:grid-cols-3 grid-cols-1'>
    <div className='md:col-end-1 col-span-1'>
    <Aside />
    </div>
   
    {
      showDetails ?  
      <Fragment>
      <div className='lg:col-span-2 cols-span-1'>
      <main>
      <div className='flex justify-center items-center gap-10'>
        <h3 className='text-lg'>NAME: {details.firstName}</h3>
        <h3 className='text-lg'>SECTION: {details.studsection}</h3>
    </div>
    <div className="top-students">
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
            </tr>
        </thead>
        <tbody>
                {
                    grade.map((data, index) => (
                        <tr key={data._id}>
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
    </main>
    </div>
    </Fragment>
    :
    <div className='lg:col-span-2 cols-span-1'>
    <main>
    <div className='text-center mt-[10rem] flex justify-center items-center p-5'>
    <button onClick={event => showGrade(event)} className='bg-[#6f83e4] p-5 px-10 text-white rounded-lg'>Show Grades</button>
    </div>
    </main>
    </div>
    
    }
   
   <div className='md:col-span-2 col-span-1 lg:col-span-1'>
      <Right />
    </div>
</div>
  )
}

export default Student