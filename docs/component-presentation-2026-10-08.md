# Table and video presentation

Table titles are independent headings above the data. Every table footer places the source reference on the left and success-rate unit on the right, with equal 12px top/bottom padding. Source and unit share 14px/21px type metrics and vertically centered nested elements. Unit-only footers stay right aligned. Descriptive columns remain left aligned; numeric headers and values are centered, and all cells use middle vertical alignment. All numbered headings share the actual left start of their number text, a 36px index column and one number type role (22px desktop, 20px mobile). Title sizes preserve section hierarchy, while each number is centered against its heading’s first line.

All 19 video identity rows use the same 16px/600 type role. Each label is centered across the full card independently of its right-aligned 14px speed metadata. Task/group headings use the shared body-sized semibold role; instructions use secondary text. Task titles and instructions form a left-aligned neutral briefing above the centered model cards, with 24px separation. All five real-world tasks and both variations share this treatment; the heading footprint remains stable while changing tabs. The aggregation group uses one cohesive “Stack Cups · Four synchronized views” line.

The LIBERO and LIBERO-Plus averages use one shared comparison component: an explicit aggregation scope, paired model labels, and before/after percentages. The eight displayed values still come directly from the canonical Average columns; no rounded-column recomputation or new real-world mean is introduced. Values use the shared 22px result role, secondary labels use 14px, and the existing result blue identifies FlowVLA values. Two comparison groups sit side by side on desktop and stack below 600px.

The two numbered VDPM figure references now use the same compact source-link typography as table references, separate from their scientific descriptions. Fruit links to Paper Figure 8 on PDF page 15; LIBERO-10 links to Paper Figure 9 on page 16. These mappings are verified against the manuscript rather than inferred from the offset asset filenames. The original-image expansion, caption wording, and media pixels remain unchanged. On narrow screens the source link wraps below the description.

Media transport uses white/transparent surfaces, neutral gray hover/press states and dark icons. Individual players use familiar play, seek, time, replay and expand controls. Shared playback uses a dark neutral Play all/Pause all pill and separate round stop/replay icon buttons. The primary action stays 120px wide; the two secondary controls are 44px squares with accessible names, native tooltips and keyboard focus outlines. The previous connected segmented frame is removed. Actions stay centered during mode changes; shared seeking sits alongside on wide groups and occupies a reserved touch row on compact groups. Gallery selection uses its pale-blue selected surface and blue underline. This selection role is independent of the neutral media/action-button surfaces. Publication brand colors and numerical result emphasis retain their separate roles.

The transport grammar was checked against the official project pages for [OpenVLA](https://openvla.github.io/), [ALOHA](https://tonyzhaozh.github.io/aloha/), and [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/). Their native controls provide the familiar reference; FlowVLA retains shared controls for synchronized comparisons.

## Validation

- Six rendered tables retain the same cell content/order, including all 151 numerical values.
- Scientific paragraphs and every image, poster and video source are unchanged.
- At 1843, 390 and 320px viewport widths, all 19 identity rows resolve to 16px/600/22.4px, with less than 0.01px center error and no speed overlap.
- All descriptive/numeric column alignments and all six unit positions passed computed-layout checks. No page overflow or broken ARIA references.
- Shared play, pause, replay, seek, stop/reset and expansion were exercised in the browser. A midpoint seek synchronized both comparison videos at 7.090416 seconds. Stop returned both to zero.
- The existing 13 player interaction checks passed. Transport targets remain at least 44px high.
- Only presentation markup/CSS changed; the player script and scientific media remain unchanged.

The summary/figure follow-up was visually checked at 1843px and 320px and measured at 1843/390/320px. There is no component or page overflow. At 320px, the five real-world task briefings are all 148px tall with equal 172px video offsets; both variation briefings are 106px tall with equal 130px offsets. All table cells, scientific paragraphs, summary values, image/video references and enlargement metadata match the prior release. Source references resolve to the verified PDF pages, and all ARIA references remain valid.

The subsequent alignment correction was checked at 1843/390/320px. All 17 numbered heading text ranges share one left edge at each width. All source/unit text centers match exactly, remain in the requested left/right positions, and retain equal 12px footer padding without overflow. The additional three-condition table has a 620px desktop measure, a 24px title gap and 12px cell block padding, adapting to available mobile width. Shared playback, pause, seek, replay, stop/reset and keyboard focus were exercised at 320px; every control remains 44px tall and the action widths remain stable. Table cells, paragraphs, averages and media sources are unchanged.


## 2026-10-09 feedback refinement

- Benchmark before/after values now use intrinsic text columns. Actual value-to-value gap is 40px at 320, 390, 768, 1270, and 1843px; both values share the same vertical center. Previous 1270px gaps were 166–178px.
- All experiment selectors use bounded, one-line labels and the existing pale-blue selected state. Two-choice selectors stack at intrinsic width on mobile. Task names appear once in selectors; panels retain accessible names and contain only task instructions above media.
- Removed the visible Real-world tasks table label. Its legacy ID now names the existing screen-reader table caption. Removed the unsupported Four synchronized views UI description; Stack Cups uses the same left-aligned 16px semibold label role as other evidence.
- Research body paragraphs use a 1.5em first-line indent. Captions, controls, table content, and instructions do not inherit it. Ablations have a 24px gap before a separating rule and 24px after it, with table titles 16px above column headers.
- Hero hierarchy uses dedicated roles: name 56px, paper title 32px, authors 18px, affiliations 16px on desktop; 40/24/16/14px on mobile. Primary HTML/CSS references: https://openvla.github.io/, https://nimolty.github.io/Seer/, https://octo-models.github.io/. Octo's full-screen title treatment was excluded.
- Gallery instruction height now measures the border box and responds to the gallery width. All five task panels keep identical video offsets after selection, including 320px. Shared play/stop and keyboard focus were verified.
- Static comparison preserved all 6 tables / 222 cells, 55 paragraphs, 2 result summaries, and 112 media/source/poster/enlargement references. All IDs are unique; aria and table-header references resolve. A second reviewer visually checked desktop/mobile hero, result summaries, task selector/instruction composition, and analysis tables.
