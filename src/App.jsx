import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import TodoItem from "./components/TodoItem";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { v4 as uuidv4 } from 'uuid';
import Loading from "./components/Loading";
import TodoCounter from "./components/TodoCounter"

const AppContent = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    const darkModeSetting = localStorage.getItem("isDarkMode");
    if (darkModeSetting) {
      setIsDarkMode(JSON.parse(darkModeSetting));
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [location]);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const confirmDelete = (id) => {
    setTodoToDelete(id);
  };

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      const newTodos = todos.filter((item) => item.id !== todoToDelete);
      setTodos(newTodos);
      setTodoToDelete(null);
      saveToLS(newTodos);
      setLoading(false);
    }, 500);
  };

  const handleCancelDelete = () => {
    setTodoToDelete(null);
  };

  const handleAdd = () => {
    if (todo.trim().length > 2) {
      setLoading(true);
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(newTodos);
      saveToLS(newTodos);
      setTodo("");
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
    
  };

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem('isDarkMode', newIsDarkMode);
  };

  const handleShowPopup = () =>{
    setShowPopup(true);
  };
  const handleClosePopup = () =>{
    setShowPopup(false);
  }

  return (
    <div>
      
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={
            <div className={`${isDarkMode ? "bg-slate-900" : ""} pt-5 h-full pb-3`}>
              
              <div className="md:container md:mx-auto rounded-xl p-5 bg-violet-100 dark:bg-gray-900 min-h-[80vh] md:w-[35%] shadow-lg">
                <div className="addTodo my-5 flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-300">
                    Add a Todo
                  </h2>
                  <div className="flex">
                    <input
                      onChange={handleChange}
                      value={todo}
                      type="text"
                      className="w-full rounded-full px-5 py-2 border-2 border-violet-500 dark:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:focus:ring-violet-300"
                    />
                    <button
                      onClick={handleAdd}
                      disabled={todo.length <= 2}
                      className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="flex items-center my-4">
                  <input
                    className="mr-2"
                    id="show"
                    onChange={toggleFinished}
                    type="checkbox"
                    checked={showFinished}
                  />
                  <label className="text-violet-700 dark:text-violet-300" htmlFor="show">
                    Show Finished
                  </label>
                </div>
                <button onClick={handleShowPopup} className="bg-violet-800 rounded-full hover:bg-violet-950 p-2 text-sm font-bold text-white">
                  Show Sumary
                </button>
                <div className="h-[1px] bg-black dark:bg-white opacity-15 w-[90%] mx-auto my-2"></div>
                <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-300 mb-3">
                  Your Todos
                </h2>
                <div className="todos">
                  {todos.length === 0 && (
                    <div className="m-5 text-violet-700 dark:text-violet-300">
                      No Todos to display
                    </div>
                  )}
                  {todos.map((item) => {
                    return (
                      (showFinished || !item.isCompleted) && (
                        <TodoItem
                          key={item.id}
                          item={item}
                          handleCheckbox={handleCheckbox}
                          handleEdit={handleEdit}
                          confirmDelete={confirmDelete}
                        />
                      )
                    );
                  })}
                </div>

                {todoToDelete && (
                  <DeleteConfirmation
                    handleDelete={handleDelete}
                    handleCancelDelete={handleCancelDelete}
                  />
                )}
              </div>
              {showPopup && <TodoCounter todos={todos} onClose={handleClosePopup}/>}
            </div>
          } />
        </Routes>
      )}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
