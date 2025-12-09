import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";


// Example data structure — you can replace with real projects later
const sampleProjects = [
{
id: 1,
title: "Sales Forecasting with Time Series",
intro:
"A complete end‑to‑end forecasting project using Python, Prophet, and PowerBI.",
cover: "/images/forecast_cover.png",
steps: [
{
step: "01 — Problem Understanding",
text: "The business needed a 6‑month sales forecast to optimize inventory.",
image: "/images/forecast_step1.png",
tools: ["Excel", "Python", "Prophet"],
},
{
step: "02 — Data Cleaning & EDA",
text: "I performed EDA to identify seasonal patterns and outliers.",
image: "/images/forecast_step2.png",
tools: ["Pandas", "Matplotlib"],
},
{
step: "03 — Modeling",
text: "Used Facebook Prophet to model seasonality, trend, and holiday effects.",
image: "/images/forecast_step3.png",
tools: ["Prophet", "Python"],
},
],
},
];

export default function ProjectsPage() {
const [selected, setSelected] = useState(null);

return (
<div className="min-h-screen bg-background px-6 py-20 max-w-5xl mx-auto">
<motion.h1
className="text-4xl font-bold mb-10 text-center"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
>
My Data Analytics Projects
</motion.h1>


{!selected && (
<div className="grid md:grid-cols-2 gap-8">
{sampleProjects.map((project) => (
<motion.div
key={project.id}
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
>
<Card>
<img
src={project.cover}
alt="project cover"
className="rounded-xl mb-4 w-full h-48 object-cover"
/>
<h2 className="text-xl font-semibold mb-2">{project.title}</h2>
<p className="text-gray-600 mb-4">{project.intro}</p>
<Button onClick={() => setSelected(project)}>View Case Study</Button>
</Card>
</motion.div>
))}
</div>
)}


{selected && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="space-y-12"
>
<Button onClick={() => setSelected(null)}>&larr; Back to Projects</Button>


<h2 className="text-3xl font-bold mt-6">{selected.title}</h2>


{selected.steps.map((s, index) => (
<motion.div
key={index}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="p-6 rounded-2xl border border-border bg-card shadow-sm"
>
<h3 className="text-xl font-semibold mb-2">{s.step}</h3>
<p className="text-gray-700 mb-4 leading-relaxed">{s.text}</p>


{s.image && (
<img
src={s.image}
alt="step visual"
className="rounded-xl mb-4 w-full"
/>
)}


{s.tools && (
<div className="flex flex-wrap gap-2 mt-4">
{s.tools.map((tool, i) => (
<span
key={i}
className="text-sm px-3 py-1 rounded-full bg-secondary text-gray-700"
>
{tool}
</span>
))}
</div>
)}
</motion.div>
))}
</motion.div>
)}
</div>
);
}