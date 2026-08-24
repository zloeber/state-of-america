# 001 — Research Decomposition Prompt

**Parent:** `000_root_prompt.md`
**Agent:** `agent-strategy`
**Date:** 2026-08-23

## Task

Decompose the root prompt into a research program. Constraints:

1. Empirical honesty over balance. Do not manufacture symmetry or provocation.
2. Every major conclusion requires traceable evidence (Section 25, 47 of root).
3. Political control must be analyzed as: presidential party, congressional party,
   unified/divided government, Fed policy, inherited conditions, external shocks.
   Presidential terms are NOT clean causal experiments (Section 2).
4. The 1900–present scope is analyzed in four-year presidential periods, plus
   pre-1948 qualitative treatment where annual data are sparse.
5. Every conclusion must be red-teamed (Section 27) before publication.

## Decomposition into domains

| Agent ID | Domain | Core questions |
|---|---|---|
| agent-econ | ECONOMICS | Growth, employment, inflation, living standards; does growth reach ordinary Americans? |
| agent-wealth | WEALTH | Distribution of income and wealth; middle class strength; post-1980 structural change |
| agent-fiscal | FISCAL | Debt, deficits, interest burden; inherited vs accumulated debt |
| agent-health | HEALTH | Population health; spending-vs-outcomes; international comparison |
| agent-freedom | FREEDOM | Freedom House, V-Dem, EIU, Polity; define what "freedom" means; institutional health |
| agent-crises | CRISES | Bubble/crash database 1907–2023+; 5–15 year buildup analysis |
| agent-stability | SOCIAL | Crime, incarceration, poverty, addiction, polarization, unrest |
| agent-political | POLITICAL HISTORY | Timeline, legislation, control, wars, Fed chairs, SCOTUS eras |
| agent-synthesis | SYNTHESIS | Party comparison, scorecards, composite indices, myth-vs-evidence |
| agent-redteam | RED TEAM | Attempt to falsify every major conclusion |
| agent-publish | PUBLICATION | Report, explorer, presentation, datasets, lineage |

## Falsifiability standard

Each claim in the claim registry must state: (a) what evidence would support it,
(b) what evidence would contradict it, (c) the verdict, (d) confidence, (e) limitations.
Claims without an identifiable source are flagged `UNSOURCED` and excluded from the
report unless explicitly marked as analyst judgment.

## Outputs

- `agents/agent_registry.yaml` — agents, roles, model lineage (model = UNKNOWN unless
  determinable; never fabricated).
- `agents/execution_graph.json` — persistent node IDs and edges.
- `data/normalized/*.json` — datasets.
- `claims/claim_registry.json` — claims with verdicts.
- `report/THE_STATE_OF_AMERICA.md` — final publication.
- `explorer/index.html`, `presentation/index.html` — views over the same artifacts.

## Model lineage note

This research was executed by a single coding agent ("buffy") with tool access
(web search, file editing, terminal). No separate model invocations are recorded
because none occurred; where a reader expects per-invocation model metadata, it is
recorded as `"model": "UNKNOWN"` per root Section 23 (never fabricate model metadata).
