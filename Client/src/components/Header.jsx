import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
export default function Header() {
  const {currentUser}= useSelector(state=>state.user)
  return (
   <header className='bg-slate-300 shadow-lg'>
   <div className='flex justify-between items-center max-w-6xl mx-auto p-2.5'>
   <Link to='/'>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer'>
      <span className='text-black-700'>Ivy</span>
      <span className='text-gray-700'>Estate</span>
    </h1>
    </Link>
    <form className='bg-slate-100 p-2 rounded-lg flex item-center'>
      <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
      
    </form>
    <ul className='flex gap-4 '>
    <Link to='/'>
       <li className='hidden sm:inline text-gray-700 hover:text-black cursor-pointer'>
         Home
       </li>
    </Link>
    <Link to='about'>
       <li className='hidden sm:inline text-gray-700 hover:text-black cursor-pointer'>
         About
       </li>
    </Link>
    <Link to='profile'>
    {currentUser ? (
        <img src={currentUser.avatar} alt='profile' className='rounded-full h-8 w-8 object-cover' />
    ):
     <li className=' text-gray-700 hover:text-black cursor-pointer'>
    Sign In
  </li>
    }  
    </Link>
    </ul>
    </div>
   </header>
  )
}
