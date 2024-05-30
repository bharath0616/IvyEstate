/* eslint-disable no-unused-vars */
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { signinStart,signinSuccess,signinFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
export default function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading , error} =useSelector((state)=>state.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const handleChange=(e)=>{
    setFormData({
      ...formData, //keeps track of the user entered data
      [e.target.id]:e.target.value,
    });
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if (!isCaptchaValid) {
      dispatch(signinFailure('Please complete the reCAPTCHA challenge.'));
      return
    }
    try{
      dispatch(signinStart());
      const res= await fetch('/api/auth/signin', //proxy to redirect to 5173(client address) from api is set in vite.config.js
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
        dispatch(signinFailure(data.message));
        return;
      }
      dispatch(signinSuccess(data));
      navigate('/');
    }
    catch (error){
      dispatch(signinFailure(error.message));
    }
  };
  return (
    <div className='mr-4 ml-4'>
    <div className='p-4 max-w-lg mx-auto bg-red-100 border-2 black mt-8 rounded-xl shadow-xl'>
      <h1 className='text-3xl text-center font-bold my-8'>Sign In</h1>
      <form className='flex flex-col gap-5 p-6'>
        
      <div className='flex relative' ><FontAwesomeIcon icon={faEnvelope} className=" text-gray-400 h-6 mt-4 ml-3 absolute " />
        <input type="email" placeholder='Email' className='border p-4 shadow-md 
        rounded-lg  focus:bg-gray-200 w-full pl-10' id='email' autoComplete='current username'onChange={handleChange}/>
      </div>

      <div className='flex gap-4'><FontAwesomeIcon icon={faLock} className="  text-gray-400 h-6 mt-4 ml-3 absolute" />
        <input type="password" placeholder='Password' className='border p-4 shadow-md
         rounded-lg  focus:bg-gray-200 w-full pl-10 ' id='password'autoComplete='current password' onChange={handleChange}/>
      </div>

      <ReCAPTCHA 
    sitekey="6Ld5BO0pAAAAAJHWQX_Bumy2Lfbz5uh_R9dGJ9j1"
    onChange={handleCaptchaChange}
  />
        <button disabled={loading} className='bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700  
        disabled:bg-gray-500 sh' onClick={handleSubmit}>
        {loading ? 'LOADING...' : 'SIGN IN' }</button>

        <OAuth/>
        
      </form>
      <div className='flex gap-2 mt-6 mb-6 ml-6'> 
        <p>New to IvyEstate?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-800'>Sign Up</span>
        </Link>
      </div>
    </div>
    {error && <p className='text-red-700 mt-6'>{error}</p>}
    </div>
  )
}
