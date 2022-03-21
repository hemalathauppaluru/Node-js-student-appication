const jwt = require("jsonwebtoken")

const authorizeStudent =(req,res,next)=>{
    if(req.headers['authorization']){
        const token =req.headers['authorization'].split(" ")[1]
        console.log( token,"token");
        const payload =jwt.verify(token,process.env.SECRET_KEY)
        console.log("payload",payload);
        if(payload.role === 'student'){
            next()
        }else{
            res.status(401).json({
                error:true,
                message:"Not Authorized",
                data:null

            })
        }
    }else{
        res.status(401).json({
            error:true,
                message:"Not Authorized",
                data:null
        })
    }
}



const authorizeTeacher = ( req, res, next ) => {
    if ( req.headers['authorization'] ) {
        const token = req.headers['authorization'].split( " " )[1]
        const payload = jwt.verify( token, process.env.SECRET_KEY )
        if ( payload.role === 'teacher' ) {
            next()
        } else {
            res.status( 401 ).json( {
                error: true,
                message: 'Not authorized',
                data:null
            })
        }
    } else {
        res.status( 401 ).json( {
            error: true,
            message: 'Not authorized',
            data:null
        })
    }
}
module.exports={
    authorizeStudent,
    authorizeTeacher
}
