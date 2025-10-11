import React from "react";

export function Input(props) {
  return (
    <input
      className="border border-border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
      {...props}
    />
  );
}
