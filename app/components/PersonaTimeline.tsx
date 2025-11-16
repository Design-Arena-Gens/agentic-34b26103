"use client";

import { PersonaSignal } from "./data";

type Props = {
  signals: PersonaSignal[];
};

export function PersonaTimeline({ signals }: Props) {
  return (
    <section className="timeline">
      <header>
        <h2>Learning Timeline</h2>
        <p>How the agent updated its internal weighting over the past week.</p>
      </header>
      <ol>
        {signals.map((signal) => (
          <li key={signal.timestamp}>
            <div className="timestamp">
              {new Date(signal.timestamp).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="content">
              <p>{signal.summary}</p>
              <div className="chips">
                {signal.boost.map((tag) => (
                  <span key={`${signal.timestamp}-boost-${tag}`} className="boost">
                    + {tag}
                  </span>
                ))}
                {signal.suppress.map((tag) => (
                  <span key={`${signal.timestamp}-suppress-${tag}`} className="suppress">
                    – {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <style jsx>{`
        .timeline {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid var(--border);
          display: grid;
          gap: 16px;
        }

        header h2 {
          margin: 0;
        }

        header p {
          margin: 4px 0 0;
          color: var(--text-secondary);
        }

        ol {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 18px;
        }

        li {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 16px;
        }

        .timestamp {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .content {
          display: grid;
          gap: 12px;
        }

        .content p {
          margin: 0;
          line-height: 1.4;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chips span {
          border-radius: 999px;
          padding: 4px 9px;
          font-size: 0.8rem;
        }

        .boost {
          background: rgba(37, 211, 102, 0.12);
          color: #2bd970;
        }

        .suppress {
          background: rgba(248, 81, 73, 0.12);
          color: #ff857d;
        }

        @media (max-width: 720px) {
          li {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
