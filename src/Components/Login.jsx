import { useContext } from "react";
import { useState } from "react";
import TodoContext from "./TodoContext";
import { Link } from "react-router-dom";
import "./Login.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className=" Main-container-login">
      <div className="container">
        <div className="header">
          <div className="text" style={{ fontFamily: "Serif" }}>
            {" "}
            Login Now
          </div>
          <br />
          <div className="underline"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            {" "}
            <input
              style={{ fontFamily: "Serif" }}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Enter Email"
              type="email"
            />
            <br />
            <input
              style={{ fontFamily: "Serif" }}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Enter Password"
              type="password"
            />
          </div>{" "}
          <div>
            <button type="submit">
              {" "}
              <b style={{ fontFamily: "Serif" }}>Login</b>
            </button>{" "}
          </div>
          <br />
          <div>
            <Link to="/Forget-password">
              <b
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                  color: "#0056b3",
                  fontFamily: "Serif",
                }}
              >
                Forget Password
              </b>
            </Link>
            <br />
            <Link to="/signup">
              <b style={{ fontFamily: "Serif" }}>
                Don't have an account? Register
              </b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
