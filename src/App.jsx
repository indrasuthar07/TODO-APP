import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      let newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLS();
    }
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newTodos = [...todos];
    let index = newTodos.findIndex((item) => item.id === id);
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto my-10 w-full max-w-4xl rounded-2xl bg-gray-100 p-10 shadow-2xl backdrop-blur-lg text-gray-900 border border-gray-300">
        <h1 className="text-center text-5xl font-extrabold text-blue-500 drop-shadow-lg">
          iTask - Turn To-Dos into Dones
        </h1>

        <div className="my-8 space-y-6">
          <h2 className="text-3xl font-bold text-blue-400">Add a Todo</h2>
          <div className="flex items-center gap-5">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-lg bg-gray-200 px-6 py-3 text-lg text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter a new task..."
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="rounded-lg bg-blue-500 px-6 py-3 text-lg font-bold text-white transition-all hover:bg-blue-600 disabled:bg-gray-400"
            >
              Save
            </button>
          </div>
        </div>

        <div className="my-6">
          <input
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="mr-3 scale-150 accent-blue-500"
          />
          <label htmlFor="show" className="text-lg text-gray-600">Show Finished</label>
        </div>

        <h2 className="text-3xl font-bold text-blue-400">Your Todos</h2>
        <div className="mt-6 space-y-5">
          {todos.length === 0 && <div className="text-gray-500 text-lg">No Todos to display</div>}
          {todos.map((item) =>
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="flex justify-between items-center rounded-lg bg-gray-200 p-5 shadow-md transition-all hover:bg-gray-300"
              >
                <div className="flex items-center gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="scale-150 accent-blue-500"
                  />
                  <span className={item.isCompleted ? 'line-through text-gray-500 text-lg' : 'text-gray-900 text-lg'}>
                    {item.todo}
                  </span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="rounded-lg bg-green-500 p-3 text-white text-lg transition-all hover:bg-green-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg bg-red-500 p-3 text-white text-lg transition-all hover:bg-red-600"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
