import React from 'react'
import Webcam from 'react-webcam'

const RecordAnswer = () => {
  return (
    <div className='p-5 relative rounded-lg border flex items-center'>
        <img src="/webcam.jpg" className='absolute rounded-lg h-[70%] ml-[5rem] w-[70%]' alt="" />
        <Webcam className='z-50 rounded-lg ml-[5rem]'
        height={500}
        width={500}
        
        mirrored={true}
        />
    </div>
  )
}

export default RecordAnswer
