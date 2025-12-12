import React, { useState } from "react";
import Modal from "../components/Modal";
import { useToast } from "../components/ToastProvider";

const initialProjects = [
  { id: "p-001", name: "Website Refresh", priority: "High", owner: "Alex" },
  { id: "p-002", name: "Mobile Rollout", priority: "Medium", owner: "Casey" },
  { id: "p-003", name: "Data Cleanup", priority: "Low", owner: "Riley" },
];

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", priority: "Medium" });
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProject = {
      id: `p-${String(projects.length + 1).padStart(3, "0")}`,
      name: form.name || "Untitled Project",
      priority: form.priority,
      owner: "You",
    };
    setProjects((prev) => [...prev, newProject]);
    setIsModalOpen(false);
    setForm({ name: "", priority: "Medium" });
    toast("Project created");
  };

  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Track delivery work</h1>
          <p className="muted">
            Every project uses consistent structure for selectors and events.
          </p>
        </div>
        <button className="primary-button" onClick={() => setIsModalOpen(true)}>
          New Project
        </button>
      </header>

      <div className="card">
        <div className="table-header">
          <p className="muted">Project</p>
          <p className="muted">Priority</p>
          <p className="muted">Owner</p>
          <span aria-hidden="true" />
        </div>
        <div className="table-body">
          {projects.map((project) => (
            <div className="table-row" key={project.id}>
              <div>
                <p className="item-title">{project.name}</p>
                <p className="muted">ID: {project.id}</p>
              </div>
              <p>{project.priority}</p>
              <p>{project.owner}</p>
              <div className="actions">
                <button className="secondary-button">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Create project"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="input-group">
            <span>Project name</span>
            <input
              name="projectName"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Product launch"
            />
          </label>

          <label className="input-group">
            <span>Priority</span>
            <select
              name="priority"
              value={form.priority}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, priority: e.target.value }))
              }
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="ghost-button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

