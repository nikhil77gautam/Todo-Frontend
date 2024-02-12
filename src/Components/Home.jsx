import React, { useState } from "react";
import { useEffect, useContext } from "react";
import TodoContext from "./TodoContext";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoItem";
import "./Home.css";

export default function Home() {
  const { user, addTodo, fetchAllTodos, Todos, Logout } =
    useContext(TodoContext);
  const navigate = useNavigate();

  // if the components is loading first time

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchAllTodos();
    }
  }, []);

  const [Title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    addTodo(Title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="container-home">
      <div>
        <h1>
          <i style={{ fontFamily: "Serif" }}> Welcome {user && user.name} </i>
        </h1>
        <br />
        <button onClick={Logout}>
          <b>
            <i style={{ fontFamily: "Serif" }}>Logout</i>
          </b>
        </button>
      </div>
      <br />

      <div className="container-4">
        {/* <div>
          <h3>
            <b><i style={{fontFamily: "Serif"}}>Add Todo</i></b>
          </h3>
        </div> */}
        <div className="input-title">
          <input
            style={{ fontFamily: "Serif" }}
            value={Title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            type="text"
            placeholder="Your Title"
          />
          <br />

          <textarea
            style={{ fontFamily: "Serif" }}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Write Your Description"
          ></textarea>
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              addTodo(Title, description);
              setTitle("");
              setDescription("");
            }}
          >
            {" "}
            <b>
              <i style={{ fontFamily: "Serif" }}>Add Your Notes</i>
            </b>{" "}
          </button>
        </div>{" "}
      </div>
      <div className="get" style={{ fontFamily: "Serif" }}>
        {Todos.map((item, index) => (
          <TodoItem
            id={item._id}
            title={item.title}
            description={item.description}
            completed={item.completed}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
