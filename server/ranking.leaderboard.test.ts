import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("ranking.leaderboard", () => {
  it("ranks only candidates for the selected role using the documented weights", async () => {
    const ctx = { user: null, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.ranking.leaderboard({ role: "Backend Engineer" });

    expect(result.weights).toEqual({ readiness: 0.5, skillRelevance: 0.3, projectExperience: 0.2 });
    expect(result.candidates.length).toBe(128);
    expect(result.candidates[0]).toMatchObject({ rank: 1, id: "C-1048", overallMatch: 92 });
    expect(result.candidates.map((candidate) => candidate.rank)).toEqual(Array.from({ length: 128 }, (_, index) => index + 1));
    expect(result.candidates.every((candidate) => candidate.role === "Backend Engineer")).toBe(true);
    expect(result.cohort).toMatchObject({ role: "Backend Engineer", totalApplicants: 128, candidateRank: 14, percentile: 89, bracket: "Top 15%" });
    expect(result.candidates.every((candidate) => !Object.keys(candidate).some((key) => ["name", "gender", "college"].includes(key)))).toBe(true);
    expect(result.candidates[0].overallMatch).toBeGreaterThanOrEqual(result.candidates[1].overallMatch);
  });
});
