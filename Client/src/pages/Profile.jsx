import React,{useRef, useState , useEffect} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import getStorage from 'firebase/storage';
export default function Profile() {
  const fileRef=useRef(null)
  const {currentUser}=useSelector((state)=>state.user)
  const [file,setFile]=useState(undefined)

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload=(file)=>{
    const storage=getStorage(app)
  }
  return (
    <div className='p-4 max-w-lg mx-auto'>
    <div>
      <h1 className='text-3xl font-bold my-8 text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
      <input type='file' ref={fileRef} hidden/>
      <img onClick={()=>fileRef.current.click()} 
      onChange={(e)=>setFile(e.target.files[0])}
      src={currentUser.avatar} alt='profile'
      className='rounded-full h-22 w-22 object-cover cursor-pointer self-center mt-1' 
      title='click to update' accept='image/*'/>
      <input type='text' placeholder='username' id='username' className='border p-4 rounded-lg'/>
      <input type='email' placeholder='email'id='email' className='border p-4 rounded-lg'/>
      <input type='password' placeholder='password' id='password'className='border p-4 rounded-lg'/>

      <button className='bg-gray-900 text-white p-2.5 rounded-lg hover:bg-gray-700  
      disabled:bg-gray-500 '>Update</button>

      </form>
      <div className='flex justify-between mt-4'>
      <span className='text-red-500 cursor-pointer hover:font-semibold'>Delete account</span>
      <span className='text-red-500 cursor-pointer hover:font-semibold'>Sign out</span>
      </div>
    </div>
    </div>
  )
}
