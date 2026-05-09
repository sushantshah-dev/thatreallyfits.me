from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path

from flask import Flask, current_app, url_for

MANIFEST_PATH = Path("static/react/.vite/manifest.json")


@lru_cache(maxsize=1)
def _load_manifest(manifest_file: str) -> dict[str, dict[str, object]]:
    path = Path(manifest_file)
    if not path.exists():
        return {}

    with path.open("r", encoding="utf-8") as manifest_handle:
        return json.load(manifest_handle)


def vite_bundle(entry_point: str) -> dict[str, object] | None:
    static_folder = current_app.static_folder
    if not static_folder:
        return None

    manifest = _load_manifest(str(Path(static_folder) / MANIFEST_PATH))
    bundle = manifest.get(entry_point)
    if not bundle:
        return None

    return {
        "script": url_for("static", filename=f"react/{bundle['file']}"),
        "css": [
            url_for("static", filename=f"react/{css_file}")
            for css_file in bundle.get("css", [])
        ],
    }


def register_vite_helpers(app: Flask) -> None:
    @app.context_processor
    def inject_vite_bundle() -> dict[str, object]:
        return {"vite_bundle": vite_bundle}
