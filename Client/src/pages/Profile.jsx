/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { ref } from 'firebase/storage';
import toast from 'react-hot-toast';
import {
  updateUserFailure, updateUserSuccess, updateUserStart,
  deleteUserFailure, deleteUserStart, deleteUserSuccess,
  signOutUserStart, signOutUserSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';



export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        toast.error('Error uploading image (Image size should be less than 2MB)');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }));
        toast.success('Image successfully updated!');
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast.success('User updated successfully!');
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success('User deleted successfully!');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(signOutUserSuccess(data));
      toast.success('Signed out successfully!');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      console.log("Current User ID:", currentUser._id);

      if (!currentUser || !currentUser._id) {
        throw new Error("User ID is not defined");
      }
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        toast.error('Error showing listings');
        return;
      }

      setUserListings(data);
      if(data==0){
        toast.error('No listings found, Add one!');
                return;
      }
      toast.success('Listings retrieved successfully!');
    } catch (error) {
      setShowListingsError(true);
      toast.error('Error showing listings');
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        toast.error(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      toast.success('Listing deleted successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <div>
        <h1 className='text-3xl font-bold my-8 text-center'>Profile</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4' >

          <input type='file'
            ref={fileRef} hidden
            onChange={(e) => setFile(e.target.files[0])}
            accept='image/*'
          />

          <img onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar} alt='profile'
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-1'
            title='click to update' />

          <p className='text-center'>
            {fileUploadError ? (
              <span className='text-red-600'>Error uploading image (Image size should be less than 2MB)</span>
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
            onChange={handleChange} />
          <input
            type='email' placeholder='email' id='email'
            autoComplete='username' className='border p-4 rounded-lg'
            defaultValue={currentUser.email}
            onChange={handleChange} />
          <input
            type='password' placeholder='password' id='password'
            autoComplete='password' className='border p-4 rounded-lg'
            onChange={handleChange} />

          <button onClick={handleSubmit}
            disabled={loading}
            className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
          <Link
            className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
            to={'/create-listing'}
          >
            Add a property
          </Link>
        </form>
        <div className='flex justify-between mt-5'>
          <span
            onClick={handleDeleteUser}
            className='text-red-700 cursor-pointer'
          >
            Delete account
          </span>
          <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
            Sign out
          </span>
        </div>

        <p className='text-green-700 mt-5'>
          {updateSuccess ? 'User is updated successfully!' : ''}
        </p>
        <button onClick={handleShowListings} className='text-green-700 w-full'>
          Show properties
        </button>
        <p className='text-red-700 mt-5'>
          {showListingsError ? 'Error showing listings' : ''}
        </p>

        {userListings && userListings.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h1 className='text-center mt-7 text-2xl font-semibold'>
              Your Listings
            </h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className='border rounded-lg p-3 flex justify-between items-center gap-4'
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt='propertycover'
                    className='h-16 w-16 object-contain'
                  />
                </Link>
                <Link
                  className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className='flex flex-col item-center'>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className='text-red-700 uppercase'
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className='text-green-700 uppercase'>Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
