import React, { useContext, useState } from 'react'
import logo from "../assets/logo.jpg"
import { NavLink, useNavigate } from 'react-router-dom'
import drop from "../assets/dropdown_icon.svg"
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu,setShowMenu] = useState(false);
    const {token,setToken, userData} = useContext(AppContext)
    function logout(){
        setToken(false)
        localStorage.removeItem('token')
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-800'>
        <img src={logo} alt="" className='w-44 sm:w-16 md:w-20 h-auto cursor-pointer' onClick={()=>navigate('/')}/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to="/">
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-[#3b82f6] w-3/5 m-auto'/>
            </NavLink>
            <NavLink to="/doctors">
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-[#3b82f6] w-3/5 m-auto'/>
            </NavLink>
            <NavLink to="/about">
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-[#3b82f6] w-3/5 m-auto'/>
            </NavLink>
            <NavLink to="/contact">
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-[#3b82f6] w-3/5 m-auto'/>
            </NavLink>
        </ul>
        <div className='flex item-center gap-4'>
            {
                token && userData ?
                <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img src={userData.image} alt="" className='w-8 rounded-full'/>
                <img src={drop} alt="" className='w-2.5'/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={()=>navigate('/myprofile')} className='hover:text-black cursor-pointer'>Profile</p>
                        <p onClick={()=>navigate('/myappointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
                </div>
                : <button onClick={()=>navigate('/login')} className='bg-[#3b82f6] cursor-pointer text-white px-8 py-3 rounded full font-light hidden md:block'>Create Account</button>
            }
            <img src={assets.menu_icon} alt="" className='w-6 md:hidden' onClick={()=>setShowMenu(true)}/>
            <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img src={assets.logo} alt="" className='w-36'/>
                    <img src={assets.cross_icon} alt="" onClick={()=>setShowMenu(false)} className='w-7'/>
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink className='px-4 py-2 rounded inline-block' to='/' onClick={()=>setShowMenu(false)}><p>HOME</p></NavLink>
                    <NavLink className='px-4 py-2 rounded inline-block' to='/doctors' onClick={()=>setShowMenu(false)}><p>ALL DOCTORS</p></NavLink>
                    <NavLink className='px-4 py-2 rounded inline-block' to='/about' onClick={()=>setShowMenu(false)}><p>ABOUT</p></NavLink>
                    <NavLink className='px-4 py-2 rounded inline-block' to='/contact' onClick={()=>setShowMenu(false)}><p>CONTACT</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}
export default Navbar