import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import LandingPage from './pages/LandingPage'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
          <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          } />
          {/* <Route path='/captain-home' element={<CaptainHome />} /> */}
          <Route path='/login' element={<UserLogin />}></Route>
          <Route path='/signup' element={<UserSignup />}></Route>
          <Route path='/captain-login' element={<CaptainLogin />}></Route>
          <Route path='/captain-signup' element={<CaptainSignup />}></Route>
          <Route path='/user/logout'
            element={<UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
            }
          />
          <Route path='/captain/logout' element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
            }
          />
          <Route path='/riding' element={<Riding />}></Route>
          <Route path='/captain-riding' element={<CaptainRiding />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
