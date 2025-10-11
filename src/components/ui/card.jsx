import React from "react";

export function Card({ children }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow hover:shadow-lg transition">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="text-gray-700">{children}</div>;
}
