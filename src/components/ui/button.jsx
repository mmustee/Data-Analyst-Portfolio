import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/80 transition"
      {...props}
    >
      {children}
    </button>
  );
}

