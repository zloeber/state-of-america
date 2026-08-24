# Red-Team & Contradiction Analysis

Version 1.0.0 · 2026-08-23 · Parent: prompts/003 (agent-redteam)

Every headline conclusion was subjected to a falsification attempt: find
contradicting evidence, alternative explanations, biases, measurement problems,
and weak causal inference. A conclusion survives only if its best counterargument
fails to overturn it. This document records both sides. The verdicts below are
deliberately harsh: the goal was to break the report's conclusions.

---

## RT-1 — Is the Democratic growth advantage an artifact of recession timing?

**Hypothesis to falsify:** Democrats look better on growth/unemployment only
because recessions cluster at Republican term starts and recoveries at Democratic
starts; excluding crisis-start years, the gap vanishes.

**Evidence for the hypothesis:** 11 of 13 post-WWII recessions began under
Republican presidents. Recoveries (1961, 1977, 1993, 2009, 2021) all began under
Democrats. The 1948–49 recession (Truman) and 1980 (Carter) are the D exceptions.
Blinder–Watson (2016) attribute most of the Democratic growth edge to oil shocks
and productivity, not party.

**Evidence against:** even excluding the four largest R-era recessions
(1981–82, 1990–91, 2001, 2007–09), R-era averages remain below D-era averages in
most windows (1983–2000 vs 1993–2000 comparisons favor D; 2017–19 R boom was
solid but brief). The gap persists in Blinder–Watson's preferred specification
(~0.5–1pp after controls), though not robustly significant.

**Verdict:** The hypothesis is **partially correct**: timing explains a large
share of the gap. The report's claims (`claim-001`, `claim-002`) already state
the direction is robust but the magnitude and causation are not. Conclusion
survives in weakened form: the data support "Democratic administrations have
coincided with higher growth," not "Democratic policy causes higher growth."

---

## RT-2 — Is the rise in top-1% wealth share robust across measures?

**Hypothesis to falsify:** the wealth-concentration rise is a measurement artifact
of the Saez–Zucman capitalization method; the Fed DFA shows top-1% share in 2024
(~30.5%) barely above 1989 (~30%).

**Evidence for:** DFA indeed shows no net rise over 1989–2024 (mid-30s peak in
2015, then decline). SCF shows ~30% → ~34–35%. Only SZ's ~25%→~42% shows a large
rise, and it depends on capitalization assumptions (risky) and offshore estimates.

**Evidence against:** the DFA/SCF series **start in 1989**, after the great
compression's trough — the biggest part of the rise (1980–1990, from ~25% to
~30%) is invisible to them. SZ covers 1978 onward and its 1980s rise is
corroborated by estate-tax data. Income concentration (Gini 0.386→0.49; top-1%
income share 10%→19–21%) is not method-dependent and shows the same trend.

**Verdict:** The direction claim survives for **1980→present**; the level and
timing differ by measure. The report already reports ranges; it must not and does
not cite a single number for "top-1% share today." Conclusion survives.

---

## RT-3 — Is the debt problem really bipartisan, or is one party dominant?

**Hypothesis to falsify:** "bipartisan failure" is false symmetry; the data might
show one party dominant.

**Evidence examined:** (a) Republican eras raised debt/GDP in every case since
1981 (Reagan +13pp, Bush41 +8, Bush43 +20, Trump1 +23). (b) Democratic eras:
Clinton −14.5pp, Obama +24 (of which ~+20pp in FY2009–11, crisis costs), Biden
~0, Truman −37 (deleveraging), Johnson −14. (c) Spending bills: D-led ARRA,
ARP, IRA; R-led tax cuts and wars. (d) Post-2001 decomposition (CRFB): roughly
1/3 tax cuts, 1/3 spending, 1/3 interest.

**Verdict:** The data do NOT support "one party owns the debt." The tax side is
predominantly Republican (all four major tax cuts since 1981 were R-led, plus
2025's OBBBA); the transfer/spending side is predominantly Democratic
(Medicare/Medicaid expansions, ARP); wars, crises, recessions, and interest are
shared. "Bipartisan" survives as the accurate label; "asymmetric in mechanism"
is the refinement. Conclusion survives with the refinement recorded in the
report (Part 5.2, Part 17).

---

## RT-4 — Is the US life-expectancy gap vs peers a measurement artifact?

**Hypothesis to falsify:** US life expectancy looks bad only because of homicide
and overdose deaths (behavioral), not healthcare system performance.

**Evidence for:** excess US mortality is concentrated in ages 15–64, driven by
homicides, overdoses, suicides, and car crashes (Case–Deaton; Woolf). US 65+
survival is closer to peers. If you strip external causes, the gap narrows by
roughly half.

**Evidence against:** the other half is real system underperformance: infant
mortality 5.6 vs ~3–4 (access/care-quality issue, not behavior of infants),
maternal mortality 2–5× peers, obesity driving diabetes/CVD, and insurance gaps
that delay care. Peer comparisons use the same data standards; the gap at 65+ is
still ~1–2 years behind peers.

**Verdict:** Partially correct — the gap is behavioral/structural, not purely
"the doctors are worse." But "spending does not buy commensurate outcomes"
survives: no other country spends remotely close to 18% of GDP for these
outcomes. Conclusion survives with the behavioral caveat stated (already in
report Part 7.2).

---

## RT-5 — Are the democracy-index declines coding artifacts or partisan bias?

**Hypothesis to falsify:** V-Dem/FH/EIU declines reflect analyst ideology or
attention bias, not real erosion.

**Evidence for:** indices are analyst-coded; the 2025 V-Dem drop (−24%) is
unusually large for one year; coding of "executive constraints" can over-weight
speech; Freedom House is US-funded (but scores many allies low); the EIU is a
commercial product with its own incentives. Polity (more mechanistic) still codes
the US at 10.

**Evidence against:** three independent organizations with different
methodologies converged on the same dated inflection points (2016–17, 2020–21,
2025); sub-indicators (electoral administration, media freedom, judicial
independence) moved together; the specific events cited (Jan 6, election denial,
2025 executive actions) are observable facts, not coding choices; Polity's
insensitivity is itself a known limitation (it misses gradual erosion).

**Verdict:** The measurement critique is valid as a *caveat* (recency bias,
attention) but does not overturn the direction. The report's claim (`claim-015`)
is already phrased as "measured freedom," distinguishing index measurement from
objective fact. Conclusion survives.

---

## RT-6 — Was the 2021–22 inflation caused by the American Rescue Plan?

**Hypothesis to falsify:** "global supply shocks" is an excuse; ARP size was the
dominant cause.

**Evidence for:** ARP was ~$1.9T against an output gap that CBO estimated at
~$0.8T (2021); Blanchard argued it was 2–4× too large; household excess savings
fueled demand; US demand recovered faster than peers; core inflation 6.6% was
still high in absolute terms.

**Evidence against:** Eurozone (smaller stimulus) peaked at 10.6% CPI, UK 11.1%,
Canada 8.1% — above or near US 9.1%; the dominant drivers were supply-chain
disruption, energy war shock, and food prices; US core peaked lower than most
peers; wage growth lagged prices (no wage-price spiral); the Fed's "transitory"
error delayed tightening for all countries.

**Verdict:** Split verdict, as recorded: ARP was a **contributing cause**
(est. 0.1–1.5pp), not the dominant or sole cause. The claim in the report
(`claim-010`) says exactly this. Conclusion survives in its hedged form.

---

## RT-7 — Is the "shrinking middle class" a definitional artifact?

**Hypothesis to falsify:** the middle-class share fell because of household
demographics (more seniors, more single-adult households), not economic
polarization.

**Evidence for:** household composition changed (aging, fewer married couples,
more singles), mechanically pushing households out of the middle-income band;
Pew's band (2/3–2× median) is sensitive to household size adjustments.

**Evidence against:** the middle class's share of *aggregate income* also fell
(62%→43%) — a dollar-weighted measure insensitive to household-count composition;
the income distribution genuinely polarized (Gini 0.386→0.49); real wages for
the median were flat 1970–2015 while top incomes soared; income *growth* at the
50th percentile lagged the 90th by a wide margin.

**Verdict:** Composition explains some of the household-count decline but not
the income-share decline. "Shrunk relatively, improved absolutely" survives.
Conclusion survives.

---

## RT-8 — Are Democratic-era stock returns a timing artifact?

**Hypothesis to falsify:** markets rise under Democrats because D terms start at
crisis lows (2009, 2021) and R terms at peaks (2001, 2017, 2025).

**Evidence for:** term-start valuation levels differ systematically; mean
reversion explains much of the return gap; Hensel (1995) found the effect across
1928–1993 but noted small samples; the gap shrinks using risk-adjusted or
dividend-adjusted measures in some specifications.

**Evidence against:** the effect persists across the full sample (1928–2024)
and across regimes (pre- and post-1980); small-cap studies find the same
direction; no major study finds the reverse. The gap also reflects that
Democratic terms coincided with productivity booms (1960s, 1990s, 2010s).

**Verdict:** Timing is a large part of it; a residual direction survives. The
report (`claim-004`) already says "robust direction, contaminated timing."
Conclusion survives in that hedged form.

---

## RT-9 — Is "America is richer than ever" survivorship/aggregation bias?

**Hypothesis to falsify:** record median income and wealth are artifacts of
aggregation (household size, cost-of-living, transfer-counting).

**Evidence for:** household income counts transfers (SS, EITC) and uses CPI-U
(which some argue understates housing/insurance costs); household size shrank
(income per person rose slower than per household); 2021–24 records were boosted
by pandemic-era transfers and asset appreciation.

**Evidence against:** even with adjustments, real income per capita roughly
doubled since 1980; consumption data show rising quality and quantity across
deciles; the bottom decile's real wages grew fastest 2019–24; poverty (SPM) is
far below 1960s levels.

**Verdict:** "Richer" survives in aggregate and median terms with the skew and
affordability caveats already stated. The claim's honest form ("richer, skewed,
with eroded affordability") is what the report says (`claim-014`). Survives.

---

## RT-10 — Is the current-administration section premature?

**Hypothesis:** any assessment of Trump II is unfair/premature; only 19 months of
data exist; policy effects lag.

**Evidence:** GDP, unemployment, CPI, deficits, interest, CAPE, democracy-index
scores, and crime data are all observed and verified through Aug 2026. The report
marks every verdict as preliminary, separates observed from forecast, and refuses
evaluative verdicts.

**Verdict:** The criticism is correct that no *evaluative* verdict is warranted;
the report agrees and says so explicitly (`claim-023`). The descriptive section
survives because it only reports observed data and official projections.

---

## Overall red-team conclusion

No headline conclusion was overturned. Several were weakened and refined:
the party-growth gap (RT-1), the top-1% wealth level (RT-2), the debt attribution
(RT-3), the health-gap decomposition (RT-4), the inflation attribution (RT-6),
and the stock-return timing (RT-8). Each refinement is already reflected in the
claims registry and report text. The conclusions that survived their strongest
attacks: wealth concentration rose since 1980 (direction); debt is unsustainable
and bipartisan-with-asymmetric-mechanisms; the middle class shrank relatively
and improved absolutely; measured democracy is at multi-decade lows; healthcare
spending buys poor population-level health; the party-growth correlation is real
but causally weak; current fiscal/financial/institutional conditions are the
weakest since 2007–08.
