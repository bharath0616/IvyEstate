import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='p-4 max-w-lg mx-auto'>
    <div>
      <h1 className='text-3xl font-bold my-8 text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
      <img src={currentUser.avatar} alt='profile'
      className='rounded-full h-22 w-22 object-cover cursor-pointer self-center mt-3' />
      <input type='text' placeholder='username' id='username' className='border p-4 rounded-lg'/>
      <input type='email' placeholder='email'id='email' className='border p-4 rounded-lg'/>
      <input type='password' placeholder='password' id='password'className='border p-4 rounded-lg'/>

      <button className='bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700  
      disabled:bg-gray-500 '>Update</button>

      </form>
      <div className='flex justify-between mt-4'>
      <span className='text-red-500 cursor-pointer hover:text-red-900'>Delete account</span>
      <span className='text-red-500 cursor-pointer hover:text-red-900'>Sign out</span>
      </div>
    </div>
    </div>
  )
}
