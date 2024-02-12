import React, { useContext } from "react";
import TodoContext from "./TodoContext";

export default function TodoItem({ title, description, completed, id }) {
  const { deleteTodos, markAsComplete } = useContext(TodoContext);

  return (
    <div  className="get-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p style={{fontFamily: "Serif"}}>Status: {completed == true ? "Completed" : "Pending"}</p>
      <button
        onClick={() => {
          deleteTodos(id);
        }}
      >
       <b style={{fontFamily: "Serif"}}> Delete</b>
      </button>{" "}
      {completed == false ? (
        <button
          onClick={() => {
            markAsComplete(id);
          }}
        >
          <b style={{fontFamily: "Serif"}}>Mark as Complete</b>
        </button>
      ) : null}
    </div>
  );
}
