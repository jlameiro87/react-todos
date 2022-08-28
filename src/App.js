import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

const addTodoToLocalStorage = (todo) => {
  const localTodos = localStorage.getItem('todos-list') ? JSON.parse(localStorage.getItem('todos-list')) : [];
  localStorage.setItem('todos-list', JSON.stringify([...localTodos, todo]));
};

const getTodosFromLocalStorage = () => {
  return localStorage.getItem('todos-list') ? JSON.parse(localStorage.getItem('todos-list')) : [];
};

const setTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos-list', JSON.stringify(todos));
}

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      const newTodoObj = newTodo(action.payload.name);
      addTodoToLocalStorage(newTodoObj)
      return [...todos, newTodoObj];
    case ACTIONS.TOGGLE_TODO:
      const toogledTodos = todos.map((todo) => {
        if (todo.id === action.payload.id)
          return { ...todo, complete: !todo.complete };
        return todo;
      });
      setTodosToLocalStorage(toogledTodos);
      return toogledTodos;
    case ACTIONS.DELETE_TODO:
      const filteredTodos = todos.filter((todo) => todo.id !== action.payload.id);
      setTodosToLocalStorage(filteredTodos);
      return filteredTodos;
    default:
      return [...todos];
  }
};

const newTodo = (name) => {
  return { id: uuidv4(), name: name, complete: false };
};

export default function App() {
  const [todos, dispatch] = useReducer(reducer, getTodosFromLocalStorage());
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };

  return (
    <>
      <Navbar />

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            My ToDos List
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="todo-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Todo Name:
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          name="todo-name"
                          id="todo-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <dl>
            {todos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                index={index}
                dispatch={dispatch}
              />
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
