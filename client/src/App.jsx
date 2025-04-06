import { useState, useEffect } from "react";  // Import useState and useEffect
import Todo from "./Todo";  // Import the Todo component

export default function App() {
  const [todos, setTodos] = useState([]);  // useState for managing todos
  const [content, setContent] = useState("");  // useState for the content of a new todo

  // Fetch todos on component mount
  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("/api/todos");
      const todos = await res.json();
      setTodos(todos);
    };

    getTodos();
  }, []);  // Empty dependency array means it runs once when the component mounts

  // Handle creating a new todo
  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();
      
      // Reset content and update todos list
      setContent("");
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>
      
      {/* Form for creating new todo */}
      <form className="form" onSubmit={createNewTodo}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Enter a new todo..."
          className="form__input"
          required 
        />
        <button type="submit">Create Todo</button>
      </form>

      {/* Display todos using Todo component */}
      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Todo todo={todo} setTodos={setTodos} key={todo._id} />
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </div>
    </main>
  );
}
