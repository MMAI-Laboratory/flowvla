# Deployment

## Route and hosting

The publication target is the public `MMAI-Laboratory/flowvla` repository at:

**https://mmai-laboratory.github.io/flowvla/**

GitHub project Pages uses the repository name as the URL prefix. The root `index.html` therefore serves `/flowvla/`. Use the canonical trailing slash in links and metadata; keep CSS, JavaScript, paper, image, and video paths relative so the repository prefix is preserved.

The intended Pages configuration is **Deploy from a branch → main → / (root)**. The root `.nojekyll` serves the checked-in static files directly. No framework build, custom domain, `CNAME`, or separate deployment branch is required in this repository. The new address requires its own publication and live verification.

The existing lab homepage is a separate React/Vite static site. Its `main` workflow builds `dist` and replaces `gh-pages`; an edit made directly to that branch would be overwritten. This dedicated project repository produces the requested short URL without altering the homepage or depending on write access to it.

## Baseline and preservation

| Repository | Initial baseline | Preservation boundary |
| --- | --- | --- |
| `MMAI-Laboratory/flowvla` | Inherited `main` history at `499478c20be057398a90535401940b59314b6dcf` | Move the reviewed complete page and its assets to the repository root; change canonical URL metadata only. |
| `MMAI-Laboratory/projectpages` | `main`, `499478c20be057398a90535401940b59314b6dcf` | Keep the existing page until the new address is verified; then replace its entry page with a redirect while retaining media. |
| `MMAI-Laboratory/mmai-laboratory.github.io` | `main`, `c4f1119ebad25f37e99588fe0d0f1dbba71cd00b` | Read-only inspection; preserve homepage content, routes, build, and deployment. |
| Previous project publication | `ee7f72779f2c2548e972270a75eee18f07c76981` | Read-only source; no further deployment from this migration. |

There are no alternate overview, summary, abstract, or nested full-page copies in this release. Preserve existing section anchors and relative asset references. The lab homepage and previous personal publication are not redirect, removal, or deployment targets in this change.

## Migration order

1. Move the reviewed `flowvla/` content from the prior repository to this repository's root, preserving assets and behavior; update canonical URL metadata to the short address.
2. Publish and verify the new `/flowvla/` address, including hash navigation, paper links, and actual media playback.
3. Only after that verification, make `/projectpages/flowvla/` redirect to `/flowvla/`, preserving query and fragment. Retain old media files so existing direct links continue to work.

The former address is a compatibility entry point, not a second content source. This order keeps the working page available throughout migration.

Paper wording, reported values, and scientific figure semantics remain the evidence boundary. The Abstract retains the manuscript's wording. Delivery compression, display-edge masks, and tonal derivatives must preserve the source assets; a darker image cannot recover detail already clipped in the original. Only required optimized media, the paper, and used images belong in the published bundle.

## Applied guidance

The `gnaroshi_mds` web-application and UI guidance applies to consistent component roles, paper-grounded terminology, accessible controls, responsive reading order, and real interaction checks. Its cross-repository guidance applies to the baselines, preservation scope, deployment order, and rollback recorded here.

The user's explicit request removes repetitive public table labels and unnecessary summary wording. It takes precedence over adding generic presentation labels. Necessary provenance stays in concise paper references and this repository's documentation; deleting a label must not rewrite scientific terminology or the underlying result. The request to publish only the complete page also supersedes guidance for maintaining two views when two views are requested.

## Prior release validation

The following checks describe the reviewed prior release at `/projectpages/flowvla/`, inherited at baseline `499478c20be057398a90535401940b59314b6dcf`. Local content and playback audits completed on **2026-10-08**. The content audit reported no failures; all 13 playback regression checks passed. They establish the preserved content baseline, not verification of the new URL.

| Check | Observed result |
| --- | --- |
| Quantitative preservation | All six tables retained identical numeric and data cells against the prior publication baseline. |
| Abstract and Method | The 257-word Abstract matches the canonical manuscript text. The two Method paragraphs match the reviewed source excerpts; their limited omissions and punctuation changes were recorded in the content audit. |
| Reading order and terminology | Abstract precedes the overview video and Method. Reviewed headings and all four aggregation-view labels use source terminology. Only the two source-reported benchmark averages remain. |
| Variation and TCP scope | The two paper-supported variations remain. Three unsupported variation players were removed, leaving 19 players; the other source, poster, size, and timing attributes are unchanged. The duplicate standalone TCP section is absent and its legacy anchor remains. |
| Source preservation | All 96 checked source assets remained present and unchanged, including the existing tonal video derivative and poster. This is a source-preservation check, not the number of files published. |
| References and accessibility | No duplicate IDs, missing local files, invalid in-page fragments, or invalid ARIA references were found. |
| Playback | Passed lazy loading/no autoplay, independent playback, shared play/pause/seek, keyboard operation, enlargement/focus restoration, Stop/reset, tab changes, loading cancellation, partial failure/retry, and script-error checks. |
| Responsive controls | Browser checks at 320, 390, 1200, and 1843 CSS-pixel widths found no overflow. Representative individual controls retained 44 × 44 px targets. Actual overview, paired, and four-view playback, Stop, and Replay were exercised. |
| Delivery bundle and local serving | The exact 53-file list and every file hash match the reviewed manifest. The active local preview serves identical HTML. A video request for bytes 0–1023 returned HTTP 206 with 1,024 bytes. |

The prior release's reviewed single-page content manifest contained **53 files totaling 92,890,813 bytes**: one HTML page, one stylesheet, one script, 30 images/posters, one paper PDF, and 19 optimized MP4s. Each entry had a SHA-256 digest. This count excludes repository documentation and the local preview tool. No alternate page copy was included. The evidence records are `final-content-audit.json`, `media-controls-audit.json`, and `bundle-manifest.json`; local audit paths and source documents are not published. The canonical URL change requires a new HTML digest for this migration.

Source provenance is retained here without adding labels to the rendered page: LIBERO's Seer rows use the supplied author response, page 1, items 1–2; its π₀.₅ results use paper Table 1. LIBERO-Plus uses Table 2, ablations use Tables 3–4, and real-world tasks and variations use Tables 5–6. Additional-backbone results use the response's item 8; point-composition analysis uses its 3D object points discussion. Method excerpts come from paper pages 3–5. Previously established author metadata is retained separately; the anonymous manuscript does not independently verify it.

**Prior publication verified on 2026-10-08.** GitHub Pages reported `built` for release commit `20413d6459be07c880388dc069e1261f52dcd37b`. The former `/projectpages/flowvla/` URL returned HTTP 200 and the address without a trailing slash redirected to it. All 53 published files passed response checks; the HTML, CSS, JavaScript, and paper PDF matched the reviewed SHA-256 hashes. Every MP4 returned HTTP 206 with the expected 1,024-byte range and total size. Image response sizes matched the manifest.

The former public page was opened in a browser. The Basketball viewpoint pair played together; Stop paused and reset both videos to zero, with no media errors or horizontal overflow. The single-page navigation and manuscript text rendered at that path. A local publication receipt and screenshot retain this evidence. Later documentation-only commits did not change the reviewed page or asset bytes.

## Current publication status

**Publication at `/flowvla/` verified on 2026-10-08.** Pages reported `built` for commit `8d034db606dedcf699f49f3e7aa872243abe00d6`. Preservation checks confirmed exactly five URL substitutions in the HTML (65 fewer bytes) and all 52 supporting files byte-identical to the prior baseline. All 123 relative HTML references and internal anchors resolve.

All 53 files passed public response checks at the new address. HTML, CSS, JavaScript and PDF hashes matched; every MP4 returned the expected byte range. The address without a trailing slash redirected to `/flowvla/`. The `#comparisons` link loaded its section, and the Cup & Plush pair actually played from new media URLs; Stop paused and reset both. No media error occurred. The old entry redirect is managed separately by `MMAI-Laboratory/projectpages`, commit `0fc2adc`, after this successful verification; its final public checks belong in the migration receipt.

## Rollback

For later releases, revert the faulty project-page commit on `main`, run the affected local checks, push the revert, and verify that Pages serves the previous page and media. Retain prior referenced assets until their replacement is confirmed live. Avoid force-pushing release history.

If the new address fails before migration completes, leave the working `/projectpages/flowvla/` page in place while correcting this repository. If failure appears after the old entry page becomes a redirect, first revert that redirect commit in `projectpages` to restore its complete page, then repair this repository. Keep old media available throughout. No rollback step should change the separate lab homepage or redeploy the previous personal publication.
