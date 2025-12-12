import React, { useState } from "react";
import Modal from "../components/Modal";
import { useToast } from "../components/ToastProvider";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Jordan Rivers",
    title: "Operations Lead",
    timezone: "UTC-05:00",
  });
  const [notifications, setNotifications] = useState({
    product: true,
    security: true,
    billing: false,
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const toast = useToast();

  const handleProfileSave = (event) => {
    event.preventDefault();
    toast("Profile updated");
  };

  const handleDelete = () => {
    setIsDeleteOpen(false);
    toast("Workspace deleted (simulated)");
  };

  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Workspace settings</h1>
          <p className="muted">
            Update profile, notification preferences, and critical actions.
          </p>
        </div>
      </header>

      <div className="grid two-col">
        <article className="card">
          <h2>Profile</h2>
          <form className="form-grid" onSubmit={handleProfileSave}>
            <label className="input-group">
              <span>Full name</span>
              <input
                name="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </label>

            <label className="input-group">
              <span>Role / Title</span>
              <input
                name="title"
                value={profile.title}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </label>

            <label className="input-group">
              <span>Timezone</span>
              <select
                name="timezone"
                value={profile.timezone}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, timezone: e.target.value }))
                }
              >
                <option>UTC-08:00</option>
                <option>UTC-05:00</option>
                <option>UTC+00:00</option>
                <option>UTC+02:00</option>
                <option>UTC+05:30</option>
              </select>
            </label>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                Save profile
              </button>
            </div>
          </form>
        </article>

        <article className="card">
          <h2>Notifications</h2>
          <div className="toggle-list">
            {[
              { key: "product", label: "Product updates" },
              { key: "security", label: "Security alerts" },
              { key: "billing", label: "Billing reminders" },
            ].map((item) => (
              <label className="toggle" key={item.key}>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={(e) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: e.target.checked,
                    }))
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </article>
      </div>

      <article className="card danger">
        <div>
          <h2>Danger Zone</h2>
          <p className="muted">This simulates irreversible destructive action.</p>
        </div>
        <button className="danger-button" onClick={() => setIsDeleteOpen(true)}>
          Delete workspace
        </button>
      </article>

      <Modal
        title="Delete workspace"
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      >
        <p className="muted">
          This will remove all data in this demo. This is a simulated flow for
          onboarding tests.
        </p>
        <div className="modal-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={() => setIsDeleteOpen(false)}
          >
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={handleDelete}>
            Confirm delete
          </button>
        </div>
      </Modal>
    </section>
  );
}

