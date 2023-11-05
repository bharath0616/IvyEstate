import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='mr-4 ml-4'>
    <div className='p-4 max-w-lg mx-auto border-2 black mt-8 rounded-xl shadow-xl'>
      <h1 className='text-3xl text-center font-bold my-8'>Sign Up</h1>
      <form className='flex flex-col gap-5 p-6'>
        <input type="text" placeholder='Username' className='border p-4 shadow-md rounded-lg focus:bg-gray-200' id='username' />
        <input type="text" placeholder='Email' className='border p-4 shadow-md rounded-lg  focus:bg-gray-200' id='email' />
        <input type="text" placeholder='Password' className='border p-4 shadow-md rounded-lg  focus:bg-gray-200 ' id='password' />

        <button className='bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700  
        disabled:bg-gray-500 sh'>SIGN UP</button>
      </form>
      <div className='flex gap-2 mt-6 mb-6 ml-6'> 
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-800'>Sign In</span>
        </Link>
      </div>
    </div>
    </div>
  )
}
