# Publication controls and media layout refinement

The publication buttons now use destination colors, centered icon/text groups and attached availability ribbons. The two-option galleries use a shared 512-pixel measure on desktop and fit the available mobile width. The Stack Cups label is a heading inside its four-view media group, and the return-to-top control is a 44-pixel circle with an accessible name and keyboard focus treatment.

The right-hand reading outline stays in place. Primary project pages reviewed (OpenVLA, CoT-VLA, Octo and Diffusion Policy) did not establish a common sidebar position. This is a layout choice for this long page, supported by the [USWDS in-page navigation guidance](https://designsystem.digital.gov/components/in-page-navigation/), rather than a claim about a majority of research pages.

## TCP export-border removal

The original 1440×1080 Stack Cups TCP export contains a dark vertical border at its far left. A new derived video and matching poster replace only the first 20 columns with white; the original is preserved. Every source frame was checked: columns 14–19 are blank, and actual plot content starts beyond column 80. The new files require no CSS crop, so inline playback, poster, enlarged playback and direct viewing use the same complete geometry.

All 412 frame timestamps, 30 fps rate, 13.733333-second duration, dimensions and audio payload match the source. Every decoded output frame and the poster have a white left edge. The plot region is geometrically unchanged; its SSIM against the original is 0.999600, comparable to the previous compressed derivative (0.999603). The new filenames also avoid reuse of a stale video/poster cache.

## Validation

- Browser inspection at 1843, 390 and 320 CSS-pixel widths; no horizontal page overflow. The smallest ribbon layout keeps Coming soon on one line.
- Hero controls share 48-pixel height; their icon/text groups are centered to within 0.01 CSS pixels.
- Two-option tabs measure 512, 358 and 288 pixels respectively, with equal halves. The five-task gallery keeps its existing layout.
- Actual reconstruction and variation selection, BibTeX navigation, and keyboard return-to-top were checked. Return-to-top focuses the top section and becomes hidden there.
- The cleaned TCP clip played through to 13.733333 seconds in the browser. Its enlarged view loaded the same new video and poster with the complete 4:3 frame and no crop; the end-frame view was visually inspected.
- All six table markups and playback/navigation JavaScript remain unchanged from the previous release. IDs are unique and accessibility references resolve.

The website remains on gh-pages; main remains the README-only placeholder for the future paper code.
