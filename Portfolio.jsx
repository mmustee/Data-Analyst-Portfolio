import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Upload, PlusCircle, Trash2, Edit } from "lucide-react";

// Default project data
const defaultProjects = [
  {
    title: "Sales Forecasting Dashboard",
    description: "Built a Power BI dashboard to forecast quarterly sales using time series models.",
    tags: ["Power BI", "Time Series", "SQL"],
    link: "#"
  },
  {
    title: "Customer Churn Analysis",
    description: "Analyzed customer churn with logistic regression and data visualization in Python.",
    tags: ["Python", "Pandas", "Matplotlib"],
    link: "#"
  },
  {
    title: "Market Basket Analysis",
    description: "Performed association rule mining to analyze customer purchase behavior.",
    tags: ["R", "Data Mining", "Visualization"],
    link: "#"
  }
];

export default function Portfolio() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "", tags: "", link: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Load saved projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolioProjects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(defaultProjects);
    }
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
  }, [projects]);

  // Handle project upload from JSON
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const newProjects = JSON.parse(event.target.result);
          if (Array.isArray(newProjects)) {
            setProjects([...projects, ...newProjects]);
          } else {
            alert("Invalid file format. Please upload an array of projects.");
          }
        } catch (error) {
          alert("Error parsing JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Add or Update project manually via admin panel
  const handleSaveProject = () => {
    if (!newProject.title || !newProject.description) {
      alert("Title and Description are required.");
      return;
    }
    const formattedProject = {
      ...newProject,
      tags: newProject.tags.split(",").map(tag => tag.trim()),
    };

    if (editIndex !== null) {
      // Update existing project
      const updated = [...projects];
      updated[editIndex] = formattedProject;
      setProjects(updated);
      setEditIndex(null);
    } else {
      // Add new project
      setProjects([...projects, formattedProject]);
    }
    setNewProject({ title: "", description: "", tags: "", link: "" });
  };

  // Edit project
  const handleEdit = (index) => {
    const proj = projects[index];
    setNewProject({
      title: proj.title,
      description: proj.description,
      tags: proj.tags.join(", "),
      link: proj.link
    });
    setEditIndex(index);
    setShowAdmin(true);
  };

  // Delete project
  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="p-10 text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold">
          Hi, I'm [Your Name] 👋
        </motion.h1>
        <p className="mt-2 text-lg">Data Analyst | Turning Data into Insights</p>
        <Button className="mt-4 bg-white text-blue-600">Download Resume</Button>
      </section>

      {/* Skills Section */}
      <section className="p-10">
        <h2 className="text-2xl font-semibold mb-6">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["SQL", "Python", "R", "Power BI", "Tableau", "Excel", "Machine Learning", "Data Visualization"].map(skill => (
            <Card key={skill} className="shadow-md">
              <CardContent className="p-4 text-center font-medium">{skill}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="p-10 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <Upload className="text-gray-600" />
              <span className="text-sm text-gray-600">Upload JSON</span>
              <input type="file" accept="application/JSON" onChange={handleUpload} className="hidden" />
            </label>
            <Button variant="outline" onClick={() => setShowAdmin(!showAdmin)}>
              <PlusCircle className="mr-2 h-4 w-4" /> {showAdmin ? "Close Admin" : "Admin Panel"}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-6">
          <Search className="text-gray-500" />
          <Input placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Admin Panel */}
        {showAdmin && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{editIndex !== null ? "Edit Project" : "Add New Project"}</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
              <Input placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
              <Input placeholder="Tags (comma-separated)" value={newProject.tags} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} />
              <Input placeholder="Project Link" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
            </div>
            <Button className="mt-4 bg-blue-600 text-white" onClick={handleSaveProject}>
              {editIndex !== null ? "Update Project" : "Add Project"}
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}>
              <Card className="shadow-lg border border-gray-200 relative">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">View Project</Button>
                    </a>
                    {showAdmin && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(i)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(i)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-4">Let's collaborate or discuss data insights!</p>
        <Button className="bg-blue-600 text-white">Contact Me</Button>
      </section>
    </div>
  );
}
