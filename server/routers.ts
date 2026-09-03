import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

function scoreAnswer(answer: string) {
  const normalized = answer.toLowerCase();
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const structureSignals = ["first", "then", "finally", "context", "situation", "trade-off", "because"].filter((word) => normalized.includes(word)).length;
  const relevanceSignals = ["api", "service", "production", "reliability", "latency", "test", "deploy", "monitor", "scale", "incident", "database"].filter((word) => normalized.includes(word)).length;
  const depthSignals = ["measured", "reduced", "increased", "metric", "%", "p95", "slo", "rollback", "failure", "decision", "learned"].filter((word) => normalized.includes(word)).length;
  const structure = Math.min(96, 48 + structureSignals * 7 + (wordCount > 70 ? 8 : wordCount > 35 ? 4 : 0));
  const relevance = Math.min(96, 44 + relevanceSignals * 5 + (wordCount > 45 ? 5 : 0));
  const depth = Math.min(94, 38 + depthSignals * 7 + (wordCount > 80 ? 10 : wordCount > 45 ? 5 : 0));
  const score = Math.round(structure * 0.3 + relevance * 0.35 + depth * 0.35);
  const tags = [structure >= 70 ? "Clear structure" : "Add a beginning / middle / end", relevance >= 70 ? "Role-relevant" : "Tie back to the service", depth >= 70 ? "Good depth" : "Quantify the impact"];
  const feedback = score >= 78 ? "Strong answer. You gave the situation enough context, connected the decision to reliability, and showed how the result mattered. To make it interview-ready, add one concrete metric or trade-off the team had to navigate." : score >= 60 ? "Good foundation. The core idea is relevant, but your answer would be stronger with a clearer sequence: context, decision, trade-off, and measurable outcome. Try naming what changed after you shipped." : "You have the right starting point. Slow down and anchor the answer in one real example. Lead with the constraint, explain your decision, and finish with the impact so the interviewer can follow your reasoning.";
  return { score, structure, relevance, depth, tags, feedback };
}

type RankingCandidate = {
  id: string;
  role: string;
  readiness: number;
  skillRelevance: number;
  projectExperience: number;
  evidence: string;
};

const rankingCandidates: RankingCandidate[] = [
  { id: "C-1048", role: "Backend Engineer", readiness: 92, skillRelevance: 95, projectExperience: 88, evidence: "Python · APIs · AWS" },
  { id: "C-1092", role: "Backend Engineer", readiness: 87, skillRelevance: 91, projectExperience: 84, evidence: "Go · Systems · GCP" },
  { id: "C-1117", role: "Backend Engineer", readiness: 79, skillRelevance: 83, projectExperience: 76, evidence: "Java · Spring · SQL" },
  { id: "C-1139", role: "Backend Engineer", readiness: 72, skillRelevance: 78, projectExperience: 69, evidence: "Node · Postgres · Redis" },
  { id: "C-1031", role: "Platform Engineer", readiness: 84, skillRelevance: 94, projectExperience: 91, evidence: "K8s · Terraform · SRE" },
  { id: "C-1076", role: "Data Engineer", readiness: 76, skillRelevance: 89, projectExperience: 73, evidence: "Python · Spark · dbt" },
];

function candidatesForRole(role: string) {
  const base = rankingCandidates.filter((candidate) => candidate.role === role);
  if (role !== "Backend Engineer") return base;

  const peerCandidates = Array.from({ length: 10 }, (_, index) => {
    const score = 86 - Math.floor(index * 0.65);
    return { id: `C-${1200 + index}`, role, readiness: score, skillRelevance: Math.min(96, score + 2), projectExperience: Math.max(72, score - 2), evidence: "APIs · SQL · testing" };
  });
  const remainingCandidates = Array.from({ length: 113 }, (_, index) => {
    const score = Math.max(55, 77 - Math.floor(index * 0.18));
    return { id: `C-${1300 + index}`, role, readiness: score, skillRelevance: Math.min(88, score + 3), projectExperience: Math.max(50, score - 4), evidence: "Backend fundamentals · project signal" };
  });
  const featuredCandidate = { id: "C-AX14", role, readiness: 79, skillRelevance: 80, projectExperience: 78, evidence: "APIs · SQL · testing" };
  return [...base, ...peerCandidates, featuredCandidate, ...remainingCandidates];
}

function rankByRole(role: string) {
  return candidatesForRole(role)
    .map((candidate) => ({
      ...candidate,
      // Weighted scoring engine: readiness 50%, skill relevance 30%, project evidence 20%.
      overallMatch: Math.round(candidate.readiness * 0.5 + candidate.skillRelevance * 0.3 + candidate.projectExperience * 0.2),
    }))
    .sort((a, b) => b.overallMatch - a.overallMatch || b.skillRelevance - a.skillRelevance)
    .map((candidate, index) => ({ rank: index + 1, ...candidate }));
}

function cohortSummary(role: string, rankedCandidates: ReturnType<typeof rankByRole>) {
  const featured = rankedCandidates.find((candidate) => candidate.id === "C-AX14");
  const totalApplicants = rankedCandidates.length;
  const candidateRank = featured?.rank ?? null;
  const percentile = candidateRank ? Math.round(((totalApplicants - candidateRank) / totalApplicants) * 100) : null;
  const bracket = candidateRank && candidateRank / totalApplicants <= 0.15 ? "Top 15%" : candidateRank && candidateRank / totalApplicants <= 0.25 ? "Top 25%" : candidateRank ? "Top 50%" : null;
  return { role, totalApplicants, candidateRank, percentile, bracket };
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  interview: router({
    evaluate: publicProcedure.input(z.object({ question: z.string().min(1), answer: z.string().min(1).max(1200) })).mutation(({ input }) => scoreAnswer(input.answer)),
  }),
  ranking: router({
    leaderboard: publicProcedure
      .input(z.object({ role: z.string().min(1).default("Backend Engineer") }))
      .query(({ input }) => {
        const candidates = rankByRole(input.role);
        return { role: input.role, weights: { readiness: 0.5, skillRelevance: 0.3, projectExperience: 0.2 }, cohort: cohortSummary(input.role, candidates), candidates };
      }),
  }),
});

export type AppRouter = typeof appRouter;
