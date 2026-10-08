# FlowVLA project website

**FlowVLA: Enabling World Dynamics Understanding through Pluggable 3D Flow Learning**

Project page: **[mmai-laboratory.github.io/flowvla/](https://mmai-laboratory.github.io/flowvla/)**

This `gh-pages` branch contains the complete research website and its public media. The [`main` branch](https://github.com/MMAI-Laboratory/flowvla/tree/main) is reserved for the forthcoming implementation.

## Editing and preview

Edit the root `index.html`, `styles.css`, `script.js`, and referenced `assets/`. These checked-in files are the website source of truth; there is no application build step. Keep asset paths relative and public URLs consistent with the canonical trailing-slash address above.

From this branch's repository root:

```sh
python3 tools/serve.py --directory . --port 8765
```

Open `http://127.0.0.1:8765/`. The preview server supports byte ranges for video seeking. Stop it with Ctrl+C when finished.

Preserve the manuscript's terminology, quantitative results, claim boundaries, and established media provenance. The owner requested the current three-sentence Abstract summary; keep its training/inference and evaluation conditions faithful to the original, which remains available in the linked paper PDF. Keep source research assets unchanged when producing web derivatives. Publish only the complete page and its required assets.

GitHub Pages serves **`gh-pages` → `/ (root)`** with `.nojekyll`. See [deployment](docs/deployment.md) for branch ownership, migration status, verification, and recovery.
