import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faEnvelope, faSignIn } from '@fortawesome/free-solid-svg-icons'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const [error,setError]=useState(null);
  const[loading,SetLoading]=useState(false);
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
      setError('Please complete the reCAPTCHA challenge.');
      return
    }
    try{
      SetLoading(true);
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
        SetLoading(false);
        setError(data.message);
        return;
      }
      SetLoading(false);
      setError(null);
      navigate('/');
    }
    catch (error){
      SetLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='mr-4 ml-4'>
    <div className='p-4 max-w-lg mx-auto border-2 black mt-8 rounded-xl shadow-xl'>
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
    sitekey="6Lc6qAMpAAAAACt80mc1an6aYl6QdK6lmms5_n_b"
    onChange={handleCaptchaChange}
  />
        <button disabled={loading} className='bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700  
        disabled:bg-gray-500 sh' onClick={handleSubmit}>
        {loading ? 'LOADING...' : 'SIGN IN' }</button>
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
