import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-violet-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-violet-900 dark:text-violet-100 mb-8 animate-fade-in">
        Welcome to iTask
      </h1>
      <p className="text-lg text-center text-violet-700 dark:text-violet-300 mb-8 animate-fade-in">
        Manage your todos in one place with iTask. Keep track of your tasks,
        stay organized, and be more productive.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center animate-fade-in">
        <p className="text-lg text-violet-700 dark:text-violet-300 mr-0 md:mr-4 mb-4 md:mb-0">
          Start managing your tasks now:
        </p>
        <a
          href="/todos"
          className="bg-violet-800 rounded-full px-6 py-2 text-lg font-bold text-white hover:bg-violet-900"
        >
          Go to Your Tasks
        </a>
      </div>
    </div>
  );
}

export default Home;
