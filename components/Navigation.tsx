
import React from 'react';
import { Role } from '../types';

interface NavigationProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentRole, setCurrentRole }) => {
  const baseClasses = "flex-1 text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-emerald-500";
  const activeClasses = "bg-emerald-600 text-white shadow-md";
  const inactiveClasses = "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600";

  return (
    <nav className="flex space-x-2 sm:space-x-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
      <button
        onClick={() => setCurrentRole(Role.Student)}
        className={`${baseClasses} ${currentRole === Role.Student ? activeClasses : inactiveClasses}`}
      >
        Student Portal
      </button>
      <button
        onClick={() => setCurrentRole(Role.Admin)}
        className={`${baseClasses} ${currentRole === Role.Admin ? activeClasses : inactiveClasses}`}
      >
        Admin Panel
      </button>
    </nav>
  );
};

export default Navigation;
