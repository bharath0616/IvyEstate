import React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
   <header className='bg-slate-300 shadow-lg'>
   <div className='flex justify-between items-center max-w-6xl mx-auto p-2.5'>
   <Link to='/'>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer'>
      <span className='text-slate-700'>Ivy</span>
      <span className='text-slate-900'>Estate</span>
    </h1>
    </Link>
    <form className='bg-slate-100 p-2 rounded-lg flex item-center'>
      <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
      <faSearch className='text-scale-550'/>
    </form>
    <ul className='flex gap-4 '>
    <Link to='/'>
       <l1 className='hidden sm:inline text-slate-600 hover:text-black cursor-pointer'>
         Home
       </l1>
    </Link>
    <Link to='about'>
       <l1 className='hidden sm:inline text-slate-600 hover:text-black cursor-pointer'>
         About
       </l1>
    </Link>
    <Link to='sign-in'>
       <l1 className=' text-slate-600 hover:text-black cursor-pointer'>
         Sign In
       </l1>
    </Link>
    </ul>
    </div>
   </header>
  )
}
