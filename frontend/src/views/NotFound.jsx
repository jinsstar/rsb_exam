import React from 'react'


const NotFound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <p className='flex font-semibold text-9xl'>404</p>
      <p className='text-l'>Page Not Found</p>
      <p className='text-xs'>The requested page was not found</p>
    </div>
  )
}

export default NotFound
