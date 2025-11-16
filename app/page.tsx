"use client";

import { useMemo, useState } from "react";
import { PreferenceForm, getDefaultPreferences, JobPreferences } from "./components/PreferenceForm";
import { JobList } from "./components/JobList";
import { PersonaTimeline } from "./components/PersonaTimeline";
import { jobCatalog, personaTimeline } from "./components/data";
import { rankJobs } from "./components/scoring";

export default function Page() {
  const [preferences, setPreferences] = useState<JobPreferences>(getDefaultPreferences);
  const scoredJobs = useMemo(() => rankJobs(jobCatalog, preferences), [preferences]);

  const topMatch = scoredJobs[0];
  const avgScore =
    scoredJobs.reduce((total, job) => total + job.score, 0) /
    Math.max(scoredJobs.length, 1);
  const remoteRatio =
    (scoredJobs.filter((job) => job.remote).length / Math.max(scoredJobs.length, 1)) * 100;

  return (
    <main className="page">
      <header className="hero">
        <div>
          <h1>Agentic Job Alerts</h1>
          <p>
            A personal scout that prioritizes roles based on your preferences, emerging
            behaviors, and compensation targets.
          </p>
        </div>
        <div className="summary">
          <div>
            <span>Top match</span>
            <strong>{topMatch?.score ?? 0}%</strong>
            <p>{topMatch ? `${topMatch.title} · ${topMatch.company}` : "No results"}</p>
          </div>
          <div>
            <span>Average fit</span>
            <strong>{Math.round(avgScore)}%</strong>
            <p>Across {scoredJobs.length} curated roles</p>
          </div>
          <div>
            <span>Remote ratio</span>
            <strong>{Math.round(remoteRatio)}%</strong>
            <p>Of current shortlist</p>
          </div>
        </div>
      </header>
      <section className="layout">
        <div className="left">
          <PreferenceForm onUpdate={setPreferences} />
          <PersonaTimeline signals={personaTimeline} />
        </div>
        <div className="right">
          <JobList jobs={scoredJobs} />
        </div>
      </section>
      <section className="explain">
        <h2>How this agent thinks</h2>
        <div className="grid">
          <article>
            <h3>Signal fusion</h3>
            <p>
              Combines explicit preferences with passive signals like saved roles and
              dismissals to weight each attribute.
            </p>
          </article>
          <article>
            <h3>Compensation aware</h3>
            <p>
              Parses salary ranges and filters out roles below your benchmark while
              highlighting top-paying matches.
            </p>
          </article>
          <article>
            <h3>Continuous learning</h3>
            <p>
              Each interaction updates the persona timeline so upcoming alerts feel more
              relevant with time.
            </p>
          </article>
        </div>
      </section>
      <style jsx>{`
        .page {
          max-width: 1180px;
          margin: 0 auto;
          padding: 48px 24px 72px;
          display: grid;
          gap: 40px;
        }

        .hero {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: center;
          flex-wrap: wrap;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin: 0 0 12px;
        }

        .hero p {
          margin: 0;
          color: var(--text-secondary);
          max-width: 460px;
          line-height: 1.5;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(160px, 1fr));
          gap: 14px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 18px;
          min-width: 320px;
        }

        .summary div {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
        }

        .summary span {
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .summary strong {
          font-size: 1.8rem;
        }

        .summary p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }

        .layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 24px;
          align-items: start;
        }

        .left {
          display: grid;
          gap: 22px;
        }

        .right {
          min-width: 0;
        }

        .explain {
          display: grid;
          gap: 18px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 26px;
        }

        .explain h2 {
          margin: 0;
          font-size: 1.3rem;
        }

        .explain .grid {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .explain article {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 18px;
          display: grid;
          gap: 10px;
        }

        .explain h3 {
          margin: 0;
        }

        .explain p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        @media (max-width: 1024px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .hero {
            flex-direction: column;
            align-items: stretch;
          }

          .summary {
            width: 100%;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }
      `}</style>
    </main>
  );
}
