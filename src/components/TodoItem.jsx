import React from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const TodoItem = ({ item, handleCheckbox, handleEdit, confirmDelete }) => {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="todo flex my-3 justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md"
    >
      <div className="flex items-center gap-5">
        <input
          name={item.id}
          onChange={handleCheckbox}
          type="checkbox"
          checked={item.isCompleted}
        />
        <div
          className={
            item.isCompleted
              ? "line-through text-gray-500 dark:text-gray-400"
              : "text-black dark:text-gray-100"
          }
        >
          {item.todo}
        </div>
      </div>
      <div className="buttons flex">
        <button
          onClick={() => handleEdit(item.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full mx-1"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => confirmDelete(item.id)}
          className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full mx-1"
        >
          <AiFillDelete />
        </button>
      </div>
    </motion.div>
  );
};

export default TodoItem;
