import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/admin/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import { useEffect } from 'react';

const AdminLogin = () => {
    const [state, setState] = useState('Admin');
    const {setaToken,backendurl} = useContext(AdminContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const onSubmitHandler = async(event) =>{
        event.preventDefault()
            if(state==='Admin'){
                const {data} = await axios.post(backendurl + "/api/admin/login", {email,password});
                if(data && data.success===true){
                    setIsLoggedIn(true);
                    localStorage.setItem('atoken',data.token)
                    setaToken(data.token);
                }else{
                    toast.error(data.message);
                }
            }   
    }
    
    useEffect(() => {
        const token = localStorage.getItem('atoken');
        if (token) {
            setIsLoggedIn(true);
            setaToken(token);
        }
    }
    , [setaToken])

    if(isLoggedIn){
        return (    
        <div className='bg-[#F8F9FD]'>
            <Navbar/>
            <div className='flex items-start'>
                <Sidebar/>
            </div>
        </div>
        )

    }

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-3xl font-semibold m-auto'><span className='text-[#5F6FFF]'> {state} </span>Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input type="email" required className='border border-[#DADADA] rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input type="password" required className='border border-[#DADADA] rounded w-full p-2 mt-1' onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </div>
            <button className='bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base'>Login</button>
            {
                state=='Admin' ? <p>Doctor Login?<span onClick={()=>setState('Doctor')} className='text-[#5F6FFF] underline cursor-pointer'>Click Here</span></p> :
                <p>Admin Login?<span onClick={()=>setState('Admin')} className='text-[#5F6FFF] underline cursor-pointer'>Click Here</span></p>
            }
        </div>
    </form>
  )
}

export default AdminLogin;