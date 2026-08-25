# THE STATE OF AMERICA

**Wealth, Health, Freedom, Debt & Stability Across Political Eras (1900–2026)**

A versioned research artifact investigating when America has been healthy, wealthy,
free, stable, and broadly prosperous — and what relationship, if any, political
control has with those outcomes. Optimized for empirical honesty, methodological
transparency, and falsifiability. This is **not** balanced rhetoric: conclusions
follow the evidence, favor whichever party the evidence favors, blame both where
both failed, and say "inconclusive" where that is true.

**Research date:** August 23, 2026. **Version:** 1.0.0.

## Start here

| What | Where |
|---|---|
| **The report** (publication + investigation modes) | `report/THE_STATE_OF_AMERICA.md` |
| **Interactive explorer** (charts, comparisons, claims, sources, lineage) | `explorer/index.html` |
| **Presentation** (20-slide publication) | `presentation/index.html` |
| Root prompt (verbatim) | `prompts/000_root_prompt.md` |
| Every conclusion's evidence chain | `claims/claim_registry.json` → `sources/source_registry.json` → `data/` |
| How to reproduce / verify | `analysis/methodology.md` |

## Headline findings (11)

1. America is at record wealth, income, and life expectancy — the material
   foundation is the best in its history.
2. Gains have skewed upward since ~1980; the middle class shrank in share while
   improving in absolute terms; housing is at multi-decade worst.
3. Federal debt (100% of GDP held by the public) is on an unsustainable path —
   a bipartisan failure with asymmetric mechanisms (R tax side, D spending side).
4. Financial fragility is the highest since 2007–08 (CAPE ~41, private credit,
   thin fiscal space) with a far stronger banking system.
5. Healthcare = 18% of GDP for mediocre population-level outcomes — the largest
   structural problem in both the budget and household budgets.
6. Crime is at multi-decade lows (homicide near a 75-year low in 2025).
7. Measured freedom/democracy are at 60-year lows (FH 81, V-Dem 0.57, EIU 7.65).
8. Post-WWII growth, employment, and market averages favor Democratic
   administrations — but timing and luck explain most of the gap; party is a
   weak macro cause and a strong policy cause.
9. Narrow, specific edges exist for each party (see Part 17 of the report).
10. Bipartisan failures outrank either party's achievements (debt, healthcare,
    housing, money in politics, incarceration, opioids, entitlements).
11. The Trump II administration is too early to grade; its observed first-19-months
    data are recorded with forecasts separated from facts.

## Non-negotiable lineage principle (root Section 47)

No final claim exists without a traceable chain to evidence:
**Claim → Dataset → Source → Methodology → Red Team → Prompt → Model.**
The chain of custody is `research_manifest.json`. Model metadata is recorded as
UNKNOWN where not determinable (never fabricated — root Section 23).

## Reproducibility

- Every dataset value carries a source ID, a confidence flag (HIGH/MEDIUM/LOW),
  and transformation notes.
- Every headline claim carries a claim ID with supporting and contradicting
  evidence and limitations.
- Every major conclusion was red-teamed; the attempts are preserved in
  `critique/red_team/red_team_analysis.md`.
- No number requires trusting the author: follow the source links.

## Caveats (read before quoting)

- 2025–26 values are preliminary; the current administration is incomplete.
- Top-1% wealth-share levels differ by measure (~30–42%); report ranges.
- The composite index (Part 13) is an analytical lens with disclosed weights,
  not a measure of national worth.
- Party comparisons are descriptive, not causal (see `analysis/causal_analysis.md`).

