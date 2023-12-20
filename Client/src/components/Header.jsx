// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useEffect, useState } from 'react';
export default function Header() {
  const {currentUser}= useSelector(state=>state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
   <header className='bg-indigo-100 shadow-lg'>
   <div className='flex justify-between items-center max-w-6xl mx-auto p-2.5'>
   <Link to='/'>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer'>
      <span className='text-blue-400'>Ivy</span>
      <span className='text-orange-400'>Estate</span>
    </h1>
    </Link>
    <form className='bg-white p-2 rounded-lg flex item-center'>
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
