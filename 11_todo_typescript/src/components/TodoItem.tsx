import React from "react";
import { todo } from "../models/todo";

// type coming from parent
type PropsType = {
  task: todo;
  deleteTask(nameToDelete: string) : void;
};

function TodoItem({ task, deleteTask }: PropsType) {
  return (
    <div>
      <div>
        <p>{task.taskName}</p>
        <p>{task.days}</p>

     
        <button onClick={() => deleteTask(task.taskName)}>delete</button>

      </div>
    </div>
  );
}

export default TodoItem;
