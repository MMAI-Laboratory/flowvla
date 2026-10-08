# Deployment

## Route and hosting

The project is hosted by the public `MMAI-Laboratory/projectpages` repository at:

**https://mmai-laboratory.github.io/projectpages/flowvla/**

GitHub project Pages uses the repository name as the URL prefix. The `flowvla/index.html` directory supplies the project path. Use the canonical trailing slash in links and metadata; keep CSS, JavaScript, paper, image, and video paths relative so the repository prefix is preserved.

The intended Pages configuration is **Deploy from a branch → main → / (root)**. The root `.nojekyll` serves the checked-in static files directly. No framework build, custom domain, `CNAME`, or separate deployment branch is required in this repository. Enable Pages after the reviewed bundle has been committed and pushed; repository creation alone does not publish the site.

The existing lab homepage is a separate React/Vite static site. Its `main` workflow builds `dist` and replaces `gh-pages`; an edit made directly to that branch would be overwritten. Integrating a static project into that repository would require `public/projectpages/flowvla/` in its source and a homepage release. This dedicated project repository produces the requested URL without altering the homepage or depending on write access to it.

## Baseline and preservation

| Repository | Initial baseline | Preservation boundary |
| --- | --- | --- |
| `MMAI-Laboratory/projectpages` | Empty repository; unborn `main` | Publish the complete page at `flowvla/index.html` with only its required delivery assets. |
| `MMAI-Laboratory/mmai-laboratory.github.io` | `main`, `c4f1119ebad25f37e99588fe0d0f1dbba71cd00b` | Read-only inspection; preserve homepage content, routes, build, and deployment. |
| Previous project publication | `ee7f72779f2c2548e972270a75eee18f07c76981` | Read-only source; no further deployment from this migration. |

There are no alternate overview, summary, abstract, or nested full-page copies in this release. Preserve existing section anchors where they remain meaningful on the complete page. The old publication and the lab homepage are not redirect or removal targets in this change.

Paper wording, reported values, and scientific figure semantics remain the evidence boundary. The Abstract retains the manuscript's wording. Delivery compression, display-edge masks, and tonal derivatives must preserve the source assets; a darker image cannot recover detail already clipped in the original. Only required optimized media, the paper, and used images belong in the published bundle.

## Applied guidance

The `gnaroshi_mds` web-application and UI guidance applies to consistent component roles, paper-grounded terminology, accessible controls, responsive reading order, and real interaction checks. Its cross-repository guidance applies to the baselines, preservation scope, deployment order, and rollback recorded here.

The user's explicit request removes repetitive public table labels and unnecessary summary wording. It takes precedence over adding generic presentation labels. Necessary provenance stays in concise paper references and this repository's documentation; deleting a label must not rewrite scientific terminology or the underlying result. The request to publish only the complete page also supersedes guidance for maintaining two views when two views are requested.

## Validation and publication

Local content and playback audits completed on **2026-10-08**. The content audit reported no failures; all 13 playback regression checks passed.

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

The reviewed single-page content manifest contains **53 files totaling 92,890,813 bytes**: one HTML page, one stylesheet, one script, 30 images/posters, one paper PDF, and 19 optimized MP4s. Each entry has a SHA-256 digest. This count excludes repository documentation and the local preview tool. No alternate page copy is included. The evidence records are `final-content-audit.json`, `media-controls-audit.json`, and `bundle-manifest.json`; local audit paths and source documents are not published.

Source provenance is retained here without adding labels to the rendered page: LIBERO's Seer rows use the supplied author response, page 1, items 1–2; its π₀.₅ results use paper Table 1. LIBERO-Plus uses Table 2, ablations use Tables 3–4, and real-world tasks and variations use Tables 5–6. Additional-backbone results use the response's item 8; point-composition analysis uses its 3D object points discussion. Method excerpts come from paper pages 3–5. Previously established author metadata is retained separately; the anonymous manuscript does not independently verify it.

**Deployment and live verification remain pending.** After publishing, verify the canonical public URL, paper and media responses, page behavior, and the actual Pages deployment commit. Record that commit and any limitations here. Local audit success or a completed push alone is not confirmation of a live deployment.

## Rollback

For later releases, revert the faulty project-page commit on `main`, run the affected local checks, push the revert, and verify that Pages serves the previous page and media. Retain prior referenced assets until their replacement is confirmed live. Avoid force-pushing release history.

For an unsuccessful first publication with no prior release, disable Pages while correcting the bundle, preserving the repository and reviewed source. No rollback step should change the separate lab homepage or redeploy the previous project publication.
