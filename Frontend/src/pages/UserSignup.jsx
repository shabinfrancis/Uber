import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    // setUserData({
    //   fullName: {
    //     firstName: firstName,
    //     lastName: lastName
    //   },
    //   email: email,
    //   password: password
    // })
    // console.log(userData);
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if(response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home');
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }
  return (
    <div className='p-9 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='text-xl mb-2'><b> What's your name</b></h3>
          <div className='flex gap-4 mb-7'>
            <input
              type="name"
              value={firstName}
              onChange={(e) => {
                // console.log(e.target.value)
                setFirstName(e.target.value)
              }}
              required
              placeholder='First Name'
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'
            />
            <input
              type="name"
              value={lastName}
              onChange={(e) => {
                // console.log(e.target.value)
                setLastName(e.target.value)
              }}
              required
              placeholder='Last Name'
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm'
            />
          </div>
          <h3 className='text-xl mb-2'><b> What's your email</b></h3>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              // console.log(e.target.value)
              setEmail(e.target.value)
            }}
            required
            placeholder='email@example.com'
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm'
          />
          <h3 className='text-xl mb-2'><b> Enter password</b></h3>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => {
              // console.log(e.target.value)
              setPassword(e.target.value)
            }}
            placeholder='password'
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm'
          />
          <button className='w-full bg-black text-white py-3 rounded mt-5 font-semibold'>Signup</button>
        </form>
        <p className='text-center'><b> Already have an account?</b> <Link to='/login' className='text-blue-500 font-medium'>Login</Link></p>
      </div>
      <div>
        <Link
          to='/captain-signup'
          className='flex items-center justify-center w-full bg-[#FFBD5B] text-white py-3 rounded mt-5 mb-5 font-semibold'>
          Sign up as Captain
        </Link>
      </div>
      <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
  )
}

export default UserSignup