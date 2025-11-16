import { Job } from "./data";
import { JobPreferences } from "./PreferenceForm";
import type { ScoredJob } from "./JobList";

const KEYWORD_WEIGHT = 0.4;
const LOCATION_WEIGHT = 0.15;
const REMOTE_WEIGHT = 0.15;
const COMMITMENT_WEIGHT = 0.15;
const SALARY_WEIGHT = 0.15;

const USD_REGEX = /(\d{2,3})k/gi;

function extractSalaryUpperBound(salary: string): number | null {
  const matches = [...salary.matchAll(USD_REGEX)].map(([, amount]) =>
    Number(amount),
  );
  if (matches.length === 0) {
    return null;
  }
  return Math.max(...matches);
}

function keywordScore(keywords: string[], jobTags: string[]): number {
  if (keywords.length === 0) {
    return 0.5;
  }
  const normalized = keywords.map((keyword) => keyword.toLowerCase());
  const intersections = jobTags.filter((tag) =>
    normalized.some((keyword) => tag.toLowerCase().includes(keyword)),
  );
  return intersections.length / keywords.length;
}

function locationScore(locations: string[], location: string): number {
  if (locations.length === 0) {
    return 0.5;
  }
  const locationLower = location.toLowerCase();
  const matched = locations.some((loc) => locationLower.includes(loc.toLowerCase()));
  return matched ? 1 : 0;
}

function remoteScore(remoteOnly: boolean, isRemote: boolean): number {
  if (!remoteOnly) {
    return isRemote ? 1 : 0.4;
  }
  return isRemote ? 1 : 0;
}

function commitmentScore(
  preference: JobPreferences["commitment"],
  commitment: Job["commitment"],
): number {
  if (preference === "Any") {
    return 0.7;
  }
  return preference === commitment ? 1 : 0;
}

function salaryScore(salaryFloor: number, salary: string): number {
  const upperBound = extractSalaryUpperBound(salary);
  if (!upperBound) {
    return 0.5;
  }
  if (upperBound >= salaryFloor) {
    return 1;
  }
  const gap = salaryFloor - upperBound;
  return Math.max(0, 1 - gap / 60);
}

function toPercent(score: number): number {
  return Math.round(Math.min(0.99, score) * 100);
}

export function rankJobs(jobs: Job[], prefs: JobPreferences): ScoredJob[] {
  return jobs
    .map((job) => {
      const keyword = keywordScore(prefs.keywords, job.tags);
      const location = locationScore(prefs.locations, job.location);
      const remote = remoteScore(prefs.remoteOnly, job.remote);
      const commitment = commitmentScore(prefs.commitment, job.commitment);
      const salary = salaryScore(prefs.salaryFloor, job.salary);

      const score =
        keyword * KEYWORD_WEIGHT +
        location * LOCATION_WEIGHT +
        remote * REMOTE_WEIGHT +
        commitment * COMMITMENT_WEIGHT +
        salary * SALARY_WEIGHT;

      const highlights: string[] = [];

      if (keyword > 0.75) {
        highlights.push("Strong skills overlap");
      }

      if (remote === 1) {
        highlights.push("Remote-friendly");
      }

      if (salary >= 0.9) {
        highlights.push("Salary meets benchmark");
      }

      if (commitment === 1) {
        highlights.push("Matches preferred commitment");
      }

      if (location === 1 && !job.remote) {
        highlights.push("Location aligned");
      }

      if (highlights.length === 0) {
        highlights.push("Potential stretch match");
      }

      return {
        ...job,
        score: toPercent(score),
        highlights,
      };
    })
    .sort((a, b) => b.score - a.score);
}
