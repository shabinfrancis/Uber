import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    // setCaptainData({
    //   email: email,
    //   password: password
    // });
    // console.log(captainData);
    const captain = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token)
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-9 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
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
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
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
            className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          />
          <button className='w-full bg-black text-white py-3 rounded mt-5 font-semibold'>Login</button>
        </form>
        <p className='text-center'><b> New here?</b> <Link to='/captain-signup' className='text-blue-500 font-medium'>Create New Account as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='flex items-center justify-center w-full bg-[#3d9b4b] text-white py-3 rounded mt-5 mb-5 font-semibold'>
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin