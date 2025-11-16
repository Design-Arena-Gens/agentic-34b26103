"use client";

import { useState } from "react";

export type JobPreferences = {
  keywords: string[];
  locations: string[];
  commitment: "Any" | "Full-time" | "Part-time" | "Contract" | "Internship";
  remoteOnly: boolean;
  salaryFloor: number;
};

type Props = {
  onUpdate: (prefs: JobPreferences) => void;
};

const defaultPrefs: JobPreferences = {
  keywords: ["React", "Product"],
  locations: ["Remote", "New York"],
  commitment: "Full-time",
  remoteOnly: true,
  salaryFloor: 120,
};

export function PreferenceForm({ onUpdate }: Props) {
  const [keywords, setKeywords] = useState(defaultPrefs.keywords.join(", "));
  const [locations, setLocations] = useState(defaultPrefs.locations.join(", "));
  const [commitment, setCommitment] = useState<JobPreferences["commitment"]>(
    defaultPrefs.commitment,
  );
  const [remoteOnly, setRemoteOnly] = useState(defaultPrefs.remoteOnly);
  const [salaryFloor, setSalaryFloor] = useState(defaultPrefs.salaryFloor);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdate({
      keywords: keywords
        .split(",")
        .map((word) => word.trim())
        .filter(Boolean),
      locations: locations
        .split(",")
        .map((word) => word.trim())
        .filter(Boolean),
      commitment,
      remoteOnly,
      salaryFloor,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <header>
        <h2>Alert Preferences</h2>
        <p>Refine the signals that steer your personal scouting agent.</p>
      </header>
      <label>
        Focus skills & keywords
        <input
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
          placeholder="e.g. React, product strategy, data"
        />
      </label>
      <label>
        Preferred locations
        <input
          value={locations}
          onChange={(event) => setLocations(event.target.value)}
          placeholder="e.g. Remote, Berlin, NYC"
        />
      </label>
      <label>
        Commitment level
        <select
          value={commitment}
          onChange={(event) =>
            setCommitment(event.target.value as JobPreferences["commitment"])
          }
        >
          <option value="Any">Any</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </label>
      <label className="switch">
        <input
          type="checkbox"
          checked={remoteOnly}
          onChange={(event) => setRemoteOnly(event.target.checked)}
        />
        Remote-first roles only
      </label>
      <label>
        Minimum salary benchmark (USD)
        <div className="range-input">
          <input
            type="range"
            min={60}
            max={250}
            step={5}
            value={salaryFloor}
            onChange={(event) => setSalaryFloor(Number(event.target.value))}
          />
          <span>${salaryFloor}k+</span>
        </div>
      </label>
      <button type="submit">Refresh Recommendations</button>
      <style jsx>{`
        .form {
          display: grid;
          gap: 16px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(14px);
        }

        header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        header h2 {
          margin: 0;
          font-size: 1.35rem;
        }

        header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.95rem;
        }

        input,
        select {
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
        }

        input:focus,
        select:focus {
          outline: 2px solid rgba(47, 129, 247, 0.35);
          outline-offset: 1px;
        }

        .switch {
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }

        .switch input {
          width: 20px;
          height: 20px;
        }

        .range-input {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .range-input span {
          color: var(--text-secondary);
        }

        button {
          border-radius: 999px;
          background: linear-gradient(135deg, var(--accent), #7b61ff);
          border: none;
          color: #fff;
          font-weight: 600;
          padding: 12px 20px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(47, 129, 247, 0.35);
        }
      `}</style>
    </form>
  );
}

export function getDefaultPreferences(): JobPreferences {
  return { ...defaultPrefs };
}
