import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/admin/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
    const [docimg, setDocimg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const {backendurl, atoken} = useContext(AdminContext)

    async function onSubmitHandler(event){
        event.preventDefault()
        if(!docimg){
            return toast.error('Image not selected')
        }
        const formData = new FormData()
        formData.append('image',docimg)
        formData.append('name',name)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('experience',experience)
        formData.append('degree',degree)
        formData.append('about',about)
        formData.append('fees',Number(fees))
        formData.append('address',JSON.stringify({line1 : address1, line2 : address2}))
        formData.append('speciality',speciality)

        formData.forEach((value,key)=>{
            console.log(`${key} : ${value}`)
        })

        const {data }= await axios.post(backendurl + '/api/admin/add-doctor' , formData, {headers : {atoken}})
        if(data.success==true){
            toast.success(data.message)
            setDocimg(false)
            setName('')
            setPassword('')
            setEmail('')
            setAddress1('')
            setAddress2('')
            setAbout('')
            setFees('')
        }else{
            toast.error(data.message)
        }
    }

  return (
    <form className='m-5 w-full' onSubmit={onSubmitHandler}>
        <p className='mb-3 text-lg font-medium'>Add Doctor</p>
        <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                    <img src={docimg ? URL.createObjectURL(docimg) :assets.upload_area} alt="" className='w-16 bg-gray-100 rounded-full cursor-pointer'/>
                </label>
                <input type="file" id='doc-img' hidden onChange={(e)=>setDocimg(e.target.files[0])}/>
                <p>Upload doctor <br /> pictures</p>
            </div>
            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Your Name</p>
                        <input type="text" placeholder='name' required className='border rounded px-3 py-2' onChange={(e)=>setName(e.target.value)} value={name}/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input type="email" placeholder='email' required className='border rounded px-3 py-2' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Password</p>
                        <input type="password" placeholder='password' required className='border rounded px-3 py-2' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor's Experience</p>
                        <select name="" id="" className='border rounded px-3 py-2' onChange={(e)=>setExperience(e.target.value)} value={experience}>
                            <option value="1 year">1 year</option>
                            <option value="2 year">2 year</option>
                            <option value="3 year">3 year</option>
                            <option value="4 year">4 year</option>
                            <option value="5 year">5 year</option>
                            <option value="6 year">6 year</option>
                            <option value="7 year">7 year</option>
                            <option value="8 year">8 year</option>
                            <option value="9 year">9 year</option>
                            <option value="10 year">10 year</option>
                        </select>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Fees</p>
                        <input type="number" placeholder='fees' required className='border rounded px-3 py-2' onChange={(e)=>setFees(e.target.value)} value={fees}/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Speciality</p>
                        <select name="" id="" className='border rounded px-3 py-2' onChange={(e)=>setSpeciality(e.target.value)} value={speciality}>
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Education</p>
                        <input type="text" placeholder='education' required className='border rounded px-3 py-2' onChange={(e)=>setDegree(e.target.value)} value={degree}/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Address</p>
                        <input type="text" placeholder='address 1' required className='border rounded px-3 py-2' onChange={(e)=>setAddress1(e.target.value)} value={address1}/>
                        <input type="text" placeholder='address 2' required className='border rounded px-3 py-2' onChange={(e)=>setAddress2(e.target.value)} value={address2}/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p className='mt-4 mb-2'>About</p>
                        <textarea type="text" placeholder='about' required rows={5} className='w-full px-4 pt-2 border rounded' onChange={(e)=>setAbout(e.target.value)} value={about}/>
                    </div>

                    <button className='bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full' type='submit'>Add Doctor</button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AddDoctor