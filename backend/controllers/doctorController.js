import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function changeAvailability(req,res){
    try{
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        return res.json({success:true, message:'availablility change'})
    }catch(error){
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

async function doctorList(req,res){
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

async function loginDoctor(req,res) {
    try {
        const {email,password} = req.body;
        const doctor = await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false, message:'Invalid credentials'})
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(!isMatch){
            return res.json({success:false, message:'Invalid credentials'})
        }
        const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
        return res.json({success:true, token})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

export {changeAvailability,doctorList, loginDoctor}