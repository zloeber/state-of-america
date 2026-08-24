# 002 — Domain Agent Prompts

**Parent:** `001_research_decomposition.md`

Each domain agent receives the same standing instructions, then its domain brief.
Standing instructions (abridged from root prompt): report what the evidence shows;
do not manufacture symmetry or provocation; distinguish observed / estimated /
forecast; identify confounders; never claim causation without design support.

---

## agent-econ — ECONOMICS

Series to assemble (source in parentheses): real GDP growth, annual 1930–2025 (BEA
NIPA); GDP per capita (BEA); unemployment 1948–2025 (BLS CPS, seasonally adjusted,
annual average); CPI-U 1913–2025 (BLS); real median household income 1967–2024
(Census CPS ASEC, 2024$); real median weekly earnings 1979–2025 (BLS CPS, 2024$);
labor force participation 1948–2025 (BLS); productivity (BLS multifactor/labor,
benchmark eras); housing affordability (NAR median price/median income); homeownership
(Census). Determine: has growth reached ordinary Americans, in which eras, and why?

## agent-wealth — WEALTH

Series: top 1% / top 10% / bottom 50% wealth shares (Fed DFA 1989–2024; Saez-Zucman
benchmarks 1980–2024; SCF survey points). Income shares (Census Gini 1967–2024;
Piketty-Saez-Zucman top-decile income share). Middle-class share (Pew 1971–2023).
Union density (BLS 1983–2024). Assess post-1980 structural change; distinguish
market forces (technology, globalization, financialization) from policy (tax,
deregulation, antitrust, monetary). Determine: is the middle class stronger or weaker?

## agent-fiscal — FISCAL

Series: gross federal debt, debt held by public, both % of GDP, 1940–2026 (OMB/
Treasury/CBO); deficit and deficit/GDP FY1929–2025 (OMB); revenue/GDP, outlays/GDP
(OMB); net interest $ and % of GDP and % of revenue (Treasury/CBO); mandatory vs
discretionary (OMB). Per-administration: debt inherited vs accumulated (Δ in debt
held by public in $ and % of GDP); attribution split among tax policy, spending,
recessions, wars, emergencies, interest, growth. Never mechanically attribute debt
to the president (root Section 5). Score the major tax bills (ERTA 1981, TRA 1986,
Bush 2001/2003, TCJA 2017, IRA 2022, OBBBA 2025) using CBO/CRFB/JCT estimates.

## agent-health — HEALTH

Series: life expectancy 1900–2024 (CDC NVSS / Historical Statistics); infant
mortality 1900–2023 (CDC); maternal mortality 1990–2023 (CDC); obesity (NHANES);
drug overdose deaths (CDC); suicide (CDC); healthcare expenditure % of GDP 1960–2024
(CMS NHE); insurance coverage (Census CPS 1990–2024); international comparison
(OECD: US vs peer life expectancy, infant mortality, spending). Determine whether
increasing spending has translated into improved population health.

## agent-freedom — FREEDOM

Series: Freedom House Freedom in the World 1973–2026 (US 94→81); V-Dem Liberal
Democracy Index 1900–2025 (US 0.75→0.57 in 2025, lowest since 1965); EIU Democracy
Index 2006–2025 (US 7.65, 34th, flawed democracy); Polity 2 score (1900–2020);
Pew polarization and institutional trust; Gallup trust in government. Define exactly
what is measured: political rights and civil liberties as scored by these indices;
NOT policy preferences. Distinguish "freer than 1950 (McCarthyism, segregation)"
from "declining since ~2015".

## agent-crises — CRISES

Database of: Panic 1907; 1929 crash + Great Depression; S&L crisis; Black Monday
1987; dot-com; housing/2008 GFC; COVID crash 2020; 2023 regional banking; current
valuation conditions (CAPE ~41, Aug 2026). For each: 5–15 year buildup, leverage,
credit conditions, regulation, monetary policy, trigger, response, recovery,
distributional consequences. Test the fragility cycle hypothesis (root Section 16).

## agent-stability — SOCIAL

Series: violent crime & homicide rates (FBI UCR, 1960–2024); incarceration (BJS,
1925–2023); poverty & child poverty (Census, 1959–2024); overdose deaths (CDC);
suicide (CDC); homelessness (HUD, 2007–2024); geographic divergence (BEA state
GDP); polarization (Pew); political violence (ACLED/violence studies, qualitative);
trust (Gallup/Pew). Examine inequality→instability→polarization chain WITHOUT
assuming causality.

## agent-political — POLITICAL HISTORY

Construct timeline 1900–2026: president, party, House/Senate control, unified/
divided, Fed chair, major legislation, tax reforms, wars, recessions (NBER), crises,
SCOTUS era. Classify each administration's inherited environment (boom/expansion/
bubble/recession/crisis/shock/transition).

## agent-synthesis — SYNTHESIS

Build: four-year period observations; party scorecards (median, mean, best, worst);
composite index (8 dimensions × 5 weightings — see root Section 13); myth-vs-evidence
verdicts (root Section 17); scenarios (root Section 20). All aggregation documented
in `analysis/methodology.md`. Composite is an analytical visualization, not a measure
of national worth.

## agent-redteam — RED TEAM

For every headline conclusion, attempt to: find contradicting evidence; propose
alternative explanations; identify selection/survivorship bias; find measurement
problems; test partisan framing; attack causal inference. Output in
`critique/red_team/red_team_analysis.md`. A conclusion survives only if it withstands
its best counterargument.
