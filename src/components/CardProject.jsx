import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };
  

  return (
    <div className="group relative w-full">

      <div className="relative overflow-hidden bg-surface border-2 border-fg shadow-md transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl">
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden border-2 border-fg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold text-fg group-hover:text-accent transition-colors duration-300">
              {Title}
            </h3>

            <p className="text-muted text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-accent hover:text-accent-strong transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-muted text-sm">Demo Not Available</span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="nb-press inline-flex items-center space-x-2 px-4 py-2 bg-nb-yellow border-2 border-fg text-black shadow-sm font-mono font-bold uppercase text-xs tracking-tight focus:outline-none"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-muted text-sm">Details Not Available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;