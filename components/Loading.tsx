import React from 'react';

export const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-purple-900"
        role="status"
      >
        <div className="spinner-border animate-spin inline-block w-4 h-4 border-r-4 rounded-full border-purple-900"></div>
      </div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
