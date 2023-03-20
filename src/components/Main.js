import React, { useContext, useEffect, useState, Fragment } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import UserContext from '../UserContext'
import { Link } from 'react-router-dom'
import AddSection from './AddSection'
import AddTeacher from './AddTeacher'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const Main = () => {

  const { user } = useContext(UserContext)
  const [section, setSection] = useState([])
  const [total, setTotal] = useState([])
  const convertJson = window.localStorage.getItem('user')
  const [currentData, setCurrentData] = useState(JSON.parse(convertJson))
  const [addTeacher, setAddTeacher] = useState(false)
    const [addSection, setAddSection] = useState(false)
    const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:4001/api/sections', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(result => result.json())
      .then(data => {
        console.log(data)
        setSection(data);
        setTotal(data)
       
      })
      .catch(err => {
        return err
      })
  }, [])
  console.log(total)
  return (
    

    
    <main>
    




              <div className='right md:hidden lg:block'>
              <div class="class-sections">
   {
    (user&& user.role ==='admin') || (currentData && currentData.role ==='admin') ?
    <h2>Add Teacher</h2>
  : (user&& user.role ==='teacher') ||  (currentData && currentData.role ==='teacher') ?
  <h2>Class Sections</h2>
 :
''
   }

    {
      section.map((data, index) => (
        <div class="classroom section1" key={index}>
        <div class="icon">
        <span class="material-symbols-sharp">door_open</span>
    </div>
    <div class="right">
        <div class="info">
        <h3><Link to={`/studsection/${data._id}`} className='text-[#7180eb] text-lg underline uppercase font-bold'>{data.sectionName}</Link></h3>
    </div>
    <div className='flex flex-col'>
    <h5>GRADE {data.grade}</h5>
   <small class="text-muted cursor-pointer underline hover:text-red-400" onClick={()=>{
      Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '##6f81eb',
  cancelButtonColor: '#ff7782',
  confirmButtonText: 'Yes, delete it!'
}).then((result)=> {
  if(result.isConfirmed){
    navigate(`/delete-section/${data._id}`)
  }
})
    }}>Delete Section</small>
    </div>
    </div>
   </div>
      ))
    }
   {
    (user&& user.role ==='admin') || (currentData && currentData.role ==='admin') ?
    <div class="classroom addsection cursor-pointer" onClick={()=> setAddTeacher(true)}>
    <span class="material-symbols-sharp">add</span>
    <h3 >ADD TEACHER</h3>
</div>
  : (user&& user.role ==='teacher') ||  (currentData && currentData.role ==='teacher') ?
  <div class="classroom addsection cursor-pointer" onClick={()=>setAddSection(true)}>
    <span class="material-symbols-sharp">add</span>
    <h3>ADD SECTION</h3>
   
</div>:
''
   }
   {addSection && <AddSection setAddSection={setAddSection} />}
   { addTeacher && <AddTeacher setAddTeacher={setAddTeacher} />}

</div>
              </div>  
            
      </main>
    
  )
}

export default Main


