import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Forget-Password.css";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();


  const forgetPassword = () => {
    fetch(`http://localhost:3001/auth/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert(data.message);
        } else {
          // if todo is deleted successfully
          alert(data.message);
          Navigate("/OTPVerification");
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };

  return (
    <div className="password-main-container">
      <div className="password-recovery-container">
        <h3 className="password-recovery-title" style={{ color: "hsl(0, 100%, 0%)" }}>
          <b>Forgot Your Password</b>
        </h3>

        <p className="password-recovery-description">
          <b style={{ color: "black" }}>
            Enter email associated with your account :
          </b>
        </p>
        <input
          style={{ fontFamily: "Serif" }}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="password-recovery-input"
          placeholder="Enter Your Email"
          type="email"
        />
        <button onClick={forgetPassword} className="password-recovery-button">
          <b> Forgot Password</b>
        </button>
        <br />
        <Link to="/" className="back-to-login-link">
          <b style={{ fontFamily: "arsia" }}>Back to Login</b>
        </Link>
      </div>
    </div>
  );
}
