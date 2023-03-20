import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'
import AddSection from './AddSection'
import AddTeacher from './AddTeacher'
import Swal from 'sweetalert2'
const Right = () => {
  const [darkmode, setDarkMode] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const [section, setSection] = useState([])
    const {user} = useContext(UserContext);
    const convertJson = window.localStorage.getItem('user')
    const [currentData, setCurrentData] = useState(JSON.parse(convertJson))
    const [addTeacher, setAddTeacher] = useState(false)
    const [addSection, setAddSection] = useState(false)
    const navigate = useNavigate();
  const darkMode = () => {
    document.body.classList.toggle('dark-theme-variables');
    setDarkMode(!darkmode)
  }

  const showMenu = () => {
    const asideMenu = document.querySelector("aside");
    asideMenu.style.display = 'block';
    setShowNav(!showNav)
  }

  useEffect(() => {
    fetch('http://localhost:4001/api/sections', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(result => result.json())
      .then(data => {
        console.log(data)
        return setSection(data);
      })
      .catch(err => {
        return err
      })
  }, [])
  return (
    <div class="right">
    <div class="top">
         <button id="menu-btn" onClick={() => showMenu()}>
            <span class="material-symbols-sharp">menu</span>
         </button>
         <div class="theme-toggler" onClick={()=> darkMode()}>
          {
            darkmode ?
            <Fragment>
            <span class="material-symbols-sharp">light_mode</span>
            <span class="material-symbols-sharp active">dark_mode</span>
            </Fragment>
            :
            <Fragment>
            <span class="material-symbols-sharp active">light_mode</span>
            <span class="material-symbols-sharp">dark_mode</span>
            </Fragment>
          }

            
         </div>
         <div class="profile">
            <div class="info">
            <p>Hey! <b>{(currentData && currentData.firstName) || (user&& user.firstName)}</b></p>
            {
              (user&& user.role ==='teacher') ||  (currentData && currentData.role ==='teacher') ? <small class="text-muted">Teacher</small>
              : (user&& user.role ==='admin') || (currentData && currentData.role ==='admin') ? <small class="text-muted">Admin</small>
              : (user&& user.role ==='user') || (currentData && currentData.role ==='user') ? <small class="text-muted">Student</small>
              : ""
            }
            </div>
         </div>
         <div class="profile-photo">
           <img src ={(user && user.avatar) || (currentData && currentData.avatar)} />
         </div>
    </div>
    <div class="student-updates">
        <h2>Students Updates</h2>
        <div class="updates">
            <div class="update">
                <div class="profile">
                    <img src="" alt="" />
                </div>
                <div class="message">
                    <p><b>Kenneth Cervantes</b> quiz 012 is missed. morning session</p>
                    <small class="text-muted">Feb 25 2023</small>
                </div>
            </div>
            <div class="update">
                <div class="profile-photo">
                    <img src="" alt="" />
                </div>
                <div class="message">
                    <p><b>Colen Cervantes</b> project 013 is missed. First Grading</p>
                    <small class="text-muted">Feb 25 2023</small>
                </div>
            </div>
            <div class="update">
                <div class="profile-photo">
                    <img src="" alt="" />
                </div>
                <div class="message">
                    <p><b>Maddox Kyle Cervantes</b> quiz 011 is missed. morning session</p>
                    <small class="text-muted">Feb 22 2023</small>
                </div>
            </div>
        </div>
   </div>
   {
    (user&& user.role ==='admin') || (currentData && currentData.role ==='admin') ?

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
:
''

   }

   {/* Teacher  point of view */}

   {
    (user&& user.role ==='teacher') || (currentData && currentData.role ==='teacher') ?

    <div class="class-sections hidden md:block lg:hidden">
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
:
''

   }
  
</div>
  )
}

export default Right



  {/* {
              section.map((data, index) => (
                <tr key={index}>
                 <td> <Link to={`/studsection/${data._id}`}>{data.sectionName}</Link></td>
                  <td>{data.grade}</td>
                </tr>
              ))
            } */}