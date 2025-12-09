import React from "react";
import {motion} from "framer-motion";

export default function About({ id }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="text-2xl font-semibold mb-6">About Me</h2>
        <div className="bg-card border border-border rounded-2xl p-6 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center text-white text-lg font-semibold shadow-lg">
              Photo
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-muted mb-4">
              I’m a data analyst with experience in building dashboards, statistical models, and data pipelines. I work with stakeholders to translate business questions into measurable solutions, and I prioritise clean reproducible code and notebooks.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              <li><strong>Tools:</strong> Microsoft Excel, Power BI, Tableau, SQL Server Management Studio</li>
              <li><strong>Focus:</strong> Forecasting, customer analytics, data visualization</li>
              <li><strong>Availability:</strong> Open to consultancy & collaboration</li>
              <li><strong>Contact:</strong> your.email@example.com</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
