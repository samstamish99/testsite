import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Team Command Center</h1>
          <p className="muted">
            Monitor projects, keep teammates aligned, and act quickly.
          </p>
        </div>
        <Link className="primary-button" to="/projects">
          Create Project
        </Link>
      </header>

      <div className="grid stats-grid">
        {[
          { label: "Active Projects", value: "3" },
          { label: "Pending Invites", value: "2" },
          { label: "Upcoming Deadlines", value: "5" },
          { label: "Team Health", value: "On Track" },
        ].map((card) => (
          <article className="card" key={card.label}>
            <p className="muted">{card.label}</p>
            <h2>{card.value}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

