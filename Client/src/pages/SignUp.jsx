import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faEnvelope,faUser } from '@fortawesome/free-solid-svg-icons'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error,setError]=useState(null);
  const[loading,SetLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({
      ...formData, //keeps track of the user entered data
      [e.target.id]:e.target.value,
    });
  };
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      SetLoading(true);
      const res= await fetch('/api/auth/signup', //proxy to redirect to 5173(client address) from api is set in vite.config.js
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if(data.success==false){
        SetLoading(false);
        setError(data.message);
        return;
      }
      SetLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch (error){
      SetLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='mr-4 ml-4'>
    <div className='p-4 max-w-lg mx-auto border-2 black mt-8 rounded-xl shadow-xl'>
      <h1 className='text-3xl text-center font-bold my-8'>Sign Up</h1>
      <form className='flex flex-col gap-5 p-6'>
      <div className='flex relative'>
          <FontAwesomeIcon icon={faUser} className="text-gray-400 h-6 mt-4 ml-3 absolute" />
          <input type="text" placeholder='Username' 
          className='border p-4 shadow-md w-full pl-10
          rounded-lg focus:bg-gray-200' 
          id='username' onChange={handleChange}/>
      </div>

      <div className='flex relative'>
        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 h-6 mt-4 ml-3 absolute" />
        <input type="email" placeholder='Email' className='border p-4 shadow-md 
        rounded-lg  focus:bg-gray-200 w-full pl-10' id='email' autoComplete='current username'onChange={handleChange}/>
      </div>

      <div className='flex relative'>
        <FontAwesomeIcon icon={faLock} className="text-gray-400 h-6 mt-4 ml-3 absolute" />
        <input type="password" placeholder='Password' className='border p-4 shadow-md
         rounded-lg  focus:bg-gray-200 w-full pl-10' id='password'autoComplete='current password' onChange={handleChange}/>
      </div>

        <button disabled={loading} className='bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700  
        disabled:bg-gray-500 ' onClick={handleSubmit}>
        {loading ? 'LOADING...' : 'SIGN UP' }</button>
      </form>
      <div className='flex gap-2 mt-6 mb-6 ml-6'> 
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-800'>Sign In</span>
        </Link>
      </div>
    </div>
    {error && <p className='text-red-700 mt-6'>{error}</p>}
    </div>
  )
}
