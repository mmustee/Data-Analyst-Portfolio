import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import { Button } from "./components/ui/Button";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-40 backdrop-blur bg-background/60 dark:bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">Your Name</span>
            <span className="text-sm text-muted hidden sm:inline">• Data Analyst</span>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden md:flex gap-4 text-sm">
              <a className="hover:underline" href="#projects">Projects</a>
              <a className="hover:underline" href="#skills">Skills</a>
              <a className="hover:underline" href="#about">About</a>
              <a className="hover:underline" href="#contact">Contact</a>
            </nav>
            <Button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className="flex items-center gap-2"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline text-sm">{dark ? "Light" : "Dark"}</span>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Skills id="skills" />
        <Projects id="projects" />
        <About id="about" />
        <Contact id="contact" />
      </main>

      <footer className="mt-16 py-8 text-center text-sm text-muted border-t border-border bg-background/50">
        © {new Date().getFullYear()} Your Name — Data Analyst · Built with React, Vite & Tailwind
      </footer>
    </div>
  );
}
