// route fr user login
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";
import validator from "validator";
import sendVerificationEmail from "../utils/endVerificationEmail.js";

const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// const loginUser= async (req,res)=>{
// try {
//     const {email,password}=req.body;

//     const user= await userModel.findOne({email});

//     if (!user) {
//         return res.json({success: false, message:"user doesnot exissts"})  

//     }
//     const isMatch=await bcrypt.compare(password,user.password);

//     if (isMatch) {
//         const token= createToken(user._id)
//         res.json({success:true, token})
//     }
//     else{
//         res.json({success:false, message:"invalid credentails"})
//     }
// } catch (error) {
//     console.log(error);
//     res.json({success:false, message:error.message})
    
// }

// }

const loginUser  = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User  does not exist" });
        }
        if (!user.isVerified) {
            return res.json({ success: false, message: "Acccount Not Verified" });
          }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token, userId: user._id }); // Include userId in the response
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// route for user registration
//  const registerUser= async(req,res)=>{
//  try{
//     const {name,email, password}=req.body;
//     //check user alreadey exissts or not
//     const exists= await userModel.findOne({email});
//     if (exists) {
//         return res.json({success: false, message:"user already exissts"})  
//     }

//     // validating email format and strong password
//     if (!validator.isEmail(email)) {
//         return res.json({success: false, message:"enter valid email"})  

//     }
//     if (password.length<3) {
//         return res.json({success: false, message:"enter strong password"})  

//     }

//     //hashing password
//     const salt= await bcrypt.genSalt(10)
//       const hashedPassword = await bcrypt.hash(password,salt)

//       const newUser= new userModel({
//         name,
//         email,
//         password: hashedPassword
//       })

//       const user=await newUser.save()
//       const token = createToken(user._id)

//       res.json({success: true, token})

//  } catch(error){
//     console.log(error);
//     res.json({success:false, message:error.message})
    

//  }
//  }


//original register user
// const registerUser  = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if user already exists
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User  already exists" });
//         }

//         // Validate email format and strong password
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Enter a valid email" });
//         }
//         if (password.length < 3) {
//             return res.json({ success: false, message: "Enter a strong password" });
//         }

//         // Hashing password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser  = new userModel({
//             name,
//             email,
//             password: hashedPassword
//         });

//         const user = await newUser .save();
//         const token = createToken(user._id);

//         res.json({ success: true, token, userId: user._id }); // Include userId in the response
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

/////////////////////
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 3) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      isVerified: false
    });

    const savedUser = await newUser.save();

    await sendVerificationEmail(email, verificationCode);

    return res.status(200).json({
      success: true,
      message: "Verification code sent to email",
      userId: savedUser._id,
      verificationRequired: true // 👈 This makes the frontend show the OTP input
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// const verifyUser = async (req, res) => {
//   try {
//     const { email, code } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     if (user.verificationCode !== code) {
//       return res.status(400).json({ success: false, message: "Invalid verification code" });
//     }

//     user.isVerified = true;
//     user.verificationCode = undefined; // optional: remove the code after success
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     res.status(200).json({
//       success: true,
//       message: "Account verified successfully",
//       token,
//       userId: user._id
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const verifyUser = async (req, res) => {
  try {
    const { email, code } = req.body;
    console.log("Received:", email, code); // 👈 check what’s coming

    if (!email || !code) {
      return res.status(400).json({ success: false, message: "Email and code are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("Found user:", user);

    if (user.verificationCode !== code) {
      return res.status(400).json({ success: false, message: "Invalid verification code" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
      token,
      userId: user._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

  const verifyEmail = async (req, res) => {
    const { userId, code } = req.body;
  
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });
  
    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = undefined;
      await user.save();
      const token = createToken(user._id);
      res.json({ success: true, message: "Email verified successfully", token, userId: user._id });
    } else {
      res.json({ success: false, message: "Invalid verification code" });
    }
  };
  
 // route fr admin login
 const adminLogin=async(req,res)=>{


    try {
        const {email,password}=req.body


        if (email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"invalid credentials"})
        }
    } catch (error) {
        console.log(error);
    res.json({success:false, message:error.message})
    
    }

 }
// SEND Reset Password Code
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = resetCode;
    await user.save();

    // Send email (reuse your sendVerificationEmail)
    await sendVerificationEmail(email, resetCode);

    res.status(200).json({ success: true, message: "Password reset code sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// VERIFY Reset Code and Update Password
const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ success: false, message: "Invalid reset code" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.verificationCode = undefined; // Clear the code
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, verifyEmail, verifyUser, requestPasswordReset, resetPassword, deleteAccount };

//  export {loginUser, registerUser, adminLogin, verifyEmail,verifyUser}