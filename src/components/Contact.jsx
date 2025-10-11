import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

export default function Contact({ id }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo: store in localStorage or send to an API
    console.log("form submit", form);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="text-2xl font-semibold mb-6">Contact</h2>

        <div className="bg-card border border-border rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="md:col-span-2 border border-border rounded-lg p-3 h-32" />
            <div className="md:col-span-2 flex items-center justify-between">
              <div className="text-sm text-muted">{sent ? "Message sent! I'll get back shortly." : "Prefer email? your.email@example.com"}</div>
              <Button type="submit">Send Message</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
