import React from "react";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import Base from "../core/Base";
import { API } from "./backend";
// import { Link, Redirect } from "react-router-dom";
// import axios from "axios";
// import { auth } from "../App";
// // import firebase from 'firebase'
// import { signin, authenticate, isAutheticated } from "../auth/helper";
// import { ToastContainer } from "react-toastify";



export const ResetPassword = () =>{
//  let userdata = JSON.parse(localStorage.getItem('jwt'));
 const [viewOtpForm, setViewOtpForm] = useState(false);
 const [otp,setotp] = useState('');
 const history = useHistory()

 useEffect(() => {
}, []);
  const [values,setValues] = useState({
   email:"",
   password:'',
   loading:false,
   error:false
  });
  const { email, password } = values;



 const onSubmit = (event) => {
    event.preventDefault();
    setViewOtpForm(true)
     console.log(values.email)
 localStorage.setItem('email',JSON.stringify(values.email))
     fetch(`${API}/forget`, {
      method: "POST",
      body: JSON.stringify({email}),
       
      // Adding headers to the request
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  }).then(response =>response.json().then((json)=>{
     if(json.status === 200 ){
    console.log(json.status)
     }
     else{
  
     }
  })
  )
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
   
  const handleOtp = (name) => (event) =>{
  setotp({...otp,[name]:event.target.value})   
  }

  const otpSubmit = (event) =>{
  event.preventDefault();
 let formdata ={
  otp:values.password
 }
  fetch(`${API}/forgetverify`, {
    method: "POST",
    body: JSON.stringify(formdata),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then(response =>response.json().then((json)=>{
   if(json.status === 200 ){
  history.push('/newpass')
   }
   else{

   }
})
)
  }


  const FormReset = () =>{
    return (
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                placeholder="Enter Email"
                className="form-control"
                type="text "
              />
            </div>

         
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }


  const OtpForm = ()=>{
    return (
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <form>
        <div className="form-group">
      <label className="text-light">OTP</label>
      <input
        onChange={handleChange("password")}
        value={password}
        className="form-control"
        type="password"
        placeholder="Enter OTP"
      
      />
    </div> 

       
          <button onClick={otpSubmit} className="btn btn-success btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  }
 return (
  <Base title="Verification Page" description="Verify Your Id" >
      { !viewOtpForm && FormReset()}
      { viewOtpForm && OtpForm()}
  </Base>
 );
}


