/* eslint-disable no-unused-vars */
import React,{useRef, useState , useEffect} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {getDownloadURL, getStorage, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { ref } from 'firebase/storage';
import { updateUserFailure,updateUserSuccess,updateUserStart } from '../redux/user/userSlice';
import {useDispatch} from 'react-redux';
export default function Profile() {
  const fileRef=useRef(null)
  const {currentUser}=useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined)
  const [filePercentage,setFilePercentage]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({});
  const dispatch=useDispatch();
  useEffect(()=>{
    if(file){
      handleFileUpload(file);   
    }
  },[file]);

  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime() + file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePercentage(Math.round(progress));
    },

    (error)=>{
      setFileUploadError(true);
      
    },
    
    ()=>{
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
        setFormData({ ...formData, avatar: downloadURL}));
    }
  )};
  const handleChange=(e)=>{ 
    setFormData({...formData,[e.target.id]: e.target.value})
  };
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser ._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data= await res.json();
      if(data.success === false){
          dispatch(updateUserFailure(data.message))
          return;
      }
      dispatch(updateUserSuccess(data));
    }
    catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }
  

  return (
    <div className='p-4 max-w-lg mx-auto'>
    <div> 
      <h1 className='text-3xl font-bold my-8 text-center'>Profile</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >

         <input type='file' 
              ref={fileRef} hidden 
             onChange={(e)=>setFile(e.target.files[0])} 
             accept='image/*'
          />
      
         <img onClick={()=>fileRef.current.click()} 
             src={formData.avatar || currentUser.avatar } alt='profile'
             className='rounded-full h-22 w-22 object-cover cursor-pointer self-center mt-1' 
             title='click to update'/>
      
         <p className='text-center'>
              {fileUploadError ? (
              <span className='text-red-600'>Error uploading image (Image size should be less than 2mb)</span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className='text-gray-800'>{`Uploading ${filePercentage}%`}</span>
            ) : filePercentage === 100 ? (
              <span className='text-green-600'>Image successfully updated!</span>
            ) : (
              ''
            )}
          </p>

      <input 
          type='text' placeholder='username' id='username' 
          autoComplete='username' className='border p-4 rounded-lg'
          defaultValue={currentUser.username}
          onChange={handleChange}/>
      <input 
          type='email' placeholder='email' id='email' 
          autoComplete='username' className='border p-4 rounded-lg'
          defaultValue={currentUser.email}
          onChange={handleChange}/>
      <input 
          type='password' placeholder='password' id='password'
          autoComplete='password' className='border p-4 rounded-lg'
          onChange={handleChange}/>

      <button className='bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700  
      disabled:bg-gray-500 ' 
      disabled={filePercentage > 0 && filePercentage < 100}>
      Update
      </button>

      </form>
      <div className='flex justify-between mt-4'>
      <span className='text-red-500 cursor-pointer hover:font-semibold'>Delete account</span>
      <span className='text-red-500 cursor-pointer hover:font-semibold'>Sign out</span>
      </div>
    </div>
    </div>
  )
}
