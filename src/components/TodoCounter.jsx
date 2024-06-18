import React from "react";

const TodoCounter = ({todos, onClose}) =>{
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo)=> todo.isCompleted).length;
    const uncompletedTodos = totalTodos - completedTodos;

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-300 mb-4">Todo Summary</h2>
                <p className="text-lg text-violet-700 dark:text-violet-300">Total Todos: {totalTodos}</p>
                <p className="text-lg text-violet-700 dark:text-violet-300">Completed: {completedTodos}</p>
                <p className="text-lg text-violet-700 dark:text-violet-300">Uncompleted: {uncompletedTodos}</p>
                <button onClick={onClose} className="mt-4 bg-violet-800 rounded-full hover:bg-violet-950 p-2 text-sm font-bold text-white">
                    Ok
                </button>
            </div>
        </div>
    );
}

export default TodoCounter;