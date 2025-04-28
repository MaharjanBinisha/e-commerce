import jwt from 'jsonwebtoken'

const authUser= async (req,res, next)=>{

        // const{token}=req.headers;
        const token = req.headers['token'] || req.headers['authorization'];

        if (!token) {
            return res.json({success:false, message:'Not authorized login again'})
        }
        try {
            
            const token_decode= jwt.verify(token, process.env.JWT_SECRET)
            req.body.userId= token_decode.id
            next()
        } catch (error) {
            console.log(error);
            res.json({success:false, message:error.message})
            
        }
    }
    
    













    

// }
// const authUser = async (req, res, next) => {
//     const { token } = req.headers;

//     console.log("Received Token:", token); //  Check if the token is coming in the request

//     if (!token) {
//         return res.json({ success: false, message: "Not authorized login again" });
//     }

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", token_decode); //  Check the decoded token

//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log("JWT Error:", error.message); // Log the error
//         res.json({ success: false, message: "Invalid token, please log in again" });
//     }
// };


// const authUser= async (req,res, next)=>{

//     const { token } = req.headers;

//     if (!token) {
//         return res.json({ success: false, message: 'Not authorized, login again' });
//     }
//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { id: token_decode.id }; //  Store userId in req.user
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };
export default authUser;



