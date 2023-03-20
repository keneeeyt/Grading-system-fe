import React, { Fragment, useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'
import ShoolLogo from '../images/schoollogo.png';
const Aside = () => {

  const convertJson = window.localStorage.getItem('user')
  const [closeMenu, setCloseMenu] = useState(false)

    const closeBtn = () => {
        const asideMenu = document.querySelector("aside");
        asideMenu.style.display = 'none'
        setCloseMenu(!closeMenu)
    }

  const {user} = useContext(UserContext)
  const [currentData, setCurrentData] = useState(JSON.parse(convertJson))

  return (
    <aside>
    <div class="top">
        <div class="logo">
        <img src={ShoolLogo} />
        {
          (user&& user.role ==='teacher') ||  (currentData && currentData.role ==='teacher') ?
          <h2 className='text-xl font-bold flex flex-col'>Teacher<span>Panel</span></h2>
          : (user&& user.role ==='user') ||  (currentData && currentData.role ==='user') ?
          <h2 className='text-xl font-bold flex flex-col'>Student<span>Panel</span></h2>
          : (user&& user.role ==='admin') ||  (currentData && currentData.role ==='admin') ?
          <h2 className='text-xl font-bold flex flex-col'>Admin<span>Panel</span></h2>
          :
          ''
        }
       
        <div id='close-btn' onClick={()=> closeBtn()} className='text-2xl lg:hidden'>
        &times;
        </div>
        
        </div>  
        {/* <div class="close" id="close-btn" >
            <span class="material-symbols-sharp">close</span>
  
        </div> */}
    </div>

    <div class="sidebar">
        <Link to={currentData && currentData.role === 'teacher' ? '/teacher' : currentData && currentData.role === 'admin' ? '/admin':
        currentData && currentData.role === 'user' ? '/user' : '' } class="active">
            <span class="material-symbols-sharp"> grid_view</span>
            <h3>Dashboard</h3>
        </Link>
        {
          (user && user.role === 'teacher') || (currentData && currentData.role === 'teacher') ?
          <Fragment>
        <Link to="">
            <span class="material-symbols-sharp">group</span>
            <h3>Students</h3>
        </Link>
       
        </Fragment>
          :''
        }
        <Link to="">
            <span class="material-symbols-sharp">mail</span>
            <h3>Messages</h3>
            <span class="message-count">26</span>
        </Link>
        <Link to="">
            <span class="material-symbols-sharp">settings</span>
            <h3>Settings</h3>
        </Link>
        <Link to="/logout">
            <span class="material-symbols-sharp">logout</span>
            <h3>Logout</h3>
        </Link>
    </div>
 </aside>
  )
}

export default Aside