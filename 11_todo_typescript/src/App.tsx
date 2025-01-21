import React, { ChangeEvent, FC } from "react";
import "./App.css";
import { useState } from "react";
import { todo } from "./models/todo";
import TodoItem from "./components/TodoItem";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [days, setDays] = useState<number>(0);
  const [todoList, setTodoList] = useState<todo[]>([]);

  console.log(todoList);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDays(Number(event.target.value));
    }
  };

  const addTask = () => {
    // create a new todo object
    const newTodo = { taskName: task, days: days };
    // add the new todo to the list
    setTodoList([...todoList, newTodo]);

    setTask(""); // clear the input
    setDays(0); // clear the input
  };

  const deleteTask = (nameToDelete: string) : void => {
    setTodoList(todoList.filter((task: todo) => {
    return task.taskName !== nameToDelete 
    }));
  }

  return (
    <div className="App">
      <div> 
        <input
          type="text"
          value={task}
          name="task"
          placeholder="Add a task..."
          onChange={handleChange}
        />

        <input
          type="number"
          value={days}
          name="days"
          placeholder="How many days?"
          onChange={handleChange}
        />

        <button onClick={addTask}>Add a New Task</button>
      </div>
      <div>
        {todoList.map((task: todo, index:number) => {
          return <TodoItem  key={index} task={task} deleteTask={deleteTask}/>;
        })}
      </div>
    </div>
  );
};

export default App;
