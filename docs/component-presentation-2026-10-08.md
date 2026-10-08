# Table and video presentation

Table titles are independent headings above the data. Every success-rate unit appears below its table beside the source reference where available. Descriptive columns remain left aligned; numeric headers and values are centered, and all cells use middle vertical alignment. Numbered subsection headings share the same number/title start positions as section headings.

All 19 video identity rows use the same 16px/600 type role. Each label is centered across the full card independently of its right-aligned 14px speed metadata. Task/group headings use the shared body-sized semibold role; instructions use secondary text. A neutral divider separates the task description from the video cards. The aggregation group uses one cohesive “Stack Cups · Four synchronized views” line.

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
