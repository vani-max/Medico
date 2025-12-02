import React from 'react'
import { assets } from '../../assets/admin/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/admin/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const {atoken,setaToken} = useContext(AdminContext)
    const navigate = useNavigate()
    const logout  = () =>{
      console.log('logout clicked', { atoken })
        navigate('/')
        atoken && setaToken('')
        atoken && localStorage.removeItem('atoken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img src={assets.admin_logo} alt="" className='w-36 sm:w-40 cursor-pointer'/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar