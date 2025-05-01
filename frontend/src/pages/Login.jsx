// // import React, { useContext, useEffect, useState } from 'react'
// // import { ShopContext } from '../context/ShopContext';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// // const Login = () => {

// //   const [currentState, setCurrentState] = useState('Login');
// //   const { token, setToken, navigate, backendURL, backendUrl} = useContext(ShopContext)

// //   const [name, setName]= useState('')
// //   const [password, setPassword]= useState('')
// //   const [email, setEmail]= useState('')

// //   const onSubmitHandler = async (event) => {

// //     event.preventDefault();

// //     try {

// //        if (currentState==='Sign up') {

// //         const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
// //         if (response.data.success) {
// //           setToken(response.data.token)
// //           localStorage.setItem('token',response.data.token);
// //         }else{
// //           toast.error(response.data.message)
// //         }


// //        } else{

// //         const response = await axios.post(backendUrl + '/api/user/login', {email, password})
// //         if (response.data.success) {
// //           setToken(response.data.token)
// //           localStorage.setItem('token',response.data.token);
// //         }else{
// //           toast.error(response.data.message)
// //         }


// //        }

// //     } catch (error) {
// //       console.log(error);
// //       toast.error(error.message)

// //     }
// //   }



// // useEffect(()=>{

// //   if (token) {

// //     navigate('/')

// //   }

// // },[token])

// //   return (
// //     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-900'>
// //       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
// //         <p className='prata-regular text-3xl'>{currentState}</p>
// //         <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
// //       </div>
// //       {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border border-gray-800' placeholder='Name' required />}
// //       <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border border-gray-800' placeholder='Email' required />
// //       <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border border-gray-800' placeholder='Password' required />
// //       <div className='w-full flex justify-between text-sm mt-[-8px]'>
// //         {/* <p className='cursor-pointer'>Forgot your passoword</p> */}
// //         {
// //           currentState === 'Login'
// //             ? <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
// //             : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
// //         }

// //       </div>
// //       <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

// //     </form>
// //   )
// // }

// // export default Login

// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [currentState, setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

//   // const onSubmitHandler = async (event) => {
//   //   event.preventDefault();

//   //   try {
//   //     if (currentState === 'Sign up') {
//   //       const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
//   //       if (response.data.success) {
//   //         setToken(response.data.token);
//   //         localStorage.setItem('token', response.data.token);
//   //         localStorage.setItem('userId', response.data.userId); // Save userId
//   //       } else {
//   //         toast.error(response.data.message);
//   //       }
//   //     } else {
//   //       const response = await axios.post(backendUrl + '/api/user/login', { email, password });
//   //       if (response.data.success) {
//   //         setToken(response.data.token);
//   //         localStorage.setItem('token', response.data.token);
//   //         localStorage.setItem('userId', response.data.userId); // Save userId
//   //       } else {
//   //         toast.error(response.data.message);
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error(error.message);
//   //   }
//   // };
//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if (currentState === 'Sign up') {
//         const response = await axios.post(backendUrl + '/api/user/register', {
//           name,
//           email,
//           password,
//         });
//         console.log("Register response:", response.data);

//         // if (response.data.success && response.data.verificationRequired) {
//         //   const enteredCode = prompt("A verification code was sent to your email. Please enter it:");

//         //   if (enteredCode) {
//         //     const verifyResponse = await axios.post(backendUrl + '/api/user/verify', {
//         //       email,
//         //       code: enteredCode,
//         //     });

//         //     if (verifyResponse.data.success) {
//         //       setToken(verifyResponse.data.token);
//         //       localStorage.setItem('token', verifyResponse.data.token);
//         //       localStorage.setItem('userId', verifyResponse.data.userId);
//         //       toast.success("Verification successful!");
//         //     } else {
//         //       toast.error(verifyResponse.data.message || "Verification failed");
//         //     }
//         //   }
//         // } else if (response.data.success) {
//         //   // No verification required
//         //   setToken(response.data.token);
//         //   localStorage.setItem('token', response.data.token);
//         //   localStorage.setItem('userId', response.data.userId);
//         // } else {
//         //   toast.error(response.data.message);
//         // }
//         if (response.data.success && response.data.verificationRequired) {
//           const enteredCode = prompt("A verification code was sent to your email. Please enter it:");

//           if (enteredCode) {
//             const verifyResponse = await axios.post(backendUrl + '/api/user/verify', {
//               email,
//               code: enteredCode,
//             });

//             if (verifyResponse.data.success) {
//               setToken(verifyResponse.data.token);
//               localStorage.setItem('token', verifyResponse.data.token);
//               localStorage.setItem('userId', verifyResponse.data.userId);
//               toast.success("Verification successful!");
//               navigate('/');
//             } else {
//               toast.error(verifyResponse.data.message || "Verification failed");
//             }
//           } else {
//             toast.error("Verification code is required.");
//           }
//           return; // stop further execution
//         }

//       } else {
//         // Login flow
//         const response = await axios.post(backendUrl + '/api/user/login', {
//           email,
//           password,
//         });

//         if (response.data.success) {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           localStorage.setItem('userId', response.data.userId);
//         } else {
//           toast.error(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };


//   // useEffect(() => {
//   //   if (token) {
//   //     navigate('/');
//   //   }
//   // }, [token]);
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken && storedToken !== 'undefined') {
//       try {
//         const decoded = jwt_decode(storedToken); // use jwt-decode
//         if (decoded && decoded.id) {
//           setToken(storedToken);
//           navigate('/');
//         }
//       } catch (err) {
//         localStorage.removeItem('token'); // clear bad token
//         setToken(null);
//       }
//     }
//   }, []);

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-900'>
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
//       </div>
//       {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border border-gray-800' placeholder='Name' required />}
//       <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border border-gray-800' placeholder='Email' required />
//       <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border border-gray-800' placeholder='Password' required />
//       <div className='w-full flex justify-between text-sm mt-[-8px]'>
//         {
//           currentState === 'Login'
//             ? <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
//             : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
//         }
//       </div>
//       <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
//     </form>
//   );
// };

// export default Login;


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);


  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // to track new user creation
  //very much working onsubmit handler
  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();

  //   try {
  //     if (currentState === 'Sign up') {
  //       if (showVerification) {
  //         // Step 2: Send verification code
  //         const verifyResponse = await axios.post(backendUrl + '/api/user/verify', {
  //           email,
  //           code: verificationCode,
  //         });

  //         if (verifyResponse.data.success) {
  //           setToken(verifyResponse.data.token);
  //           localStorage.setItem('token', verifyResponse.data.token);
  //           localStorage.setItem('userId', verifyResponse.data.userId);
  //           toast.success("Verification successful!");
  //           navigate('/');
  //         } else {
  //           toast.error(verifyResponse.data.message || "Verification failed");
  //         }
  //       } else {
  //         // Step 1: Register user (send code)
  //         const response = await axios.post(backendUrl + '/api/user/register', {
  //           name,
  //           email,
  //           password,
  //         });

  //         console.log("Register response:", response.data);

  //         if (response.data.success && response.data.verificationRequired) {
  //           toast.success("Verification code sent to your email");
  //           setShowVerification(true);
  //           setIsRegistering(true);
  //         } else {
  //           toast.error(response.data.message || "Registration failed");
  //         }
  //       }
  //     } else {
  //       // Login flow
  //       const response = await axios.post(backendUrl + '/api/user/login', {
  //         email,
  //         password,
  //       });

  //       if (response.data.success) {
  //         setToken(response.data.token);
  //         localStorage.setItem('token', response.data.token);
  //         localStorage.setItem('userId', response.data.userId);
  //         navigate('/');
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.message);
  //   }
  // };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log({ email, code: resetCode, newPassword });

    try {
      if (isForgotPassword) {
        if (!resetEmailSent) {
          // Step 1: Request reset code
          const response = await axios.post(backendUrl + '/api/user/request-reset', { email });
          if (response.data.success) {
            toast.success("Reset code sent to your email");
            setResetEmailSent(true);
          } else {
            toast.error(response.data.message);
          }
        } else {
          // Step 2: Verify code and reset password
          const response = await axios.post(backendUrl + '/api/user/reset-password', {
            email,
            code: resetCode,
            newPassword
          });

          if (response.data.success) {
            toast.success("Password reset successful. Please login.");
            setIsForgotPassword(false);
            setCurrentState('Login');
            setResetEmailSent(false);
            setResetCode('');
            setNewPassword('');
          } else {
            toast.error(response.data.message);
          }
        }
      }
      else if (currentState === 'Sign up') {
        if (showVerification) {
          const verifyResponse = await axios.post(backendUrl + '/api/user/verify', { email, code: verificationCode });

          if (verifyResponse.data.success) {
            setToken(verifyResponse.data.token);
            localStorage.setItem('token', verifyResponse.data.token);
            localStorage.setItem('userId', verifyResponse.data.userId);
            toast.success("Verification successful!");
            navigate('/');
          } else {
            toast.error(verifyResponse.data.message || "Verification failed");
          }
        } else {
          const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
          if (response.data.success && response.data.verificationRequired) {
            toast.success("Verification code sent to your email");
            setShowVerification(true);
            setIsRegistering(true);
          } else {
            toast.error(response.data.message || "Registration failed");
          }
        }
      }
      else {
        // Login flow
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedToken !== 'undefined') {
      try {
        const decoded = jwt_decode(storedToken);
        if (decoded?.id) {
          setToken(storedToken);
          navigate('/');
        }
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-900'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* {currentState === 'Sign up' && !showVerification && (
        <>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
        </>
      )} */}
      {!isForgotPassword && currentState === 'Sign up' && !showVerification && (
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />

      {!isForgotPassword && (
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          required
        />
      )}

      {showVerification && !isForgotPassword && (
        <input
          onChange={(e) => setVerificationCode(e.target.value)}
          value={verificationCode}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Verification Code'
          required
        />
      )}

      {isForgotPassword && resetEmailSent && (
        <>
          <input
            onChange={(e) => setResetCode(e.target.value)}
            value={resetCode}
            type="text"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Reset Code'
            required
          />
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='New Password'
            required
          />
        </>
      )}


      {/* <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required /> */}
      {/* <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required /> */}

      {/* {showVerification && (
        <input onChange={(e) => setVerificationCode(e.target.value)} value={verificationCode} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Verification Code' required />
      )} */}

      {/* <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => { setCurrentState('Login'); setShowVerification(false); }} className='cursor-pointer'>Login Here</p>
        }
      </div> */}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {isForgotPassword ? (
          <p onClick={() => { setIsForgotPassword(false); setCurrentState('Login'); }} className='cursor-pointer'>Back to Login</p>
        ) : (
          <>
            {currentState === 'Login' ? (
              <>
                <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
                <p onClick={() => { setIsForgotPassword(true); }} className='cursor-pointer'>Forgot Password?</p>
              </>
            ) : (
              <p onClick={() => { setCurrentState('Login'); setShowVerification(false); }} className='cursor-pointer'>Login Here</p>
            )}
          </>
        )}
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {/* {
          currentState === 'Login'
            ? 'Sign In'
            : showVerification
              ? 'Verify Account'
              : 'Sign Up'
        } */}
        {
          isForgotPassword
            ? resetEmailSent
              ? 'Reset Password'
              : 'Send Reset Code'
            : currentState === 'Login'
              ? 'Sign In'
              : showVerification
                ? 'Verify Account'
                : 'Sign Up'
        }

      </button>
    </form>
  );
};

export default Login;
