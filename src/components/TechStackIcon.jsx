import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-6 bg-surface border-2 border-fg shadow-md transition-all duration-150 ease-in-out flex flex-col items-center justify-center gap-3 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer">
      <div className="relative">
        <img
          src={TechStackIcon}
          alt={`${Language} icon`}
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-fg font-mono font-semibold text-sm md:text-base tracking-tight transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon; 