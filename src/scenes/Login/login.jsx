import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth.js";
import { ToastContainer, toast } from "react-toastify";
import { addLogin } from "../../state/api.js";
import "./styles.css";

const Login = () => {
  const {auth, setAuth} = useAuth()
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    role:"admin",
  });
  const { email, password,role } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e, req, res) => {
    e.preventDefault();
    try {
        const {data} = await addLogin(inputValue);
      console.log(inputValue);
      const { success, message } = data;
      if (success) {
        
        // localStorage.setItem('jwt', data.auth_token)
        // localStorage.setItem('user', JSON.stringify(data))
        // handleSuccess(message);
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/');
          } else if (role === 'superadmin') {
            navigate('/MGdashboard');
          }
        }, 1000);
        setAuth({"role":`${role}`, "email":`${email}`});

      } else {
        console.log("err");
        alert("Authentication Failed ");
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      role:"",

    });
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
      <div>
      <label htmlFor="po">Role</label>
          <select type="select" name="role" id="role" onChange={handleOnChange}>
            <option value="admin">Admin</option>
            <option value="superadmin">Manager</option>
          </select>
      </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
