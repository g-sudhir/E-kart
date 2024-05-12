import React, { useState } from 'react'
import './CSS/LoginSignup.css';

import tick from '../Components/Assets/tick.png'
import { useAlert } from '../Components/Alerts/Alerts'

const LoginSignup = () => {
  
  const showAlert=useAlert();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  var [otp,setotp]= useState("");
  var [sendStatus,setsendStatus]=useState(false);  
  var [verifiedStatus,setverifiedStatus]=useState(false);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const signup = async () => {
    let responseData ;
    if(formData.username==""){
      showAlert("Name can't be empty","warning");
    }

    else if(formData.email==""){
      showAlert("Email can't be empty","warning");
    }
    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      showAlert("Invalid email address", "warning");
    }
    else if(formData.password==""){
      showAlert("Password can't be empty","warning");
    }
    else if(verifiedStatus==false){
      showAlert("verify the email and continue","warning") ;
    }
   else{
   
     await fetch('http://localhost:4000/signup',{
       method:'POST',
       headers:{
         Accept:'application/form-data',
         'Content-Type':'application/json',
       },
       body:JSON.stringify(formData)
     }).then((res)=>res.json()).then((data)=>responseData=data)
     if(responseData.success){
       localStorage.setItem('auth-token',responseData.token);
       window.location.replace("/");
     }
     else{
       showAlert(responseData.errors,"warning");
     }
   }
  };



  const login = async () => {

    if(formData.email==""){
      showAlert("Email can't be empty","warning");
    }
    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      showAlert("Invalid email address", "warning");
    }
    else if(formData.password==""){
      showAlert("Password can't be empty","warning");
    }
    else{

      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const responseData = await response.json();
        console.log(responseData)
        if (responseData.admin) {
          alert(responseData.token)
          const adminPortalUrl = "http://localhost:5173/?token=" + encodeURIComponent(responseData.token);
          window.location.replace(adminPortalUrl);
        } else {
          if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            showAlert("Loginsucess","success")
            window.location.replace("/");
          } else {
            showAlert("Invalid username or password","error")
            
          }
        }
      } catch (error) {
        showAlert("Invalid username or password","error")
        console.error('Error during login:', error);
        // Handle error here
      }
    }
  };

  const sendOtp = async () => {
    if(formData.email==""){
      showAlert("Enter email and continue","error");
      return;
    }
    try {
        const response = await fetch('http://localhost:4000/sendotp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email })
        });

        if (response.status === 200) {
          showAlert("OTP send succesfully","success")
          setsendStatus(true);
        } else {
            console.error('Failed to send OTP');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};


  const validateOtp=  async ()=>{
    if(!otp){
      showAlert("Otp cant be emptied","error")
    }
    else{
      try {
        const response = await fetch('http://localhost:4000/validateotp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp:otp })
        });

        if (response.status === 200) {
          setverifiedStatus(true);
          showAlert("Otp is verified","success")
        } else {
            showAlert("Otp is invalid","error")
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
    }
 }





  if(state=="forget"){
       return(
        <>
           <div className='loginsignup'>
        <div className="loginsignup-container">
        {
            state==="verify"?(<div className='otp-verification'>
                <input
                  name="username"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  type="text"
                  placeholder='Your Name'
              />
             <button onClick={() => validateOtp()}>{verifiedStatus === false ? <>get Otp</> : <>Verify</>}</button>


            </div>):(<></>)
          }
        </div>
        </div>
        </>
       )
  }else{

    return (
      
      <div className='loginsignup'>
        
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Sign up" ? (
              <input
                name="username"
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder='Your Name'
              />
            ) : (
              <></>
            )}
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}  
              type="email"
              placeholder='Email Address'
            />
           {
            state==="Sign up"?(<div className='otp-verification'>
                <input
                  name="otp"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  type="text"
                  placeholder='OTP'
              />
            {verifiedStatus ? <img src={tick} style={{width:"30px",height:"30px",margin:"0px 20px"}} alt="tick"></img> : (
                  sendStatus === false ? <button onClick={() => sendOtp()}>get otp</button> : <button onClick={() => validateOtp()}>verify</button>
              )}


            </div>):(<></>)
          }
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder='Password'
            />
          </div>
          <button onClick={() => (state === "Login" ? login() : signup())}>
            Continue
          </button>
          {state === "Sign up" ? (
            <p className="loginsignup-login" onClick={() => setState("Login")}>
              Already have an account? <span className='clickhere'>Login here</span>
            </p>
          ) : (
            <p className="loginsignup-login" onClick={() => setState("Sign up")}>
              Create an account? <span className='clickhere'>Click here</span>
            </p>
          )}
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginSignup;


