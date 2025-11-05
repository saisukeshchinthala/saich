
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md">
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            AI-Powered Career Assessment Tool
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
            Discover your future career path today.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
