import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import ForgetPassword from "./Components/Forget-Password";
import OTPVerification from "./Components/OTP";
import TodoContext from "./Components/TodoContext";

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [Todos, setTodos] = useState([]);

  const login = (email, password) => {
    // Try to login....

    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert(data.message);
        } else {
          setUser(data);

          // we will store the data in local storage
          localStorage.setItem("userdata", JSON.stringify(data));
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  // EnterOTP and verify email then SetPassword:
  const newOTP = (email, password, otpcode) => {
    // Try to enterOTP....

    fetch("http://localhost:3001/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, otpcode }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert(data.message);
        } else {
          alert(data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  const signup = (name, email, password) => {
    fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          alert("Verify Your Email");
          navigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log("Error", err.message));
  };

  const addTodo = (title, description) => {
    fetch("http://localhost:3001/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert("Error While Adding Todos: " + data.message);
        } else {
          // if added successfully then we will fetch the updated todos
          fetchAllTodos();
        }
      })
      .catch((err) => console.log("Error", err.message));
  };

  const fetchAllTodos = () => {
    // if user doesn't exist then go back
    fetch("http://localhost:3001/todo/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert("Error while fetching Todos: " + data.message);
        } else {
          setTodos(data.todos);
        }
      })
      .catch((err) => console.log("Error", err.message));
  };

  const deleteTodos = (todoId) => {
    // Ask for confirmation to delete or not

    fetch(`http://localhost:3001/todo/delete/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert("Error while Deleting Todo: " + data.message);
        } else {
          // if todos are deleted successfully
          fetchAllTodos();
        }
      })
      .catch((err) => console.log("Error", err.message));
  };

  const markAsComplete = (todoId) => {
    fetch(`http://localhost:3001/todo/markAscomplete/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          alert("Error while Marking Todo as Complete: " + data.message);
        } else {
          // if todos are marked as complete successfully
          fetchAllTodos();
        }
      })
      .catch((err) => console.log("Error", err.message));
  };
  // If user login in first time or reload then check the localstorage if they change
  useEffect(() => {
    if (localStorage.getItem("userdata")) {
      setUser(JSON.parse(localStorage.getItem("userdata")));
      navigate("/home");
    }
  }, []);

  // If they want to Logout

  const Logout = () => {
    localStorage.removeItem("userdata");
    navigate("/");
    setUser(null);
    // console.log("hello");
  };

  useEffect(() => {
    if (user) {
      fetchAllTodos();
    }
  }, [user]);

  return (
    <TodoContext.Provider
      value={{
        login,
        signup,
        user,
        addTodo,
        fetchAllTodos,
        Todos,
        deleteTodos,
        markAsComplete,
        Logout,
        newOTP,
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/OTPVerification" element={<OTPVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </TodoContext.Provider>
  );
}
