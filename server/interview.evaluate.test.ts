import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("interview.evaluate", () => {
  it("returns a bounded, structured evaluation for a substantive answer", async () => {
    const ctx = { user: null, req: {} as TrpcContext["req"], res: {} as TrpcContext["res"] };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.interview.evaluate({
      question: "Tell me about a time you improved a production service.",
      answer: "First I described the context: our production API had a p95 latency issue. Then I added structured logs, traces, and a regression test. The trade-off was a small deploy delay, but we reduced latency by 35% and improved the SLO. Finally I documented the rollback plan and what I learned.",
    });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.structure).toBeGreaterThan(70);
    expect(result.relevance).toBeGreaterThan(70);
    expect(result.depth).toBeGreaterThan(70);
    expect(result.tags).toHaveLength(3);
    expect(result.feedback.length).toBeGreaterThan(20);
  });
});
