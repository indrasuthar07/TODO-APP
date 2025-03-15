import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-blue-600 shadow-md text-white rounded-lg">
      <div className="text-3xl font-extrabold tracking-wide">iTask</div>
      <ul className="flex space-x-10 text-lg">
        <li className="cursor-pointer transition-all hover:font-bold hover:underline">Home</li>
        <li className="cursor-pointer transition-all hover:font-bold hover:underline">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
