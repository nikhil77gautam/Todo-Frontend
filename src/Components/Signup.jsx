import { useState, useContext } from "react";
import TodoContext from "./TodoContext";
import { Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useContext(TodoContext);
  return (
    <div className=" Main-container-signup">
      <div className="container-2">
        <div className="header-2">
          <div className="text-2" style={{ fontFamily: "Serif" }}>
            {" "}
            Signup Now
          </div>
          <br />
          <div className="underline-2"></div>
        </div>
        <div>
          <input
            style={{ fontFamily: "Serif" }}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter Name"
            type="text"
          />
          <br></br>
          <input
            style={{ fontFamily: "Serif" }}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter Email"
            type="Email"
          />
          <br></br>
          <input
            style={{ fontFamily: "Serif" }}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Enter Password"
            type="Password"
          />
        </div>
        <br></br>
        <div>
          <button
            onClick={() => {
              signup(name, email, password);
            }}
            style={{ fontFamily: "Serif" }}
          >
            {" "}
            Signup{" "}
          </button>
        </div>
        <br />
        <div>
          <Link to="/">
            <b style={{ fontFamily: "Serif" }}>Already have account, Login ?</b>
          </Link>
        </div>
      </div>
    </div>
  );
}
