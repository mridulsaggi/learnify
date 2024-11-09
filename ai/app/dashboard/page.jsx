import React from 'react'
import AddnewInterview from "./_compo/AddnewInterview.jsx"
const page = () => {
  return (
    <div className='my-5'>
      <p className='text-2xl font-bold'>DashBoard</p>
      <p className='text-[grey] font-semibold'>Create and start your AI interview</p>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddnewInterview />
      </div>
    </div>
  )
}

export default page
