import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
  
        const result = await signInWithPopup(auth, provider);
  
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        });
        const data = await res.json();
        dispatch(signinSuccess(data));
        navigate('/');
        toast.success('Signed in successfully with Google');
      } catch (error) {
        console.log('could not sign in with google', error);
        toast.error('Failed to sign in with Google');
      }
    };
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-800 text-white p-2.5 rounded-lg
    uppercase hover:bg-red-600'>Continue with google</button>
  );
}
