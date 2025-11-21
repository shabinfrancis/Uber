import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    // setCaptainData({
    //   fullName: {
    //     firstname: firstName,
    //     lastname: lastName
    //   },
    //   email: email,
    //   password: password
    // })
    // console.log(captainData);
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
  
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain);
      localStorage.setItem('token', data.token)
      navigate('/captain-home');
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div className='px-5 py-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-7' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-xl mb-2'><b> What's your name</b></h3>
          <div className='flex gap-4 mb-1'>
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
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motocycle</option>
            </select>
          </div>

          <button className='w-full bg-black text-white py-3 rounded mt-5 font-semibold'>Signup</button>
        </form>
        <p className='text-center'><b> Already have an account?</b> <Link to='/captain-login' className='text-blue-500 font-medium'>Login</Link></p>
      </div>
      <div>
        <Link
          to='/signup'
          className='flex items-center justify-center w-full bg-[#FFBD5B] text-white py-3 rounded mt-5 mb-5 font-semibold'>
          Sign up as User
        </Link>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup