import jwt from 'jsonwebtoken'

async function authUser(req,res,next){
    try{
        const header = req.headers.authorization || req.headers.token;
        const token = typeof header === 'string' && header.startsWith('Bearer ') ? header.split(' ')[1] : header;
        console.log("TOKEN RECEIVED FROM CLIENT:", token);
        if(!token){
            return res.json({success:false, message:'not authorized'});
        }
        const tokendecode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = tokendecode.id
        next();
    }catch(error){
        return res.json({success:false, message:error.message})
    }
}

export default authUser;