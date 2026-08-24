# Methodology

Version 1.0.0 · 2026-08-23 · Parent: prompts/003, prompts/004

This document records how every number in this project was produced, transformed,
and flagged. It exists so that an economist, statistician, or independent
researcher can reproduce or challenge the analysis (root Section 46).

## 1. Data provenance chain

```
Raw (primary agency) → normalized (data/normalized/*.json) → derived (data/derived/*.json) → published (report/explorer/presentation)
```

Raw data was never modified in place; no raw files were downloaded into this
repository (the run used web-verified values from primary sources). Where a value
was transcribed from knowledge of a standard series rather than a fresh download,
it carries `quality: MEDIUM` or `LOW` and an explicit note. Verified values carry
`quality: HIGH` and a `status: verified` source entry.

## 2. Series construction notes

| Series | Source | Period | Adjustments | Quality |
|---|---|---|---|---|
| Real GDP growth | BEA NIPA | 1930–2025 | Annual-average YoY %; 2025 verified | HIGH |
| Unemployment | BLS CPS | 1948–2025 | Annual averages, seasonally adjusted | HIGH |
| CPI | BLS CPI-U | 1913–2025 | Annual average % change | HIGH |
| Real median household income | Census CPS ASEC | 1967–2024 | 2024$ via Census; 2019–24 verified; earlier approximate | MEDIUM |
| Median weekly earnings | BLS CPS | 1979–2024 | 2024$; APPROXIMATE (LOW) | LOW |
| Debt held by public / GDP | OMB, Treasury, CBO | 1940–2025 | FY basis; 2024–25 verified | MEDIUM |
| Deficits / GDP | OMB | FY1929–2025 | FY basis | MEDIUM |
| Net interest / GDP | Treasury, CBO | 1980–2025 | FY basis; FY2025 verified | HIGH |
| Life expectancy | CDC NVSS | 1900–2024 | 2020–24 verified; early decades Historical Statistics | HIGH |
| Healthcare spending | CMS NHE | 1960–2024 | % of GDP; 2024 verified | HIGH |
| Top-1% wealth share | Fed DFA / Saez-Zucman / SCF | 1978–2024 | RANGES reported; measures differ by method — never averaged into one number | HIGH (direction), MEDIUM (levels) |
| Freedom indices | Freedom House, V-Dem, EIU | 1973–2026 | 2025–26 values verified | HIGH |
| Crime | FBI UCR | 1960–2024 | 2021+ estimated via NIBRS transition; flagged | MEDIUM |
| CAPE | Shiller | 1871–2026 | Monthly; Jul–Aug 2026 verified | HIGH |

## 3. Transformations

- **Inflation adjustment:** all income/wealth dollar values are 2024$ using the
  Census/BLS constant-dollar methodology of the source agency; no re-inflation was
  performed by this project.
- **Normalization (composite index):** each dimension scored 0–100 by min-max
  normalization of its underlying indicators over their 1970–2024 observed range
  (inverse indicators: inequality, debt, deficits, interest, infant mortality,
  overdose deaths, obesity, homicide, poverty, homelessness, incarceration,
  polarization — inverted before scaling). Decade score = mean of indicator scores
  (equal within dimension). Weights across dimensions per model in
  `data/derived/composite_index.json`. All underlying values are disclosed; the
  index is explicitly an analytical lens, not a measure of national worth.
- **Party averages:** calendar-year party-of-president assignment (year belongs to
  the party holding the presidency for the majority of the year); 1948–2024.
  Sensitivity to window choice is discussed in `party_scorecards.json`.
- **Interpolation:** none performed for display purposes except decade-benchmark
  charts in the explorer, which connect benchmark points with straight lines and
  label them "benchmark years".
- **Missing data:** pre-1929 GDP and pre-1948 unemployment are recorded as null
  with qualitative notes rather than estimated, except where explicitly flagged
  (e.g., Hoover-era unemployment ~25% is a documented estimate, flagged LOW/MEDIUM).

## 4. Attribution rules (root Section 5)

Debt accumulation is attributed to **legislation, wars, recessions, interest rates,
and growth** — never mechanically to the president. For each administration, the
dataset records debt inherited vs debt accumulated, with the main drivers listed.
Where a driver's share is estimated (e.g., post-2001 debt decomposition), the
estimate is labeled as such and sourced to CBO/CRFB analyses.

## 5. Known limitations (read before citing)

1. **Sample size:** 37 Democratic vs 40 Republican calendar years; ~14 completed
   post-WWII administrations. No power to detect small policy effects.
2. **Contamination:** business-cycle timing, oil shocks, and the Fed dominate
   macro outcomes; party attribution is descriptive, not causal.
3. **Measurement:** top-1% wealth differs by method (~30–42%); FBI crime data
   changed methodology in 2021; life-expectancy revisions are routine; SPM vs
   official poverty differ; CPI may understate experienced inflation (substitution,
   housing methodology) — all flagged in the datasets.
4. **Recency:** 2025–26 values are preliminary; the current administration is
   incomplete and all verdicts on it are provisional.
5. **The composite index** is a heuristic; changing weights changes decade
   rankings (disclosed in full).
6. **No fresh regressions were run in this run.** Where econometric findings are
   cited (Blanchard on ARP, Chetty on mobility, Case–Deaton on despair, Saez–
   Zucman on concentration), they are cited with sources, not re-estimated.

## 6. Reproducibility

All values are in the JSON datasets with sources and quality flags. To verify any
number: open `sources/source_registry.json`, find the source ID, and fetch the
primary series. The explorer renders directly from the same datasets (embedded
inline at build time). No closed computations exist.
