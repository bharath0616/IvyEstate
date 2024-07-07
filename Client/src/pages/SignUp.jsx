// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add password state
  const refForm = useRef();
  const [errors, setErrors] = useState({}); // Track validation errors
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({
      ...formData, //keeps track of the user entered data
      [e.target.id]:e.target.value,
    });
  };
  const validateUsername = (username) => {
    return username.length >= 5;
  }

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/;
    return passwordRegex.test(password);
  }
  const sendEmail = () => {
    if (!name || !email || !password) {
      setLoading(false);
      // eslint-disable-next-line no-undef
      setErrors(data.message);
      return;
    }
    const serviceId = 'service_5dacytq';
    const templateId = 'template_kwc8lco';
    const publicKey = '1DwV-IX17SdeEutWW';
    if (!serviceId || !templateId || !publicKey) {
      console.error('Service ID, Template ID, or Public Key is missing or undefined.');
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'IvyEstate',
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        setName('');
        setEmail('');
        setEmailSent(true); // Set the flag to true after sending
        toast.success('Email sent successfully!');
      })
      .catch((error) => {
        toast.error("Failed to send the mail!");
      });
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const newErrors = {}; 

    if (!validateUsername(name)) {
      newErrors.username = "Username must be at least 5 characters long.";
    }

    if (!validateEmail(email)) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password must contain at least 6 characters, one uppercase, one lowercase, one special character, and a number.";
    }

    setErrors(newErrors); 

    if (Object.keys(newErrors).length > 0) {
      return; 
    }
    try{
      setLoading(true);
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

      if(data.success===false){
        setLoading(false);
        setErrors({ global: data.message });
        toast.error("Email already exists")
      }
     else {
        setLoading(false);
        setErrors({});
        if (!emailSent) {
          sendEmail();
        }
        navigate('/sign-in');
      }
    }
    catch (error){
      setLoading(false);
      setErrors({ global: error.message });
    }
  };
  return (
    <div className='mr-4 ml-4'>
    <div className='p-4 max-w-lg mx-auto bg-[#b8c0c4] border-2 black mt-8 rounded-xl shadow-xl'>
      <h1 className='text-3xl text-center font-bold my-8'>Sign Up</h1>
      <form className='flex flex-col gap-5 p-6' ref={refForm}>
      <div className='flex relative'>
          <FontAwesomeIcon icon={faUser} className="text-gray-400 h-6 mt-4 ml-3 absolute" />
          <input
           type="text"
           placeholder='Username' 
          className='border p-4 shadow-md w-full pl-10
          rounded-lg focus:bg-gray-200' 
          id='username' 
          required  
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleChange(e);
              }}
              />
      </div>
      {errors.username && <p className='text-red-700 text-sm'>{errors.email}</p>}

      <div className='flex relative'>
        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 h-6 mt-4 ml-3 absolute" />
        <input type="email" placeholder='Email' className='border p-4 shadow-md 
        rounded-lg  focus:bg-gray-200 w-full pl-10' id='email'
         required value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange(e);
              }}
              autoComplete="username"
              />
      </div>

      {errors.email && <p className='text-red-700 text-sm'>{errors.email}</p>}

      <div className='flex relative'>
        <FontAwesomeIcon icon={faLock} className="text-gray-400 h-6 mt-4 ml-3 absolute" />
        <input type="password" placeholder='Password' 
        className='border p-4 shadow-md
         rounded-lg  focus:bg-gray-200 w-full pl-10' 
         id='password' autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                handleChange(e);
              }}
              required  />
      </div>

      {errors.password && <p className='text-red-700 text-sm'>{errors.password}</p>}

        <button disabled={loading} className='bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700  
        disabled:bg-gray-500 ' onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);}}>
        {loading ? 'LOADING...' : 'SIGN UP' }</button>

        <OAuth/>
        
      </form>
      <div className='flex gap-2 mt-6 mb-6 ml-6'> 
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-800'>Sign In</span>
        </Link>
      </div>
    </div>
     {errors.global && <p className='text-red-700 mt-2 text-center'>{errors.global}</p>}
    </div>
  )
}
