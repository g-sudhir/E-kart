import React, { useState } from 'react'
import './CSS/LoginSignup.css';

// ... (previous code)

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const signup = async () => {
    let responseData ;
    await fetch('https://e-kart-z1nv.onrender.com/signup',{
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
      alert(responseData.errors);
    }
  };



  const login = async () => {
    try {
      const response = await fetch('https://e-kart-z1nv.onrender.com/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const responseData = await response.json();
  
      if (responseData.admin) {
        window.location.replace("https://662d4ba4fd5752170a4ec3de--sunny-sopapillas-b2cdf2.netlify.app/");
      } else {
        if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace("/");
        } else {
          alert(responseData.errors);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error here
    }
  };
  


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
            Already have an account? <span>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login" onClick={() => setState("Sign up")}>
            Create an account? <span>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;


