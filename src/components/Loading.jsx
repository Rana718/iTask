import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-16 h-16 border-4 border-yellow-500 border-solid rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
}

export default Loading;
