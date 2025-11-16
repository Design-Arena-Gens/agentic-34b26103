"use client";

import { Job } from "./data";

export type ScoredJob = Job & { score: number; highlights: string[] };

type Props = {
  jobs: ScoredJob[];
};

export function JobList({ jobs }: Props) {
  return (
    <section className="job-list">
      <header>
        <h2>Live Recommendations</h2>
        <p>
          Ranked by your agent using skills affinity, compensation fit, and
          engagement history.
        </p>
      </header>
      <div className="grid">
        {jobs.map((job) => (
          <article key={job.id} className="card">
            <div className="header">
              <span className="badge">{job.score}% match</span>
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p className="meta">
                {job.location} · {job.commitment} · {job.remote ? "Remote" : "Onsite"}
              </p>
            </div>
            <p className="description">{job.description}</p>
            <div className="tags">
              {job.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <footer>
              <p className="salary">{job.salary}</p>
              <ul>
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </footer>
          </article>
        ))}
      </div>
      <style jsx>{`
        .job-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        header h2 {
          margin: 0;
          font-size: 1.4rem;
        }

        header p {
          margin: 4px 0 0;
          color: var(--text-secondary);
        }

        .grid {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 280px;
        }

        .header {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .badge {
          align-self: flex-start;
          background: var(--accent-soft);
          border-radius: 999px;
          padding: 4px 10px;
          color: var(--accent);
          font-weight: 600;
          font-size: 0.8rem;
        }

        .company {
          color: var(--text-secondary);
        }

        .meta {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.4;
          color: rgba(240, 246, 252, 0.87);
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tags span {
          padding: 4px 9px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .salary {
          font-weight: 600;
        }

        footer ul {
          margin: 0;
          padding-left: 18px;
          color: var(--text-secondary);
          font-size: 0.88rem;
          display: grid;
          gap: 2px;
        }
      `}</style>
    </section>
  );
}
