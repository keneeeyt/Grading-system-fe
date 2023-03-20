import React, { useState } from 'react'
import Swal from 'sweetalert2'

const AddSection = ({setAddSection}) => {


    const [sectionName, setSectionName] = useState('')
    const [grade, setGrade] = useState('')
    const convertJson = window.localStorage.getItem('user')
  const [currentData, setCurrentData] = useState(JSON.parse(convertJson))





    const handleSubmit = (event) => {
            event.preventDefault();

            fetch(`http://localhost:4001/api/addsection/${currentData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    sectionName: sectionName,
                    grade: grade
                })
            })
            .then(result => result.json())
            .then(data => {
               if(data){
                    Swal.fire({
                        icon:'success',
                        text: 'Section successfully added!'
                    })
                }else{
                    Swal.fire({
                        icon:'error',
                        text: 'Section name already exists!'
                    })
                }
                
            })
            .catch((err) => {
               return console.log(err)
               
            })
    }

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-[#0008] z-50  overflow-auto">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border mt-[50px]  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div
          onClick={() => setAddSection(false)}
          className="w-full px-4 py-2 text-xl text-[#F26F21] flex justify-end cursor-pointer"
        >
          	&times;
        </div>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="form_group">
              <div className="relative">
                <input
                  onChange={event => setSectionName(event.target.value)}
                  value={sectionName}
                  type="text"
                  name="sectionname"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#6a7ff4] focus:ring-[#6a7ff4] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter section name"
                />
              </div>
              <div>
                <input
                  value={grade}
                  onChange={event => setGrade(event.target.value)}
                  type="text"
                  name="sectiongrade"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#6a7ff4] focus:ring-[#6a7ff4] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter section grade"
                />
              </div>
              <div>
                </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#6a7ff4] rounded-md hover:bg-[#2a2c7e] focus:outline-none disabled:opacity-30"
            >
              Add Section
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddSection