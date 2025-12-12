import React, { useState } from "react";
import Modal from "../components/Modal";
import { useToast } from "../components/ToastProvider";

export default function Billing() {
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const toast = useToast();

  const handleUpgrade = (event) => {
    event.preventDefault();
    setIsUpgradeOpen(false);
    setCard({ number: "", expiry: "", cvc: "" });
    toast("Plan upgraded");
  };

  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Billing</p>
          <h1>Plan & payments</h1>
          <p className="muted">
            Predictable layout for testing upgrade and payment modals.
          </p>
        </div>
        <button className="primary-button" onClick={() => setIsUpgradeOpen(true)}>
          Upgrade plan
        </button>
      </header>

      <article className="card plan-card">
        <div>
          <p className="eyebrow">Current plan</p>
          <h2>Starter</h2>
          <p className="muted">$24 / month · up to 10 teammates</p>
        </div>
        <div>
          <p className="muted">Renewal</p>
          <p>Jan 15, 2026</p>
        </div>
        <div>
          <p className="muted">Status</p>
          <span className="badge">Active</span>
        </div>
      </article>

      <Modal
        title="Upgrade plan"
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
      >
        <div className="pricing-grid">
          <div className="pricing-card selected">
            <p className="eyebrow">Recommended</p>
            <h3>Growth</h3>
            <p className="muted">$89 / month · up to 25 teammates</p>
          </div>
          <div className="pricing-card">
            <h3>Scale</h3>
            <p className="muted">$199 / month · unlimited teammates</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={handleUpgrade}>
          <label className="input-group">
            <span>Card number</span>
            <input
              name="cardNumber"
              value={card.number}
              onChange={(e) =>
                setCard((prev) => ({ ...prev, number: e.target.value }))
              }
              placeholder="4242 4242 4242 4242"
              inputMode="numeric"
              required
            />
          </label>

          <div className="grid two-col">
            <label className="input-group">
              <span>Expiry</span>
              <input
                name="expiry"
                value={card.expiry}
                onChange={(e) =>
                  setCard((prev) => ({ ...prev, expiry: e.target.value }))
                }
                placeholder="MM/YY"
                required
              />
            </label>
            <label className="input-group">
              <span>CVC</span>
              <input
                name="cvc"
                value={card.cvc}
                onChange={(e) =>
                  setCard((prev) => ({ ...prev, cvc: e.target.value }))
                }
                placeholder="123"
                inputMode="numeric"
                required
              />
            </label>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="ghost-button"
              onClick={() => setIsUpgradeOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Confirm upgrade
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}

