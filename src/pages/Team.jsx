import React, { useState } from "react";
import { useToast } from "../components/ToastProvider";

const existingTeammates = [
  { name: "Alex Taylor", email: "alex@example.com", role: "Owner" },
  { name: "Casey Lee", email: "casey@example.com", role: "Admin" },
  { name: "Riley Chen", email: "riley@example.com", role: "Editor" },
];

export default function Team() {
  const [invite, setInvite] = useState({ email: "", role: "Editor" });
  const toast = useToast();

  const handleInvite = (event) => {
    event.preventDefault();
    setInvite({ email: "", role: "Editor" });
    toast("Invitation sent");
  };

  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Team</p>
          <h1>Invite teammates</h1>
          <p className="muted">
            Keep roles explicit for selector stability during onboarding flows.
          </p>
        </div>
      </header>

      <div className="grid two-col">
        <article className="card">
          <h2>Invite teammate</h2>
          <form className="form-grid" onSubmit={handleInvite}>
            <label className="input-group">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={invite.email}
                onChange={(e) =>
                  setInvite((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="teammate@company.com"
                required
              />
            </label>

            <label className="input-group">
              <span>Role</span>
              <select
                name="role"
                value={invite.role}
                onChange={(e) =>
                  setInvite((prev) => ({ ...prev, role: e.target.value }))
                }
              >
                <option>Owner</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </label>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                Send invite
              </button>
            </div>
          </form>
        </article>

        <article className="card">
          <h2>Existing teammates</h2>
          <div className="list">
            {existingTeammates.map((person) => (
              <div className="list-row" key={person.email}>
                <div>
                  <p className="item-title">{person.name}</p>
                  <p className="muted">{person.email}</p>
                </div>
                <span className="badge">{person.role}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

