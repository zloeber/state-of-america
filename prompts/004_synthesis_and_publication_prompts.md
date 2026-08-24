# 004 — Synthesis & Publication Prompts

**Parent:** `001_research_decomposition.md`

## agent-synthesis — FINAL SYNTHESIS

Integrate all domains into the final report (`report/THE_STATE_OF_AMERICA.md`)
following root Sections 1–20, 40, 43, 48. Rules:

- Every headline conclusion must reference a claim ID (claims/claim_registry.json).
- Section 10/14 comparisons must show start → end → change → context; never rank
  presidents by raw change alone (root Section 10).
- Section 17 verdicts use the exact verdict vocabulary (root Section 17).
- Section 19 must name Republican strengths AND failures, Democratic strengths AND
  failures, bipartisan failures, structural problems, contradicted narratives,
  and genuinely inconclusive areas — without manufactured symmetry.
- Section 20 must answer all 15 questions and produce multiple scenarios.
- Sections 18 and current data: distinguish observed (through mid-2026) from
  forecast (CBO/consensus) from administration claims.

## agent-publish — PUBLICATION

Build three views over the same artifacts:

1. `explorer/index.html` — single-file interactive explorer: timeline, party
   comparison, indicator charts, four-year periods, claims browser, sources,
   composite index with adjustable weights, lineage view. Full-text search.
   Data embedded inline (self-contained; no network required).
2. `presentation/index.html` — multipage slideshow following root Section 40.
3. `report/THE_STATE_OF_AMERICA.md` — the primary guided publication with
   Publication Mode and Investigation Mode (root Section 43).

Every artifact must carry a lineage footer pointing to prompts, agents, datasets,
sources, and claims that produced it.

## Final QA checklist

- [ ] No claim without a source or explicit analyst-judgment flag.
- [ ] Current-period data marked observed vs estimated vs forecast.
- [ ] Party comparisons show distributions, not just means.
- [ ] Composite index discloses all underlying indicators and weightings.
- [ ] Red-team challenges preserved and answered.
- [ ] Root prompt preserved verbatim in prompts/000_root_prompt.md.
- [ ] research_manifest.json lists all artifacts and hashes where practical.
