# Causal Analysis: What Can and Cannot Be Claimed

Version 1.0.0 · 2026-08-23

This document states, for each domain, the strength of causal inference the
evidence supports. It exists to prevent the report from overclaiming (root
Sections 12, 27, 38).

## 1. Party → macro outcomes (GDP, unemployment, inflation, markets)

- **Design possible in principle:** regression of outcomes on party indicators with
  controls (inherited conditions, Fed funds, oil shocks, global growth); event
  studies around elections; pre/post trend analysis. **Design actually used here:**
  descriptive means and per-administration accounting only.
- **What the literature finds:** the Democratic advantage in growth/employment/
  markets is statistically significant in most published regressions (e.g.,
  Blinder–Watson 2016, Alesina et al.) but is fragile to specification, dominated
  by a handful of administrations, and largely explained by recession timing and
  oil shocks (Blinder–Watson attribute most of the gap to these).
- **Honest verdict:** correlation documented; causation NOT established; the
  residual after timing/shocks is small and not attributable to specific policies.

## 2. Party → fiscal outcomes (deficits, debt, taxes)

- **Design:** direct policy attribution via official scorings (CBO/JCT/OMB) and
  mechanical deficit accounting. This is the **strongest** causal evidence in the
  project: when a law is enacted, its scored revenue/spending effects are the
  direct channel from policy to outcome.
- **Findings:** unfunded tax cuts raise deficits (all four major GOP-era tax bills
  scored negative); transfers reduce poverty (2021 CTC: child poverty 5.2% vs
  12.4% after expiration — a natural experiment); the 1993 tax increase plus
  growth produced surpluses. These are policy effects, not correlations.
- **Limit:** dynamic scoring debates (small fractions), and the counterfactual of
  what spending would have been without tax cuts.

## 3. Policy → inflation (1970s, 2021–22)

- **1970s:** Johnson's Vietnam+Great Society deficits and Nixon's controls and
  Fed-pressure contributed; oil shocks exogenous; Volcker's tightening ended it.
  Mixed attribution, no clean design.
- **2021–22:** economists' estimates of the ARP's contribution range ~0.1–1.5pp
  (Blanchard et al.); global supply shocks and the energy war dominated (all
  advanced economies spiked). Verdict: contributing cause, not sole cause —
  flagged `[claim-010]`.

## 4. Deregulation → crisis (2008)

- **Design:** historical narrative + mechanism (leverage rules, derivatives
  exemptions, GSE expansion). No clean counterfactual exists; the consensus
  (Financial Crisis Inquiry Commission, academic literature) assigns substantial
  causal weight to deregulation + Fed policy + global imbalances, bipartisan in
  origin. Verdict: supported as a multi-cause claim `[claim-019]`.

## 5. Inequality → instability → polarization

- **Design:** no natural experiment; mechanisms (media, sorting, elite behavior)
  not identified; crime fell while inequality rose (1991–2014), so the chain is
  not mechanical. Verdict: inconclusive; treated as hypothesis `[claim-018]`.

## 6. Democracy indices → real erosion

- **Design:** three independent indices, different methodologies, converging on
  the same dated inflection points (2016–17, 2020–21, 2025); sub-indicator
  consistency; event dating. This is a triangulation design. Limit: analyst
  coding, recency bias, and the possibility of recoverable strain. Verdict:
  supported as measurement of coded rights/liberties; interpretation as durable
  erosion is provisional `[claim-015]`.

## 7. Current administration

- No causal claims of any kind; observed data only through Aug 2026 `[claim-023]`.

## Methods explicitly NOT used (and why)

- Difference-in-differences, synthetic control, and RDD were not feasible for
  party effects (no cross-country control set for 'the US economy'; one
  observation per period). Where feasible designs exist in the literature, they
  are cited. This is a stated limitation, not a hidden one.
