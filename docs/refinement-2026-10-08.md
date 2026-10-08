# Copy and spacing refinement — 2026-10-08

The owner requested a shorter Abstract, stricter preservation of source meaning, and refinements to captions, controls, tables and task-media spacing. This release updates the website on `gh-pages`. The default `main` branch remains at `e58b48ca989f52c79f41bc6a3e862c98950213b3` with only the code-coming-soon README.

## Scientific copy

- The displayed Abstract is an explicitly requested, three-sentence summary: 107 words instead of the original 257. It preserves reconstruction-guided, pluggable flow learning; RGB-derived flow used only during training; distinct point-level forecasting and TCP-level aggregation; the simulation/real-world evaluation scope; and the additional-sensor and inference-overhead conditions. It omits the longer background critique and repeated explanations. It is a summary, not a verbatim quotation. The original PDF is unchanged.
- Method restores the complete scope of world dynamics, the point-selection motivation and the qualified observation about dynamically active regions. The future 3D flow targets are named explicitly as the antecedent. The reconstruction-quality dependency and lack of a task-relevance guarantee retain their original conditions. Sources: manuscript pages 3–5 and 8; the previously authorized author response supplies the world-dynamics scope.
- VDPM visualization wording remains the two original sentences from manuscript page 15, lines 461–464.
- Ablation adds the original LIBERO-Long setting sentence before the original dual-level-supervision conclusion, from manuscript pages 6–7, lines 207–208 and 215–217.
- Aggregation restores the intervening sentence distinguishing K motion-salient points from the top-512 points displayed by aggregation weight, from manuscript page 17, lines 486–492.
- Point composition explicitly reports average fractions across 100 random examples and identifies the MuJoCo labels used in the analysis. Its 29.1% and 84.8% values come from the authorized author-response figure. The wording no longer adds an unsupported reconstructed qualifier to its All points category or suggests a per-example/temporal increase.
- The efficiency figure uses one caption sentence, including its Seer/LIBERO-Long context.

The previous broad source-support check did not establish that every omitted qualifier preserved all nuance. This review compared individual clauses, conditions and evaluation scope. All 151 numeric cells across six tables and all 50 media/PDF assets remain unchanged.

## UI and validation

- Paper, Code and BibTeX have consistent icon buttons. Coming soon appears below Paper and Code, outside their clickable surfaces, and is associated through accessible descriptions. Paper remains unavailable until an arXiv URL exists; Code opens the repository.
- Only columns explicitly named Method remain left-aligned. Every other column, including Model, Configuration, Condition and Supervision signal, centers its header and values. Non-Method label cells use symmetric horizontal padding. All six tables have a closing rule independent of source-footer presence.
- Task-category headings have a 12-pixel gap before the images and less padding above. Instructions share a centered 68-character maximum measure. On the wide layout, the Cup & Plush instruction wraps into two lines instead of spanning the full 960-pixel column.
- Actual browser inspection at 1843, 390 and 320 CSS-pixel widths found no page overflow, clipping or console errors in the changed layouts. At 320 pixels, all three hero buttons remain on one row, each 48 pixels high, with the two availability notes below.
- Static validation confirms the reviewed copy is rendered, IDs are unique, accessibility references resolve, and all scientific table values and retained assets match the previous release. The playback/navigation JavaScript is byte-identical; the full prior playback regression suite was not repeated for these HTML/CSS changes.

## Icon provenance

The arXiv and GitHub brand paths are from [Simple Icons](https://github.com/simple-icons/simple-icons) commit `98820a4dc8c363ca72fa2c0d294ea4a0a9bba75d`: [arXiv](https://github.com/simple-icons/simple-icons/blob/98820a4dc8c363ca72fa2c0d294ea4a0a9bba75d/icons/arxiv.svg), [GitHub](https://github.com/simple-icons/simple-icons/blob/98820a4dc8c363ca72fa2c0d294ea4a0a9bba75d/icons/github.svg). The collection uses [CC0](https://github.com/simple-icons/simple-icons/blob/98820a4dc8c363ca72fa2c0d294ea4a0a9bba75d/LICENSE.md). BibTeX uses a small native document glyph. All icons are embedded and decorative to assistive technology; the controls retain text labels.

## Terminology follow-up

A fresh audit covered rendered scientific prose, headings, table names and labels, figure/video captions, accessibility descriptions, enlargement text, navigation labels and sharing metadata. It used the active manuscript PDF (SHA-256 `ee8d4bce6ac45395f5ea3b3e05099ba77b7681ca758d62b62ae85384a3053f29`) and the previously authorized additional source material, with those sources recorded separately in the local review.

`reconstruction-guided` is an original manuscript term: page 1, Abstract lines 7–8; page 2, Introduction line 49; page 3, Method line 103; and page 4, section 3.2. It remains in the page. Figure 12 likewise supplies the exact panel names Magnitude-Selected 3D Points and Aggregation-Weighted Points.

The changes restore source terminology rather than add scientific claims:

- Abstract: dual-level supervision → dual-level flow supervision. Its three-sentence structure and other wording remain unchanged.
- Method image description: RGB observation, language instruction, proprioception, VLA backbone and action latent replace broader editorial descriptions, following Figure 1 and Method.
- VDPM image descriptions: 3D point trajectories; panels are identified as panels rather than views. The gallery's accessible name is VDPM Visualization.
- LIBERO-Plus summary: seven perturbation dimensions, following Appendix A.
- Component/supervision tables: Method, Supervision Signal and Avg.; the baseline row is None (Baseline), following Tables 3–4. Success rate (%) remains the shared unit above each table.
- Real-world results heading and data-efficiency image descriptions use the manuscript heading and chart-axis terminology.

Validation: 151 numerical table cells are unchanged; all 52 non-HTML published files are byte-identical to the preceding visual-polish release. A second review of the rebuilt Abstract/Method sections found only the approved text changes. Desktop and mobile checks confirmed table alignment, readable wrapping, unique IDs and valid accessibility references. Existing source-derived panel labels and scientific qualifiers remain intact.
