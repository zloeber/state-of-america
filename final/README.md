# Final Research Package

This directory is the assembly point for the completed research package
(root Section 45). All artifacts live at the repository root; this README maps
the 17 required deliverables to their locations.

| # | Deliverable | Location |
|---|---|---|
| 1 | Publishable research report | `../report/THE_STATE_OF_AMERICA.md` |
| 2 | Polished multipage presentation | `../presentation/index.html` |
| 3 | Interactive research explorer | `../explorer/index.html` |
| 4 | Interactive political comparison | inside `../explorer/index.html` (Party Comparison tab) |
| 5 | Machine-readable datasets | `../data/normalized/*.json`, `../data/derived/*.json` |
| 6 | Source database | `../sources/source_registry.json` |
| 7 | Prompt database | `../prompts/*.md` (000–004) |
| 8 | Agent registry | `../agents/agent_registry.yaml` |
| 9 | Model registry | `../agents/agent_registry.yaml` (model = UNKNOWN, honest) |
| 10 | Research execution graph | `../agents/execution_graph.json` |
| 11 | Claim registry | `../claims/claim_registry.json` |
| 12 | Red-team/contradiction archive | `../critique/red_team/red_team_analysis.md` |
| 13 | Methodology documentation | `../analysis/methodology.md`, `../analysis/causal_analysis.md` |
| 14 | Historical timeline | `../data/normalized/political_events.json`, `four_year_periods.json` |
| 15 | Resource library | `../sources/source_registry.json` (with URLs & why-useful notes) |
| 16 | Research manifest | `../research_manifest.json` |
| 17 | Complete evidence lineage | `../research_manifest.json` + `../agents/execution_graph.json` |

**Publication Mode:** read the report top to bottom.
**Investigation Mode:** from any claim, follow Claim → Dataset → Source →
Methodology → Red Team → Prompt → Model. All paths resolve.

To package for distribution: zip the repository root (`america-state-research/`).
The explorer and presentation are single self-contained HTML files (no network
required; data embedded inline).
