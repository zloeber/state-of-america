# AGENTS.md — The State of America research project

Working manual for agents extending or maintaining this project. Read this before
editing anything. It explains what the project is, the two rules that must never be
broken, where every artifact lives, how to extend it safely, and the traps that
have already been hit.

---

## 1. What this is (30 seconds)

A **versioned, self-contained research artifact** investigating the health of the
United States from 1900–2026 (economy, wealth, debt, health, freedom, stability,
political control). Delivered as:

- a full research report (`report/THE_STATE_OF_AMERICA.md`)
- an interactive explorer (`explorer/index.html`) — charts, party comparison,
  per-administration comparison, 32 four-year periods, adjustable-weight composite
  index, claims/sources/crises browsers, full-text search, embedded report
- a 20-slide presentation (`presentation/index.html`)
- 16+ machine-readable datasets, a claim registry, a source registry, a red-team
  archive, prompt lineage, and a research manifest (chain of custody)

**Research date:** August 23, 2026 · **Version:** 1.0.0.

The product is **empirical honesty**: no manufactured balance, no fabricated model
metadata, ranges when measures disagree, "inconclusive" where that is true. Every
conclusion must survive its own red-team.

## 2. The two rules that must never be broken

### Rule 1 — Lineage (root Section 47)
No final claim exists without a traceable chain:
`Claim → Dataset → Source → Methodology → Red Team → Prompt → Model`.
Every artifact traces to `research_manifest.json`. Model metadata is recorded as
**UNKNOWN** where not determinable — never fabricate it (root Section 23).

### Rule 2 — Duplication sync (the #1 practical mistake)
`explorer/index.html` is **self-contained**: it embeds its own copies of the
datasets AND the entire report. Editing a canonical file (JSON in `data/`,
`claims/`, `sources/`) without updating the matching embedded copy in the explorer
silently desyncs the explorer. **Any data change touches at least two files.**

---

## 3. Directory map

| Artifact | Canonical source | Also embedded in explorer |
|---|---|---|
| Report | `report/THE_STATE_OF_AMERICA.md` | Full text, verbatim, in the `<script type="text/markdown" id="reportMd">` block |
| Administrations | `data/normalized/administrations.json` | `ADMINS` array (per-admin comparison) |
| Four-year periods | `data/normalized/four_year_periods.json` | `PERIODS` |
| Economic series | `data/normalized/economic_indicators.json` | `GDP`, `SERIES`, `PARTY_AVG`, `PRESIDENT_YEAR`, `RECESSIONS` |
| Wealth series | `data/normalized/wealth_indicators.json` | `SERIES.top1Wealth` |
| Debt series | `data/normalized/debt_indicators.json` | `SERIES.debtGdpPublic` |
| Health series | `data/normalized/health_indicators.json` | `SERIES.lifeExpectancy` |
| Freedom series | `data/normalized/freedom_indicators.json` | `SERIES.freedomHouse/vdem/eiu` |
| Social series | `data/normalized/social_indicators.json` | — |
| Financial crises | `data/normalized/financial_crises.json` | `CRISES` |
| Political events | `data/normalized/political_events.json` | `EVENTS` |
| Party scorecards | `data/derived/party_scorecards.json` | `PARTY_AVG` |
| Composite index | `data/derived/composite_index.json` | `COMPOSITE`, `DECADES` |
| Claims | `claims/claim_registry.json` | `CLAIMS` array |
| Sources | `sources/source_registry.json` | `SOURCES` array |
| Red-team archive | `critique/red_team/red_team_analysis.md` | — |
| Methodology | `analysis/methodology.md`, `analysis/causal_analysis.md` | — |
| Prompts (versioned) | `prompts/000…004_*.md` | `LINEAGE` (summary) |
| Agent registry / exec graph | `agents/agent_registry.yaml`, `agents/execution_graph.json` | — |
| Chain of custody | `research_manifest.json` | — |
| Presentation | `presentation/index.html` (standalone static deck) | — |

**Counts to keep in sync:** `research_manifest.json` tracks source count (currently
32) and claim count (currently 30). Update when adding.

---

## 4. Common workflows

### 4.1 Add or change a claim
1. Add the entry to `claims/claim_registry.json` (id `claim-0NN`, statement,
   verdict, confidence, sources, datasets, supporting/contradicting evidence,
   limitations, red_team).
2. Add the matching object to the `CLAIMS` array in `explorer/index.html` with
   the same `id`, plus `src` (source ids) and `ds` (dataset names).
3. Bump `research_manifest.json` claim count.
4. The claim is automatically searchable and appears in the Claims tab.

### 4.2 Add or change a source
1. Add the entry to `sources/source_registry.json` (id `source-0NN`, name, org,
   type, scope, period, url, quality, status, note).
2. Add the matching object to the `SOURCES` array in `explorer/index.html`
   (`id`, `name`, `org`, `type`, `q`, `note`).
3. Bump `research_manifest.json` source count.

### 4.3 Add or change an administration (per-admin comparison)
1. Canonical: add to `data/normalized/administrations.json` following the existing
   schema (id `admin-YYYY-name`, inherited_environment, per-field values with
   confidence flags, recessions, crises, major_events, verdict_note).
2. Explorer: add to the `ADMINS` array. Compact schema:
   `{id, name, party:"D"|"R", years, gdp, u0, u1, inf, debt0, debt1, def, sp, inherited, note}`
   — use `null` for anything not measured (pre-1929 unemployment/CPI, pre-1926
   S&P). The comparison table reads only these fields. The card shows
   `inherited` + `note` — put sourcing and caveats in `note`.
3. Pre-1948 economic data is LOW confidence by convention — say so in the note.

### 4.4 Edit the report
1. Edit `report/THE_STATE_OF_AMERICA.md` first — it is the canonical artifact.
2. **Re-embed** it into the explorer's `<script type="text/markdown" id="reportMd">`
   block, byte-for-byte. See §5 for the embedding procedure and the `</script`
   constraint.
3. Verify with the diff command in §7.3.

### 4.5 Edit the presentation
`presentation/index.html` is a standalone static deck with keyboard navigation
(arrow keys / space). Slide data is inline HTML — there is no loader. It cites
dataset paths but does not read them, so figure changes in the deck are manual.
Check the rendered slides after edits (see §7).

### 4.6 Add an indicator / chart series
Add the series to the matching normalized JSON, then to `SERIES` (or `GDP` /
`PRESIDENT_YEAR` / `RECESSIONS`) in the explorer, then add/update the chart call in
the `/* ---------- Charts ---------- */` section and its note in the Timeline tab.
`lineChart(el, seriesArr, opts)` takes `{years, vals}` and optional `{lo, hi}`
range bands, `{min, max}`, `{color}`, `{lw}`, `{op}`.

---

## 5. Embedding the report in the explorer (critical procedure)

The Report tab renders markdown client-side from a raw-text script block
(`<script type="text/markdown" id="reportMd">` … `</script>`) holding the full
report verbatim.

Constraints and procedure:

- The block is raw text until the literal `</script` — the report **must never
  contain that sequence** (check with `grep -n '</script'`).
- Backticks, `${`, em-dashes, `→` etc. are all safe inside the block; only
  `</script` terminates it.
- **Large single tool-call payloads get truncated.** Embed in ~12–15KB chunks:
  insert the block with a unique marker (`<!--REPORT_BODY-->`), then repeatedly
  replace the marker with `chunk + "\n" + marker`, ending by deleting the marker.
  Chunk boundaries must fall at line ends (splitting inside a table is fine).
- The explorer's markdown renderer (`mdToHtml`) supports: `#`–`####` headings
  (`## PART N — …` gets `id="part-N"` and is added to the jump-to-part dropdown),
  pipe tables (header row + `|---|---|` separator), `-`/`*` bullets, `1.` lists,
  `>` blockquotes, `---` rules, `**bold**`, `*italic*`, `` `code` ``, and
  `[text](https://…)` links. **No fenced code blocks, no nested lists, no images** —
  add support to the renderer before using such syntax.

---

## 6. Conventions (follow them)

- **IDs:** `claim-0NN`, `source-0NN` (next free: claim-031, source-033),
  `admin-YYYY-name` in JSON, short ids in the explorer `ADMINS` (e.g. `buchanan`,
  `truman`). Never renumber existing IDs.
- **Confidence flags:** HIGH = verified this run against a primary source;
  MEDIUM = stable primary series reproduced from knowledge of the series; LOW =
  approximate/estimated — flag and explain. Pre-1948 values are LOW by default.
- **Verdict vocabulary:** strongly supported / supported / mostly supported /
  mixed / mostly unsupported / unsupported / contradicted / insufficient evidence.
- **Ranges, not false precision:** where measures disagree (e.g. top-1% wealth
  share 30–42% depending on method), report the range and why the measures differ.
- **Party comparisons are descriptive, not causal.** Always frame as "starting
  condition → ending condition → change → context". Never rank presidents by raw
  changes. The comparison table's **Overall winner** is an unweighted count of
  per-metric edges (higher better for growth/S&P/deficit-balance; lower better for
  unemployment/inflation/debt-change) and is explicitly caveated, never presented
  as a verdict.
- **Raw data is never modified in place:** raw → normalized → derived → published,
  with transformations documented in `analysis/methodology.md`.
- **Honesty rules:** no manufactured symmetry, no manufactured partisan
  conclusions; where a common partisan narrative is contradicted, say so
  explicitly; where evidence is inconclusive, say so.

---

## 7. Verification workflow (run before finishing any task)

### 7.1 JSON validity
Every edited JSON file must parse:
```bash
node -e "JSON.parse(require('fs').readFileSync('FILE','utf8'));console.log('OK')"
```

### 7.2 Explorer integrity
```bash
grep -n 'REPORT_BODY' explorer/index.html   # must return nothing (stale marker)
grep -c 'text/markdown' explorer/index.html # must be 1
```

### 7.3 Embedded report matches the source
```bash
awk '/<script type="text\/markdown" id="reportMd">/{f=1;next} /<\/script>/{f=0} f' \
  explorer/index.html | grep -v '^$' | diff - <(grep -v '^$' report/THE_STATE_OF_AMERICA.md)
```
Only blank-line differences (at chunk boundaries) and a missing trailing newline
are acceptable. Any content line diff means the embedding is stale.

### 7.4 Live preview (the reliable way to check the UI)
- Register `explorer/index.html` with the preview tool, then **reload after every
  edit**: the preview server serves a cached snapshot of the file and can be one
  or more edits stale. A stale preview is the #1 source of confusion.
- The preview server serves **only the registered HTML file** — `fetch()` of
  sibling files returns 404. The explorer must stay fully self-contained.
- Verify with `preview_snapshot` (accessibility tree) and `preview_evaluate`
  (DOM checks, e.g. `renderAdmCompare()` then inspect rows; `openReport('part-19')`
  then check `scrollY`). Check `preview_logs` for console errors.
- Screenshots may be unavailable in headless — prefer DOM evaluation.

---

## 8. JS/HTML gotchas (learned the hard way — do not relearn them)

- **`null - null === 0` in JS arithmetic.** When a metric is missing, `u1 - u0`
  is `0`, not `null` — an unguarded comparison will treat missing data as a
  real "+0" change. The comparison's `chg()` guards on `v[0]`/`v[1]`/`v[2]`
  being `null`. Keep that pattern for any new metric.
- **Nested template literals** inside `.map()` callbacks break the outer literal.
  Use string concatenation in the comparison row builder.
- **Large `str_replace` payloads get truncated mid-string.** Chunk big insertions
  (see §5). This has happened; chunking works.
- **The md script block ends at `</script`** — never introduce that sequence into
  the report text.
- **`openReport('part-19')`** (Overview summary link) calls `showTab('report')`
  then `scrollIntoView`; the anchor exists because the renderer gives every
  `## PART N` heading `id="part-N"`. If a report edit removes/renumbers a part,
  check the link target still exists.
- **Search synonyms:** the search box expands query words via the `SYNONYMS`
  map (e.g. "debt" → fiscal/deficit/interest). If new vocabulary becomes common,
  extend `SYNONYMS` — otherwise searches for it return "No matches" even though
  the data is present.

---

## 9. Extension directions the project is explicitly ready for

- **Fresh econometrics.** The report deliberately declined to run regressions /
  diff-in-diff (Part 12.3 flags this as a limitation). Running the party-effect
  regressions with the red-team's controls (timing, Fed policy, global shocks,
  inherited conditions) is the single highest-value extension.
- **New administrations** as data arrives — Trump II figures are all preliminary;
  the framework treats incomplete periods the same way (`INCOMPLETE` flag, observed
  vs forecast separated).
- **New indicators** — add to normalized JSON + `SERIES` + a chart + Timeline note.
- **Explorer features** — claims drill-down, more comparison metrics, historian
  ranking overlays (Buchanan/Trump survey-rank data exists in sources 031–032),
  composite-index refinements.

---

## 10. What NOT to do

- Do **not** renumber existing claim/source/admin IDs.
- Do **not** silently overwrite prompts — `prompts/000_root_prompt.md` is the
  preserved root; lineage is versioned (append new prompt files, keep old ones).
- Do **not** manufacture balance or partisan conclusions to please either side.
- Do **not** treat the explorer's embedded data as the canonical source — the
  JSON files under `data/`, `claims/`, `sources/` are canonical.
- Do **not** modify files outside `america-state-research/` — the workspace root
  also contains unrelated projects (e.g. `emotion-ontology`).
- Do **not** commit, push, or deploy unless explicitly asked.
- Do **not** run destructive commands (`git reset`, force ops, production
  touching anything) without explicit permission.
