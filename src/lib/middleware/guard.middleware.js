import {decodeToken} from "@moonlay/src/lib/utils/jwt-token";

export const Guard = async (req,res,next)=> {
    try{
        if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
            const token = req.headers.authorization.split(" ")[1]
            let decode = decodeToken(token)
            req.user = decode
            next()
        }
        next()

        // return res.status(401).json({
        //     error:true,
        //     message: 'unAuthorization'
        // })
    }catch(err){
        next(err)
    }
}