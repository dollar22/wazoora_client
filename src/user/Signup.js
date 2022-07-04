import React, { useState } from "react";
import Base from "../core/Base";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../auth/helper/index";
import axios from "axios";
import { API } from "./backend";
import { toast, ToastContainer } from "react-toastify";
// import { ToastContainer, toast } from 'react-toastify';

// import axios from 'axios';
const Signup = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setuserData] = useState({})
  const [showSuccess, setShw] = useState({})
  const history = useHistory()
  const Notify = () => {
    toast.success("Verified Successfully")
  }
  // const Myfetch = async (data) => { 
  //   fetch(
  //     `${API}getToken/${data.previousToken}/${data.fullName}`,{
  //         token:data.previousToken,
  //         name:data.fullName
  //     })
  //                 .then(async  res=>  await res.json())
  //                 .then((json) => {
  //                   console.log(json)
  //               toast("Token Generated");
  //                 })


  //  }
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    previousToken: "",
    adharNumber: "",
    bankAccountNumber: "",
    ifsc_code: "",
    error: "",
    success: false,
  });

  const [otp, setOtp] = useState({
    otpvalue: "",
    error: false
  })

  const { otpvalue } = otp;

  const {
    fullName,
    email,
    phoneNumber,
    password,
    previousToken,
    adharNumber,
    bankAccountNumber,
    ifsc_code,
    error,
    success,
  } = values;




  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({
      fullName,
      email,
      phoneNumber,
      password,
      previousToken,
      adharNumber,
      bankAccountNumber,
      ifsc_code,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setuserData(data)
          console.log(data)
          setShowOtp(true)
          setValues({
            ...values,
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            previousToken: "",
            adharNumber: "",
            bankAccountNumber: "",
            ifsc_code: "",
            error: "",
            success: true,
          });
          //  Myfetch(values)

        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Full Name <span className="text-danger">*</span></label>
              <input
                className="form-control"
                onChange={handleChange("fullName")}
                placeholder="Enter Name"
                type="text"
                value={fullName}
              />
              {/* <span style={styles.error}>
        { errors.username }
      </span> */}
            </div>
            <div className="form-group">
              <label className="text-light">Email<span className="text-danger">*</span></label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                placeholder="Enter Email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Phone Number <span className="text-danger">*</span></label>
              <input
                onChange={handleChange("phoneNumber")}
                className="form-control"
                placeholder="Enter Phone Number"
                type="number"
                value={phoneNumber}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password <span className="text-danger">*</span></label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                placeholder="Enter password"
                value={password}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Previous Token <span className="text-danger">*</span></label>
              <input
                onChange={handleChange("previousToken")}
                className="form-control"
                type="text"
                placeholder="Enter Previous Token"
                value={previousToken}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Aadhar Number <span className="text-danger">*</span></label>
              <input
                onChange={handleChange("adharNumber")}
                className="form-control"
                type="number"
                placeholder="Enter Aadhar Number"
                value={adharNumber}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Bank Account Number <span className="text-danger">*</span></label>
              <input
                onChange={handleChange("bankAccountNumber")}
                className="form-control"
                type="text"
                value={bankAccountNumber}
                placeholder="Enter Bank Account"
              />
            </div>

            <div className="form-group">
              <label className="text-light">IFSC <span className="text-danger">*</span></label>
              <input
                onChange={handleChange("ifsc_code")}
                className="form-control"
                type="text"
                value={ifsc_code}
                placeholder="Enter IFSC Code"
              />
            </div>

            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully.
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };


  const FormReset = () => {
    const OtpSubmit = (event) => {
      event.preventDefault()
      console.log(userData)

      let userdata = localStorage.getItem('jwt')
      for (var i = 0; i < 2; i++) {
        const otpres = axios.post(`${API}verify`, {
          otp: otp.otpvalue,
          userId: userData._id
        })
        console.log(otpres.success)
        if (otpres.success) {
          Notify()
          setShw(true)
          history.push('/signin')
        }
      }

    }


    const otpChange = (name) => (event) => {
      console.log(event)
      setOtp({
        ...otp, error: false, [name]: event.target.value
      })
    }

    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">OTP</label>
              <input
                onChange={otpChange("otpvalue")}
                value={otpvalue}
                className="form-control"
                type="password"
                placeholder="Enter OTP"
                autocomplete="false"
              />
            </div>
            <button onClick={OtpSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleChange = (name) => (event) => {

    setValues({ ...values, error: false, [name]: event.target.value });
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {showSuccess && successMessage()}
      {errorMessage()}
      {!showOtp && signUpForm()}
      {showOtp && FormReset()}
      <ToastContainer />
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};




















export default Signup;
