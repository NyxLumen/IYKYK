#!/usr/bin/env python3
"""
Inspect all production assets in production/source/assetsReady/ and generate
a comprehensive assets inventory JSON file.
"""

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image

REPO_ROOT = Path("/home/lumen/Code/IYKYK")
ASSETS_DIR = REPO_ROOT / "production" / "source" / "assetsReady"
OUTPUT_JSON = REPO_ROOT / "production" / "assets-inventory.json"


def to_camel(s: str) -> str:
    """Convert kebab-case or space/underscore separated string to camelCase."""
    parts = [p for p in re.split(r'[-_\s]+', s) if p]
    if not parts:
        return ""
    return parts[0].lower() + "".join(p.capitalize() for p in parts[1:])


def inspect_assets():
    if not ASSETS_DIR.exists():
        print(f"Error: Directory not found: {ASSETS_DIR}", file=sys.stderr)
        sys.exit(1)

    image_files = sorted(list(ASSETS_DIR.rglob("*.*")))
    image_files = [f for f in image_files if f.is_file() and f.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".svg"}]

    print(f"Found {len(image_files)} asset image files in {ASSETS_DIR}")

    assets = []
    by_id = {}
    by_kebab_id = {}
    category_counts = {}
    variant_counts = {"character": {}}
    alpha_count = 0
    rgb_count = 0
    total_size = 0

    for path in image_files:
        rel_from_assets = path.relative_to(ASSETS_DIR)
        path_parts = rel_from_assets.parts
        dir_category = path_parts[0]  # characters, environments, graphics, objects, textures
        stem = path.stem

        # Map to singular category
        cat_map = {
            "characters": "character",
            "environments": "environment",
            "graphics": "graphic",
            "objects": "object",
            "textures": "texture",
        }
        category = cat_map.get(dir_category, dir_category)

        # Determine variant and semantic IDs
        variant = None
        if category == "character":
            variant = path_parts[1]  # close, full, rebuild
            # e.g., protagonist-close-buzzed, protagonist-reassembled, protagonist-rebuild-lower
            sub = stem
            if sub.startswith("protagonist-"):
                sub = sub[len("protagonist-"):]
            if sub.startswith(f"{variant}-"):
                sub = sub[len(variant) + 1:]
            
            camel_sub = to_camel(sub)
            camel_id = f"characters.{variant}.{camel_sub}"
            kebab_id = f"char-{variant}-{sub}"
        elif category == "environment":
            sub = stem[4:] if stem.startswith("env-") else stem
            camel_id = f"environments.{to_camel(sub)}"
            kebab_id = f"env-{sub}"
        elif category == "object":
            sub = stem[7:] if stem.startswith("object-") else stem
            camel_id = f"objects.{to_camel(sub)}"
            kebab_id = f"obj-{sub}"
        elif category == "graphic":
            sub = stem[8:] if stem.startswith("graphic-") else stem
            camel_id = f"graphics.{to_camel(sub)}"
            kebab_id = f"gfx-{sub}"
        elif category == "texture":
            sub = stem[8:] if stem.startswith("texture-") else stem
            camel_id = f"textures.{to_camel(sub)}"
            kebab_id = f"tex-{sub}"
        else:
            camel_id = to_camel(stem)
            kebab_id = stem

        # Relative paths
        rel_to_repo = str(path.relative_to(REPO_ROOT))
        repo_path = f"/{rel_to_repo}"

        # Inspect using PIL
        stat = path.stat()
        file_size = stat.st_size
        total_size += file_size

        with Image.open(path) as img:
            fmt = img.format or path.suffix[1:].upper()
            width, height = img.size
            color_mode = img.mode
            has_alpha = ("A" in color_mode) or ("transparency" in img.info)
            
            has_transparency = False
            if has_alpha:
                alpha_count += 1
                try:
                    extrema = img.getextrema()
                    # For RGBA, extrema is ((minR, maxR), (minG, maxG), (minB, maxB), (minA, maxA))
                    alpha_extrema = extrema[3] if len(extrema) == 4 else extrema[-1]
                    has_transparency = alpha_extrema[0] < 255
                except Exception:
                    has_transparency = True
            else:
                rgb_count += 1

        aspect_ratio = round(width / height, 4) if height else 0.0

        asset_entry = {
            "id": camel_id,
            "kebabId": kebab_id,
            "slug": stem,
            "category": category,
            "variant": variant,
            "path": rel_to_repo,
            "repoPath": repo_path,
            "filename": path.name,
            "format": fmt,
            "width": width,
            "height": height,
            "dimensions": {
                "width": width,
                "height": height,
                "aspectRatio": aspect_ratio,
            },
            "fileSizeBytes": file_size,
            "fileSizeKB": round(file_size / 1024, 2),
            "colorMode": color_mode,
            "hasAlpha": has_alpha,
            "hasTransparency": has_transparency,
        }

        # Check duplicates
        if camel_id in by_id:
            raise ValueError(f"Duplicate camelCase ID detected: {camel_id}")
        if kebab_id in by_kebab_id:
            raise ValueError(f"Duplicate kebab-case ID detected: {kebab_id}")

        assets.append(asset_entry)
        by_id[camel_id] = asset_entry
        by_kebab_id[kebab_id] = asset_entry

        category_counts[category] = category_counts.get(category, 0) + 1
        if variant:
            variant_counts["character"][variant] = variant_counts["character"].get(variant, 0) + 1

    inventory_data = {
        "version": "1.0.0",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalAssets": len(assets),
        "summary": {
            "totalCount": len(assets),
            "byCategory": category_counts,
            "byVariant": variant_counts,
            "hasAlphaCount": alpha_count,
            "rgbCount": rgb_count,
            "totalSizeBytes": total_size,
            "totalSizeMB": round(total_size / (1024 * 1024), 2),
        },
        "assets": assets,
        "byId": by_id,
        "byKebabId": by_kebab_id,
    }

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(inventory_data, f, indent=2)

    print(f"Successfully generated inventory at {OUTPUT_JSON}")
    print(f"Total assets: {len(assets)}")
    print(f"Categories: {json.dumps(category_counts, indent=2)}")
    print(f"Character variants: {json.dumps(variant_counts['character'], indent=2)}")
    print(f"Transparency: {alpha_count} alpha/transparency, {rgb_count} opaque RGB")
    print(f"Total size: {round(total_size / (1024 * 1024), 2)} MB")


if __name__ == "__main__":
    inspect_assets()
