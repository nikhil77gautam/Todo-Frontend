import React, { useState, useContext } from "react";
import TodoContext from "./TodoContext";
import "./OTP.css";

export default function OTPVerification() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpcode, setOtpcode] = useState("");

  // newOTP function
  const { newOTP } = useContext(TodoContext);

  const handleVerifyOTP = () => {
    // Call the newOTP function with email and password
    newOTP(email, password, otpcode);
  };

  return (
    <div className="main-container">
      <div className="main-container1">
        <h2>
          <i style={{ fontFamily: "Serif", color: "darkgray" }}>
            Set Your New Password :
          </i>
        </h2>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={{ fontFamily: "Serif" }}
          type="password"
          placeholder="Enter Your New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          style={{ fontFamily: "Serif" }}
          type="text"
          placeholder="Enter Your OTP Here"
          value={otpcode}
          onChange={(e) => setOtpcode(e.target.value)}
        />
        <div className="container-button">
          <button onClick={handleVerifyOTP} style={{ fontFamily: "Serif" }}>
            <b>Verify OTP</b>
          </button>
        </div>
      </div>
    </div>
  );
}
