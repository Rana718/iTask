import React from "react";
import { motion } from "framer-motion";

const DeleteConfirmation = ({ handleDelete, handleCancelDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">
          Are you sure you want to delete this todo?
        </h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={handleCancelDelete}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteConfirmation;
