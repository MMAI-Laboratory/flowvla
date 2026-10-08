# FlowVLA · MMAI Lab

Research project pages for MMAI Lab, Ajou University.

## FlowVLA

**FlowVLA: Enabling World Dynamics Understanding through Pluggable 3D Flow Learning**

Publication address: [mmai-laboratory.github.io/flowvla/](https://mmai-laboratory.github.io/flowvla/)

The root `index.html` is the complete research page, including the method, experiments, analysis, paper, and demonstration videos. This repository publishes one page for the project; it does not publish separate overview, summary, abstract, or full-page copies. It contains the website and public research media, not model implementation or training code.

## Editing and local preview

The source of truth is the checked-in root `index.html`, `styles.css`, `script.js`, and referenced `assets/`. There is no application build step. Keep asset links relative and public links consistent with the trailing-slash address above.

From the repository root:

```sh
python3 tools/serve.py --directory . --port 8765
```

Open `http://127.0.0.1:8765/`. The local server supports HTTP byte ranges for video seeking. Stop it with Ctrl+C when the preview is no longer needed.

The delivery bundle includes the paper, used images, and required optimized video copies. Preserve the manuscript's terminology, quantitative results, and verbatim Abstract. Keep the original research assets unchanged when preparing delivery derivatives; removing redundant presentation labels must not change the evidence they describe.

See [deployment and validation](docs/deployment.md) for the hosting configuration, preservation boundaries, release checks, and rollback.
