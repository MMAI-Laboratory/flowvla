# Website deployment

## Branch ownership and address

The public page is **https://mmai-laboratory.github.io/flowvla/**.

- `gh-pages` owns the static website: root `index.html`, `styles.css`, `script.js`, `assets/`, `.nojekyll`, and the local preview tool.
- `main` is reserved for the forthcoming FlowVLA implementation. Website publication must not depend on `main`.
- GitHub Pages must use **Deploy from a branch → gh-pages → / (root)**. No framework build, custom domain, or `CNAME` is required.
- Keep relative asset URLs and existing section anchors. The branch change does not change the public `/flowvla/` address.
- The separate lab homepage and previous personal publication are outside this migration.

## Migration baseline

Read-only inspection on 2026-10-08 found both working trees clean and matching their remote `main` branches.

| Repository | Baseline | Preserved behavior | Intended change |
| --- | --- | --- | --- |
| `MMAI-Laboratory/flowvla` | `main`, `daa3fb07cdbebb77f2c98236a4444b54d769bbbc` | Complete page, public address, scientific values, retained media, anchors, paper links, responsive controls and video byte ranges | Create website branch from this baseline; point Pages to it; leave a forthcoming-code README on `main`. |
| `MMAI-Laboratory/projectpages` | `main`, `0fc2adc8c1407bf3f568468c24f5d1b9c2565100` | Preserve Git history in a verified local bundle before removal | Retire the repository after the branch-based website is verified. |

At this baseline, both repositories used Pages from `main` / root and reported `built`. The old repository provided a redirect and direct media compatibility at `/projectpages/flowvla/`. Its removal intentionally retires both that long address and its direct asset URLs. The owner explicitly requested this retirement; preserving that compatibility route is no longer a requirement.

Apply the `gnaroshi_mds` web-application and cross-repository guidance for canonical ownership, baseline preservation, deployment order, and truthful verification. The explicit retirement request supersedes the prior plan to retain the old redirect and media indefinitely.

## Release order

1. Preserve both baseline repositories in local Git bundles and verify that the bundles contain the expected refs and commits. Keep the backups outside the repositories being changed or removed. Git bundles preserve Git objects and refs, not GitHub settings or discussion metadata.
2. Create and publish `gh-pages` from the FlowVLA baseline. Include the reviewed user feedback in HTML/CSS while preserving all media and quantitative values. Preserve the player implementation; correct the mobile outline fallback to derive its label from the same navigation data.
3. Set Pages to `gh-pages` / root. Verify the successful publication corresponds to the website branch, and verify the existing `/flowvla/` URL and assets.
4. Only after that verification, replace `main`'s website contents with the implementation placeholder README. Keep `main` as the default branch.
5. Recheck that the public site remains served from `gh-pages` after the `main` change. Then delete `MMAI-Laboratory/projectpages`.
6. Record the final branch commits, Pages source, checks, and old-repository removal result. Verify that the canonical site remains available and that the retired repository and old route are no longer served.

If any step fails, stop the dependent cleanup and continue from the last verified state. Do not describe preparation or a settings change alone as successful publication or removal.

## Inherited validation and provenance

The website being moved was already reviewed and publicly verified. These records are prior evidence, not fresh tests of the branch migration:

- The 2026-10-08 local content audit preserved all six quantitative tables, the manuscript's 257-word Abstract, reviewed Method excerpts, established author metadata, section anchors, and media provenance. All 13 playback regression checks passed. Actual browser checks at 320, 390, 1200, and 1843 CSS-pixel widths covered overview, paired and four-view playback without horizontal overflow.
- The reviewed bundle contains one complete HTML page, one stylesheet, one script, 30 images/posters, one paper PDF, and 19 optimized MP4s: **53 website files**. Documentation, `.nojekyll`, and the preview tool are separate from this content count.
- The former project-page release `20413d6459be07c880388dc069e1261f52dcd37b` was publicly verified before the short-address migration.
- The current short-address release `8d034db606dedcf699f49f3e7aa872243abe00d6` was publicly verified at `/flowvla/`. All 53 file responses passed; HTML, CSS, JavaScript and PDF hashes matched; all 19 videos supported the expected byte ranges. Actual paired playback and Stop worked. Commit `daa3fb07cdbebb77f2c98236a4444b54d769bbbc` records that verification without changing the website bytes.
- The old redirect commit `0fc2adc8c1407bf3f568468c24f5d1b9c2565100` followed verification of the short address. Its purpose ends when the old repository is retired.

Scientific provenance remains unchanged: LIBERO's Seer rows use the supplied author response, page 1, items 1–2; its π₀.₅ results use paper Table 1. LIBERO-Plus uses Table 2, ablations use Tables 3–4, and real-world tasks and variations use Tables 5–6. Additional-backbone results use response item 8; point-composition analysis uses the response's 3D object points discussion. Method excerpts come from paper pages 3–5. Author metadata was previously established separately; the anonymous manuscript does not independently verify it. Original research assets remain preserved outside the delivery derivatives.

## Branch-release verification

For this migration, compare the website files on `gh-pages` against baseline `daa3fb07cdbebb77f2c98236a4444b54d769bbbc`. Verify Pages selects `gh-pages` / root and successfully publishes its release commit. Check the canonical response, HTML/CSS/JavaScript/PDF hashes, referenced image responses and MP4 byte ranges. Verify a section link and one representative playback/Stop interaction at the unchanged URL if branch delivery changes any served bytes or runtime behavior.

The reviewed HTML/CSS changes replace the hero Video/Paper actions with GitHub Code and an unavailable arXiv action, both marked Coming soon; distinguish subsection indentation; enlarge and compact all gallery tabs; remove duplicate benchmark table titles and the requested efficiency note; and shorten five ablation labels to w/o. No arXiv ID is invented. The GitHub Code link leads to the implementation branch, which honestly states that code is forthcoming.

The renewed manuscript review found no unsupported scientific terms or values. It added only two source-grounded sentences to the existing Method paragraphs: the scope of world dynamics (author response, lines 146–149) and reconstruction/selection limitations (paper page 8, lines 273–277). The Abstract is unchanged, and all 151 numeric cells across six tables remain identical. The existing public PDF stays available through the paper references.

The unchanged player implementation does not require repeating its full 13-check regression suite. New claims must describe the actual migration checks, separately from inherited validation.

**Validation and migration complete:** verified Git bundles preserve both baseline histories. Manuscript review confirms all 151 numeric cells unchanged, five w/o label substitutions, and two source-grounded Method additions. At 1843, 390 and 320 CSS-pixel widths, headings, all gallery choices, availability buttons and metric-only table captions fit without overflow; tab click/Enter interactions keep one selected panel. All controls in the top action row share a 64px height. The mobile outline now derives its initial Abstract label from the navigation data. All local asset and ARIA references resolve. The website is published from `gh-pages`, `main` contains only the forthcoming-code README, and the old repository has been deleted. See the [release receipt](release-2026-10-08.md) for exact commits and public verification.

## Recovery

Before the Pages source changes, the existing site on `main` remains available. If `gh-pages` publication fails while `main` still contains the website, retain the working source while repairing the website branch. Do not clean `main` or remove the old repository yet.

After `main` becomes the implementation branch, recover the website on `gh-pages`: revert the faulty website commit or restore the known baseline website tree there, then verify publication. Do not repoint Pages at the implementation branch.

Retain the local bundles after old-repository removal. A bundle can restore Git history into a new or recovered repository, but it does not automatically restore GitHub settings or the old public URL. Repository recovery and any reversal of the intentional route retirement require an explicit owner decision. Do not alter the lab homepage or previous personal site as an automatic rollback.
