# 003 — Verification & Red-Team Prompts

**Parent:** `001_research_decomposition.md`

## agent-verify — SOURCE VALIDATION

For each headline statistic, prefer: primary government series (BEA, BLS, Census,
CDC/NCHS, CBO, OMB, Treasury, Fed, FBI/BJS, HUD); international (OECD, World Bank,
WHO); academic (Saez-Zucman, Piketty, Pew, V-Dem, Freedom House, EIU). Web-verified
anchors for this run are listed in `sources/source_registry.json`. Any number that
could not be verified in this run is flagged `confidence: medium/low` with an
explicit "verify against source before citation" note. No fabricated precision:
where sources disagree (e.g., top-1% wealth share 30–42% depending on measure),
report the range and the reason for the range.

## agent-redteam — FALSIFICATION TASKS

1. **Party-growth claim:** Is the Democratic growth advantage an artifact of
   recessions clustering at Republican term starts and recoveries at Democratic
   starts? Test by excluding 2008-09, 2020, 1981-82, 1974-75, 1990-91, 2001.
2. **Wealth claim:** Is the rise in top-1% wealth share robust across measures
   (DFA vs SCF vs Saez-Zucman)? What breaks if you use each one?
3. **Debt claim:** How much of the post-2001 debt rise is tax cuts vs spending vs
   recessions vs interest? Use CBO decomposition.
4. **Health claim:** Is the US life-expectancy gap vs peers driven by measurement
   (drug deaths, homicides, traffic) or by system performance?
5. **Freedom claim:** Do V-Dem/Freedom House/EIU declines reflect actual erosion
   of rights or index design/partisan coding? Check sub-indicators.
6. **Inflation claim:** Decompose 2021-22 inflation into demand stimulus vs supply
   shocks vs energy; compare to 1970s attribution.
7. **Middle-class claim:** Is the "shrinking middle class" about income definition
   (households aging, household size) or real polarization?
8. **Stock market claim:** Are Democratic-era returns a timing artifact (starting
   valuations, crisis recoveries)?

Output format: for each task — hypothesis, evidence for, evidence against, verdict,
residual uncertainty.
