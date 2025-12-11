import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { Route, Routes, useLocation } from 'react-router-dom'
import { assets } from './assets/assets'
import './assets/prism.css'
import { useApp } from './hooks/useApp'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import Loading from './components/Loading'

const App = () => {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const { user, isLoading } = useApp()
  if (pathname === '/loading' || isLoading) {
    return <Loading />
  }
  return (
    <>
      <Toaster position='top-center' />
      {!isOpen && (
        <img
          src={assets.menu_icon}
          className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert'
          onClick={() => setIsOpen(true)}
        />
      )}
      {user ? (
        <div className='dark:bg-linear-to-b from-[#242124] to-[#000000] dark:text-white'>
          <div className='flex h-screen w-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <Routes>
              <Route path='/' element={<ChatBox />} />
              <Route path='/credits' element={<Credits />} />
              <Route path='/community' element={<Community />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className='bg-linear-to-b from-[#242124] to-[#000000] dark:text-white flex items-center justify-center h-screen w-screen'>
          <Login />
        </div>
      )}
    </>

  )
}

export default App