import { ACTIONS } from "./App";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Todo({ todo, index, dispatch }) {
  return (
    <div className={classNames(index % 2 === 0 ? "bg-gray-50" : "bg-white", "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6")}>
      <dt style={{ textDecoration: todo.complete ? 'line-through' : '' }} className={classNames("text-sm font-medium text-gray-500")}>{todo.name}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <button
          onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Toggle
        </button>
        <button
          style={{ marginLeft: "5px" }}
          onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Delete
        </button>
      </dd>
    </div>
  )
};
