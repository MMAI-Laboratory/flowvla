# Table and video presentation

Table titles are independent headings above the data. Every success-rate unit appears below its table beside the source reference where available. Descriptive columns remain left aligned; numeric headers and values are centered, and all cells use middle vertical alignment. Numbered subsection headings share the same number/title start positions as section headings.

All 19 video identity rows use the same 16px/600 type role. Each label is centered across the full card independently of its right-aligned 14px speed metadata. Task/group headings use the shared body-sized semibold role; instructions use secondary text. Task titles and instructions form a left-aligned neutral briefing above the centered model cards, with 24px separation. All five real-world tasks and both variations share this treatment; the heading footprint remains stable while changing tabs. The aggregation group uses one cohesive “Stack Cups · Four synchronized views” line.

The LIBERO and LIBERO-Plus averages use one shared comparison component: an explicit aggregation scope, paired model labels, and before/after percentages. The eight displayed values still come directly from the canonical Average columns; no rounded-column recomputation or new real-world mean is introduced. Values use the shared 22px result role, secondary labels use 14px, and the existing result blue identifies FlowVLA values. Two comparison groups sit side by side on desktop and stack below 600px.

The two numbered VDPM figure references now use the same compact source-link typography as table references, separate from their scientific descriptions. Fruit links to Paper Figure 8 on PDF page 15; LIBERO-10 links to Paper Figure 9 on page 16. These mappings are verified against the manuscript rather than inferred from the offset asset filenames. The original-image expansion, caption wording, and media pixels remain unchanged. On narrow screens the source link wraps below the description.

Media transport uses white/transparent surfaces, neutral gray hover/press states and dark icons. Individual players use familiar play, seek, time, replay and expand controls. Shared playback uses one connected Play all / Stop / Replay control. Actions stay centered during mode changes; shared seeking sits alongside on wide groups and occupies a reserved touch row on compact groups. Gallery selection uses a blue underline with a white surface. Publication brand colors and numerical result emphasis retain their separate roles.

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
