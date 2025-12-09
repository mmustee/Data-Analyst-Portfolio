import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-24 -left-40 w-[40rem] h-[40rem] bg-gradient-to-tr from-blue-300/30 to-indigo-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              I’m <span className="text-primary">Mohammed Mustapha</span> — a Data Analyst with a cybersecurity background that turns your data into valuable business insights
            </h1>
            <p className="mt-4 text-muted max-w-xl">
              I build dashboards, predictive models, and reproducible analyses that help teams act with confidence. My focus is on clarity, impact and production-ready analytics.
            </p>

            <div className="mt-6 flex gap-3">
              <a href="#projects"><Button>View Projects</Button></a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-flex">
                <Button className="bg-white/90 text-primary/95 hover:bg-white">Download Resume</Button>
              </a>
            </div>

            <div className="mt-6 flex gap-6 text-sm text-muted">
              <div>
                <div className="text-2xl font-bold">12+</div>
                <div className="text-xs">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs">Tools</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex justify-center">
            <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-card border border-border">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-lg mb-4 flex items-center justify-center text-white font-semibold">
                Live demo / screenshot
              </div>
              <div className="text-sm text-muted">Featured project: Sales Forecasting Dashboard</div>
              <div className="mt-4 flex gap-3">
                <Button as="a" href="#">Open Dashboard</Button>
                <Button as="a" href="#" className="bg-white/90 text-primary/95">View Code</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
