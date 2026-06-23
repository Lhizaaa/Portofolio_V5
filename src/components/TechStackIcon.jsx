import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-6 rounded-2xl bg-surface border border-line hover:border-accent/40 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:-translate-y-1 cursor-pointer shadow-sm hover:shadow-xl">
      <div className="relative">
        <div className="absolute -inset-1 bg-accent rounded-full opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
        <img
          src={TechStackIcon}
          alt={`${Language} icon`}
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>
      <span className="text-muted font-semibold text-sm md:text-base tracking-wide group-hover:text-accent transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon; 