export default function Todo(props) {
    // Define the updateTodo function inside Todo component
    const updateTodo = async (todoId, todoStatus) => {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",  // Using PUT to update the entire resource
        body: JSON.stringify({ status: !todoStatus }),  // Toggle the status
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const json = await res.json();
  
      if (json.acknowledged) {
        // Update the todos list in state if the update was successful
        props.setTodos(currentTodos => {
          return currentTodos.map((currentTodo) => {
            if (currentTodo._id === todoId) {
              return { ...currentTodo, status: !currentTodo.status }; // Toggle status
            }
            return currentTodo;  // Return the rest of the todos unchanged
          });
        });
      }
    };
  
    // Define the deleteTodo function inside the Todo component
    const deleteTodo = async (todoId) => {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",  // Using DELETE method to remove the todo
      });
  
      const json = await res.json();
  
      if (json.acknowledged) {
        // Remove the todo from the list in state if deletion was successful
        props.setTodos(currentTodos => currentTodos.filter(todo => todo._id !== todoId));
      }
    };
  
    return (
      <div className="todo">
        <p>{props.todo.todo}</p>
        <div className="mutations">
          <button
            className="todo__status"
            onClick={() => updateTodo(props.todo._id, props.todo.status)}
          >
            {(props.todo.status) ? "☑" : "☐"}
          </button>
          <button
            className="todo__delete"
            onClick={() => deleteTodo(props.todo._id)}  // Call deleteTodo when button is clicked
          >
            🗑️
          </button>
        </div>
      </div>
    );
  }
  