import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";

const DEFAULT_PROJECTS = [
  {
    title: "Sales Forecasting Dashboard",
    description: "Forecast quarterly sales using time-series models and interactive visualizations.",
    tags: ["Power BI", "Time Series", "SQL"],
    link: "#"
  },
  {
    title: "Customer Churn Analysis",
    description: "Built a churn model and visualized retention strategies for Databel - a telecommunications company - produced next steps for reducing attrition.",
    tags: ["Power BI", "Excel", "DAX"],
    link: "/src/components/Churn.jsx"
  },
  {
    title: "Market Basket Analysis",
    description: "Association rules to uncover cross-sell opportunities.",
    tags: ["R", "Data Mining"],
    link: "#"
  }
];

export default function Projects({ id }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolioProjects");
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });
  const [filter, setFilter] = useState("All");
  const tags = useMemo(() => {
    const t = new Set();
    projects.forEach(p => p.tags.forEach(tag => t.add(tag)));
    return ["All", ...Array.from(t)];
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
  }, [projects]);

  const filtered = projects.filter(p => filter === "All" || p.tags.includes(filter));

  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="flex gap-2 flex-wrap">
          {tags.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1 rounded-full text-sm ${filter === t ? 'bg-primary text-white' : 'bg-card border border-border'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div key={p.title} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, delay: i * 0.05 }}>
              <Card>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{p.title}</h3>
                      <p className="text-muted mt-2">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map(t => <span key={t} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href={p.link} target="_blank" rel="noreferrer"><Button>View</Button></a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
