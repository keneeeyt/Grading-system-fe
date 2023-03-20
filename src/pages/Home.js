import React, {useState}from 'react'
import { Link } from 'react-router-dom';
import backgroundImage from '../images/landing.png';
import SchoolLogo from '../images/schoollogo.png';

const Home = () => {
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }
  const convertJson = window.localStorage.getItem('user')
  const [currentData, setCurrentData] = useState(JSON.parse(convertJson))
  return (
    <div style={containerStyle} className='relative'>
      <div className='absolute mt-[50%] md:mt-[20%] ml-[10%]'>
        <h1 className='text-[#2a2c7c] text-[3rem]'>GRADE VIEWING</h1>
        <h1 className='text-[#6980f5] text-[3rem]'>SYSTEM</h1>

          {
              currentData && currentData ? <button className='p-3 bg-[#6980f5] font-semibold rounded-lg mt-10 px-10 hover:bg-[#2a2c7c] transition  duration-500 hover:scale-125'><Link to ={`/${currentData && currentData.role}`} className='text-white'>GO BACK</Link></button>
              :
              <button className='p-3 bg-[#6980f5] font-semibold rounded-lg mt-10 px-10 hover:bg-[#2a2c7c] transition  duration-500 hover:scale-125'><Link to = '/login' className='text-white'>LOGIN HERE</Link></button>
          }
        
      </div>

      <img src={SchoolLogo} alt='logo' style={{width: '90px'}} className='bottom-0 lg:hidden'/>

        <div className='absolute bottom-0 ml-[8rem]'>
      <p className='text-[#6980f5]'>CREATED BY: <Link to = 'http://cervantesklc.com' className='text-[#6980f5]' target='_blank'>cervantesklc.com</Link></p>
      </div>
    </div>
  )
}

export default Home