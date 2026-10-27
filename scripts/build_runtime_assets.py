#!/usr/bin/env python3
"""
IYKYK Runtime Asset Pipeline Optimizer
=======================================
Reads immutable source assets exclusively from production/source/assetsReady/
Generates optimized WebP runtime assets under public/assets/
Generates responsive width variants according to tested display profiles.
Updates src/experience/data/assets.ts with runtime paths, variants, and srcSet.

DO NOT modify files in production/source/.
"""

import sys
import os
import json
import shutil
from pathlib import Path
from PIL import Image

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = REPO_ROOT / "production" / "source" / "assetsReady"
OUTPUT_DIR = REPO_ROOT / "public" / "assets"
INVENTORY_FILE = REPO_ROOT / "production" / "assets-inventory.json"
ASSETS_TS_FILE = REPO_ROOT / "src" / "experience" / "data" / "assets.ts"

PRELOAD_SET = {
    "environments.bedroomStudyNight",
    "characters.full.gettingReady",
    "characters.close.gettingReady",
    "objects.collegeBag01",
    "objects.timetable01",
    "objects.textbook01",
    "objects.notebook01",
    "objects.booksStack01",
    "objects.deskLamp01",
    "objects.deskItem01",
    "objects.stationery01",
    "objects.phoneFront01",
    "graphics.bracketGreenPurple",
    "graphics.barcodePurpleGreen",
    "graphics.paperBadge",
    "textures.paperFiber01",
    "textures.clearTape01",
    "textures.photocopyEdge01",
}

SCENE_MAP = {
    # Environments
    "environments.bedroomStudyNight": ["plan"],
    "environments.partyHallwayEntrance": ["first-drink"],
    "environments.partyLivingRoomMaster": ["buzzed"],
    "environments.partyNearSpeakers": ["drunk"],
    "environments.partyCrowdPeak": ["party-peak"],
    "environments.bedroomMorningMessy": ["passed-out", "question"],
    "environments.bedroomMorningTidy": ["rebuild", "reveal"],

    # Characters
    "characters.close.gettingReady": ["plan"],
    "characters.full.gettingReady": ["plan"],
    "characters.close.firstDrink": ["first-drink"],
    "characters.full.firstDrink": ["first-drink"],
    "characters.full.socialising": ["first-drink", "buzzed"],
    "characters.close.buzzed": ["buzzed"],
    "characters.full.drinking": ["buzzed", "drunk"],
    "characters.close.drunk": ["drunk"],
    "characters.full.drunk": ["drunk"],
    "characters.close.partyPeak": ["party-peak"],
    "characters.full.dancing": ["party-peak"],
    "characters.close.passedOut": ["passed-out"],
    "characters.full.passedOut": ["passed-out"],
    "characters.rebuild.upper": ["rebuild"],
    "characters.rebuild.lower": ["rebuild"],
    "characters.rebuild.reassembled": ["rebuild", "reveal"],
    "characters.full.neutral": ["reveal"],

    # Objects
    "objects.collegeBag01": ["plan", "rebuild", "reveal"],
    "objects.timetable01": ["plan", "rebuild"],
    "objects.textbook01": ["plan", "reveal"],
    "objects.notebook01": ["plan", "rebuild"],
    "objects.booksStack01": ["plan", "reveal"],
    "objects.deskLamp01": ["plan"],
    "objects.deskItem01": ["plan"],
    "objects.stationery01": ["plan"],
    "objects.phoneFront01": ["plan", "passed-out"],
    "objects.redCup01": ["first-drink"],
    "objects.partyFlyer01": ["first-drink"],
    "objects.phoneNotification01": ["first-drink"],
    "objects.earbuds01": ["first-drink", "passed-out"],
    "objects.tapeRoll01": ["first-drink", "rebuild"],
    "objects.redCup02": ["buzzed"],
    "objects.speaker01": ["buzzed"],
    "objects.glass01": ["buzzed"],
    "objects.phoneAngle01": ["buzzed"],
    "objects.alarmAnalog01": ["buzzed"],
    "objects.bottleGlass01": ["drunk"],
    "objects.speakerVibration01": ["drunk"],
    "objects.partyLight01": ["drunk", "party-peak"],
    "objects.phoneTime01": ["drunk"],
    "objects.clockFragment01": ["drunk"],
    "objects.tornPaper01": ["drunk"],
    "objects.discoBall01": ["party-peak"],
    "objects.confetti01": ["party-peak"],
    "objects.streamers01": ["party-peak"],
    "objects.clockFragment02": ["party-peak"],
    "objects.crushedCup01": ["party-peak", "passed-out"],
    "objects.alarmDigital0758": ["passed-out"],
    "objects.foldedPaper01": ["plan", "rebuild"],
    "objects.stickerPaper01": ["plan", "first-drink"],

    # Textures
    "textures.paperFiber01": ["plan", "question", "reveal"],
    "textures.clearTape01": ["plan", "rebuild"],
    "textures.photocopyEdge01": ["plan", "passed-out", "reveal"],
    "textures.halftoneDots01": ["first-drink"],
    "textures.paperRecycled01": ["first-drink"],
    "textures.colorHalftone01": ["buzzed"],
    "textures.tapeLayered01": ["buzzed"],
    "textures.crumpledPaper01": ["drunk"],
    "textures.inkDrag01": ["drunk"],
    "textures.inkSmear01": ["drunk"],
    "textures.tornPaperFragment01": ["drunk"],
    "textures.scanLines01": ["party-peak"],
    "textures.surfaceScratches01": ["party-peak"],
    "textures.photocopyGrime01": ["party-peak"],
    "textures.inkContamination01": ["party-peak"],
    "textures.tornPaperLarge01": ["party-peak"],
    "textures.crumpledPaperStrip01": ["passed-out"],
    "textures.paperInkSpeckle01": ["rebuild"],

    # Graphics
    "graphics.bracketGreenPurple": ["plan", "rebuild"],
    "graphics.barcodePurpleGreen": ["plan"],
    "graphics.paperBadge": ["plan", "reveal"],
    "graphics.arrowGreen": ["first-drink"],
    "graphics.speechBubble": ["first-drink"],
    "graphics.brushPurple": ["first-drink"],
    "graphics.swirlPurpleGreen": ["buzzed"],
    "graphics.targetGreen": ["buzzed"],
    "graphics.brushGreen": ["buzzed"],
    "graphics.scribbleGreen": ["drunk"],
    "graphics.splatterPurpleGreen": ["drunk"],
    "graphics.spiralGreen": ["drunk"],
    "graphics.eyeGreen": ["drunk"],
    "graphics.smileyGreen": ["party-peak"],
    "graphics.crownGreen": ["party-peak", "reveal"],
    "graphics.lightningGreenPurple": ["party-peak"],
    "graphics.comicBurstGreen": ["party-peak"],
    "graphics.starsGreen": ["party-peak", "reveal"],
    "graphics.starburstPurple": ["party-peak"],
    "graphics.collageClusterGreenPurple": ["party-peak"],
    "graphics.crossGreen": ["passed-out"],
    "graphics.paintstrokeGreen": ["rebuild"],
    "graphics.brushstrokeGreen": ["rebuild"],
    "graphics.globePurple": ["rebuild", "reveal"],
}

ALIASES = {
    # Objects
    "collegeBag": "collegeBag01",
    "timetable": "timetable01",
    "textbook": "textbook01",
    "notebook": "notebook01",
    "booksStack": "booksStack01",
    "deskLamp": "deskLamp01",
    "deskItem": "deskItem01",
    "stationery": "stationery01",
    "phoneFront": "phoneFront01",
    "phoneAngle": "phoneAngle01",
    "phoneNotification": "phoneNotification01",
    "phoneTime": "phoneTime01",
    "speaker": "speaker01",
    "speakerVibration": "speakerVibration01",
    "redCup": "redCup01",
    "partyFlyer": "partyFlyer01",
    "partyLight": "partyLight01",
    "discoBall": "discoBall01",
    "confetti": "confetti01",
    "streamers": "streamers01",
    "glass": "glass01",
    "bottleGlass": "bottleGlass01",
    "crushedCup": "crushedCup01",
    "alarmAnalog": "alarmAnalog01",
    "alarmDigital": "alarmDigital0758",
    "clockFragment1": "clockFragment01",
    "clockFragment2": "clockFragment02",
    "earbuds": "earbuds01",
    "tapeRoll": "tapeRoll01",
    "tornPaper": "tornPaper01",
    "foldedPaper": "foldedPaper01",
    "stickerPaper": "stickerPaper01",

    # Textures
    "paperFiber": "paperFiber01",
    "clearTape": "clearTape01",
    "photocopyEdge": "photocopyEdge01",
    "halftoneDots": "halftoneDots01",
    "colorHalftone": "colorHalftone01",
    "crumpledPaper": "crumpledPaper01",
    "crumpledPaperStrip": "crumpledPaperStrip01",
    "inkContamination": "inkContamination01",
    "inkDrag": "inkDrag01",
    "inkSmear": "inkSmear01",
    "paperInkSpeckle": "paperInkSpeckle01",
    "paperRecycled": "paperRecycled01",
    "photocopyGrime": "photocopyGrime01",
    "scanLines": "scanLines01",
    "surfaceScratches": "surfaceScratches01",
    "tapeLayered": "tapeLayered01",
    "tornPaperFragment": "tornPaperFragment01",
    "tornPaperLarge": "tornPaperLarge01",

    # Graphics
    "arrow": "arrowGreen",
    "scribble": "scribbleGreen",
    "stars": "starsGreen",
    "crown": "crownGreen",
    "smiley": "smileyGreen",
    "lightning": "lightningGreenPurple",
    "comicBurst": "comicBurstGreen",
    "splatter": "splatterPurpleGreen",
    "starburst": "starburstPurple",
    "swirl": "swirlPurpleGreen",
    "target": "targetGreen",
    "spiral": "spiralGreen",
    "cross": "crossGreen",
    "eye": "eyeGreen",
    "globe": "globePurple",
    "brushstroke": "brushstrokeGreen",
    "paintstroke": "paintstrokeGreen",
    "bracket": "bracketGreenPurple",
    "barcode": "barcodePurpleGreen",
}

HERO_GRAPHICS = {
    "graphic-target-green",
    "graphic-brush-green",
    "graphic-brush-purple",
    "graphic-paper-badge",
    "graphic-collage-cluster-green-purple",
}

CATEGORY_DIR_MAP = {
    "character": "characters",
    "environment": "environments",
    "graphic": "graphics",
    "object": "objects",
    "texture": "textures",
}

FULL_TEXTURES = {
    "texture-paper-fiber-01",
    "texture-photocopy-grime-01",
    "texture-halftone-dots-01",
    "texture-ink-contamination-01",
    "texture-surface-scratches-01",
    "texture-color-halftone-01",
    "texture-paper-recycled-01",
    "texture-paper-ink-speckle-01",
    "texture-ink-drag-01",
    "texture-ink-smear-01",
    "texture-scan-lines-01",
    "texture-photocopy-edge-01",
    "texture-crumpled-paper-01",
    "texture-torn-paper-large-01",
}


def clean_output_dir():
    """Safely cleans generated runtime assets in public/assets/ only."""
    if OUTPUT_DIR.exists():
        print(f"🧹 Cleaning stale runtime assets in {OUTPUT_DIR}...")
        for item in OUTPUT_DIR.iterdir():
            if item.is_dir():
                shutil.rmtree(item)
            else:
                item.unlink()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def get_target_widths(category: str, slug: str, source_width: int) -> list[int]:
    """Computes target responsive widths based on the asset profile. Never upscales."""
    w = source_width
    if category == "environment":
        targets = [tw for tw in [768, 1280, 1920] if tw <= w]
    elif category == "character":
        if w <= 500:
            targets = [tw for tw in [360, w] if tw <= w]
        else:
            targets = [tw for tw in [380, 640, w] if tw <= w]
    elif category == "graphic":
        if slug in HERO_GRAPHICS:
            targets = [tw for tw in [480, w] if tw <= w]
        else:
            targets = [tw for tw in [320, w] if tw <= w] if w > 320 else [w]
    elif category == "object":
        targets = [tw for tw in [320, w] if tw <= w] if w > 360 else [w]
    elif category == "texture":
        if slug in FULL_TEXTURES:
            targets = [tw for tw in [768, w] if tw <= w] if w > 768 else [w]
        else:
            targets = [w]
    else:
        targets = [w]

    # Ensure source_width is always included as maximum fidelity fallback
    if w not in targets:
        targets.append(w)

    return sorted(list(set(targets)))


def optimize_assets():
    if not SOURCE_DIR.exists():
        print(f"❌ Error: Source directory does not exist: {SOURCE_DIR}")
        sys.exit(1)

    if not INVENTORY_FILE.exists():
        print(f"❌ Error: Inventory file does not exist: {INVENTORY_FILE}")
        sys.exit(1)

    with open(INVENTORY_FILE, "r", encoding="utf-8") as f:
        inventory = json.load(f)

    assets_list = inventory.get("assets", [])
    print(f"📦 Loaded {len(assets_list)} assets from inventory")

    force_clean = "--clean" in sys.argv
    if force_clean:
        clean_output_dir()
    else:
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    total_source_bytes = 0
    total_output_bytes = 0
    total_variants_generated = 0

    manifest_entries = []

    for idx, asset in enumerate(assets_list, 1):
        asset_id = asset["id"]
        category = asset["category"]
        slug = asset["slug"]
        rel_path = asset["path"].replace("production/source/assetsReady/", "")
        source_path = SOURCE_DIR / rel_path

        if not source_path.exists():
            print(f"❌ Error: Source file missing: {source_path}")
            sys.exit(1)

        source_bytes = source_path.stat().st_size
        total_source_bytes += source_bytes

        with Image.open(source_path) as im:
            orig_width, orig_height = im.size
            has_alpha = asset.get("hasAlpha", im.mode in ("RGBA", "LA"))
            aspect_ratio = orig_width / orig_height if orig_height > 0 else 1.0

            target_widths = get_target_widths(category, slug, orig_width)

            category_dir = CATEGORY_DIR_MAP.get(category, category)

            # Destination directory: public/assets/{category_dir}/{slug}/
            dest_dir = OUTPUT_DIR / category_dir / slug
            dest_dir.mkdir(parents=True, exist_ok=True)

            variants = []

            for tw in target_widths:
                # Compute proportional height
                th = round(tw / aspect_ratio)

                out_filename = f"{tw}.webp"
                out_path = dest_dir / out_filename

                if not out_path.exists() or out_path.stat().st_size == 0 or force_clean:
                    if tw == orig_width:
                        resized_im = im.copy()
                    else:
                        resized_im = im.resize((tw, th), Image.Resampling.LANCZOS)

                    # Quality configuration:
                    # Environments (opaque): quality 88
                    # Cutouts / textures: quality 90 with alpha preservation
                    if category == "environment":
                        resized_im = resized_im.convert("RGB")
                        resized_im.save(out_path, format="WEBP", quality=88, method=6)
                    else:
                        resized_im = resized_im.convert("RGBA")
                        resized_im.save(out_path, format="WEBP", quality=90, method=6)

                out_bytes = out_path.stat().st_size
                total_output_bytes += out_bytes
                total_variants_generated += 1

                variants.append({
                    "width": tw,
                    "height": th,
                    "src": f"/assets/{category_dir}/{slug}/{tw}.webp",
                    "fileSizeBytes": out_bytes,
                })

            # Default src is the largest width variant
            default_variant = variants[-1]
            src_url = default_variant["src"]
            srcset_str = ", ".join(f"{v['src']} {v['width']}w" for v in variants)

            # Metadata enrichment
            preload_flag = asset_id in PRELOAD_SET
            scene_ids = SCENE_MAP.get(asset_id, [])
            desc = asset.get("description", f"{category.capitalize()} asset: {slug}")

            # Clean runtime metadata: remove source-only paths from manifest
            clean_entry = {k: v for k, v in asset.items() if k not in ("path", "repoPath", "filename")}
            manifest_entries.append({
                **clean_entry,
                "src": src_url,
                "srcSet": srcset_str,
                "variants": variants,
                "format": "WEBP",
                "preload": preload_flag,
                "sceneIds": scene_ids,
                "description": desc,
                "fileSizeBytes": default_variant["fileSizeBytes"],
                "fileSizeKB": round(default_variant["fileSizeBytes"] / 1024, 2),
            })

        if idx % 15 == 0 or idx == len(assets_list):
            print(f"  [{idx:2d}/{len(assets_list)}] assets verified/optimized...")

    print(f"\n✅ Generated {total_variants_generated} WebP variants for {len(assets_list)} assets.")
    print(f"📊 Source size:  {total_source_bytes / (1024 * 1024):.2f} MB")
    print(f"📊 Runtime size: {total_output_bytes / (1024 * 1024):.2f} MB")
    savings = (1 - (total_output_bytes / total_source_bytes)) * 100
    print(f"🚀 Overall reduction: {savings:.1f}%\n")

    generate_assets_ts(manifest_entries)


def generate_assets_ts(assets: list[dict]):
    """Generates src/experience/data/assets.ts with updated runtime paths and metadata."""
    char_close = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "character" and a.get("variant") == "close"}
    char_full = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "character" and a.get("variant") == "full"}
    char_rebuild = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "character" and a.get("variant") == "rebuild"}
    environments = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "environment"}
    objects = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "object"}
    graphics = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "graphic"}
    textures = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "texture"}

    lines = []
    lines.append("/**")
    lines.append(" * IYKYK Production Asset Manifest")
    lines.append(" * Auto-generated by scripts/build_runtime_assets.py")
    lines.append(" * Runtime delivery from public/assets/ (WebP format with responsive variants)")
    lines.append(f" * Total assets registered: {len(assets)}")
    lines.append(" */")
    lines.append("")
    lines.append("import type { SceneId, AssetCategory, AssetDefinition } from './types';")
    lines.append("export type { SceneId, AssetCategory, AssetVariant, AssetDimensions, AssetDefinition, AssetVariantFile } from './types';")
    lines.append("")

    # Output ASSET_MANIFEST array
    lines.append("export const ASSET_MANIFEST: AssetDefinition[] = [")
    for a in assets:
        lines.append("  {")
        lines.append(f"    id: {json.dumps(a['id'])},")
        lines.append(f"    kebabId: {json.dumps(a['kebabId'])},")
        lines.append(f"    slug: {json.dumps(a['slug'])},")
        lines.append(f"    src: {json.dumps(a['src'])},")
        lines.append(f"    srcSet: {json.dumps(a['srcSet'])},")
        lines.append(f"    variants: {json.dumps(a['variants'])},")
        lines.append(f"    category: {json.dumps(a['category'])},")
        if a.get("variant"):
            lines.append(f"    variant: {json.dumps(a['variant'])},")
        lines.append(f"    description: {json.dumps(a.get('description', ''))},")
        lines.append(f"    format: {json.dumps(a['format'])},")
        lines.append(f"    dimensions: {json.dumps(a['dimensions'])},")
        lines.append(f"    width: {a['width']},")
        lines.append(f"    height: {a['height']},")
        lines.append(f"    hasAlpha: {'true' if a['hasAlpha'] else 'false'},")
        lines.append(f"    hasTransparency: {'true' if a['hasTransparency'] else 'false'},")
        lines.append(f"    fileSizeBytes: {a['fileSizeBytes']},")
        lines.append(f"    fileSizeKB: {a['fileSizeKB']},")
        lines.append(f"    preload: {'true' if a['preload'] else 'false'},")
        lines.append(f"    sceneIds: {json.dumps(a['sceneIds'])},")
        lines.append("  },")
    lines.append("];")
    lines.append("")

    # Map by id and kebabId
    lines.append("export const ASSETS_BY_ID: Record<string, AssetDefinition> = {")
    for a in assets:
        lines.append(f"  {json.dumps(a['id'])}: ASSET_MANIFEST.find(a => a.id === {json.dumps(a['id'])})!,")
        lines.append(f"  {json.dumps(a['kebabId'])}: ASSET_MANIFEST.find(a => a.id === {json.dumps(a['id'])})!,")
    lines.append("};")
    lines.append("")

    # Nested registry object
    lines.append("/**")
    lines.append(" * Hierarchical semantic asset registry.")
    lines.append(" * Enables autocomplete access like: assets.characters.full.gettingReady.src")
    lines.append(" */")
    lines.append("export const assets = {")

    # characters
    lines.append("  characters: {")
    lines.append("    close: {")
    for k, a in sorted(char_close.items()):
        lines.append(f"      {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    lines.append("    },")
    lines.append("    full: {")
    for k, a in sorted(char_full.items()):
        lines.append(f"      {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    lines.append("    },")
    lines.append("    rebuild: {")
    for k, a in sorted(char_rebuild.items()):
        lines.append(f"      {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    lines.append("    },")
    lines.append("  },")

    # environments
    lines.append("  environments: {")
    for k, a in sorted(environments.items()):
        lines.append(f"    {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    lines.append("  },")

    # objects
    lines.append("  objects: {")
    for k, a in sorted(objects.items()):
        lines.append(f"      {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    for alias, target in sorted(ALIASES.items()):
        if f"objects.{target}" in [a["id"] for a in assets if a["category"] == "object"]:
            lines.append(f"      {alias}: ASSETS_BY_ID[{json.dumps(f'objects.{target}')}],")
    lines.append("  },")

    # graphics
    lines.append("  graphics: {")
    for k, a in sorted(graphics.items()):
        lines.append(f"      {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    for alias, target in sorted(ALIASES.items()):
        if f"graphics.{target}" in [a["id"] for a in assets if a["category"] == "graphic"]:
            lines.append(f"      {alias}: ASSETS_BY_ID[{json.dumps(f'graphics.{target}')}],")
    lines.append("  },")

    # textures
    lines.append("  textures: {")
    for k, a in sorted(textures.items()):
        lines.append(f"      {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    for alias, target in sorted(ALIASES.items()):
        if f"textures.{target}" in [a["id"] for a in assets if a["category"] == "texture"]:
            lines.append(f"      {alias}: ASSETS_BY_ID[{json.dumps(f'textures.{target}')}],")
    lines.append("  },")

    lines.append("} as const;")
    lines.append("")

    # Preserved lookup helpers
    lines.append("/**")
    lines.append(" * Retrieve an asset by its semantic ID (e.g. 'characters.full.gettingReady' or 'char-full-getting-ready').")
    lines.append(" * Throws an explicit error if the asset does not exist.")
    lines.append(" */")
    lines.append("export function getAsset(id: string): AssetDefinition {")
    lines.append("  const asset = ASSETS_BY_ID[id];")
    lines.append("  if (!asset) {")
    lines.append("    const parts = id.split('.');")
    lines.append("    let current: any = assets;")
    lines.append("    for (const part of parts) {")
    lines.append("      if (current && typeof current === 'object' && part in current) {")
    lines.append("        current = current[part];")
    lines.append("      } else {")
    lines.append("        current = undefined;")
    lines.append("        break;")
    lines.append("      }")
    lines.append("    }")
    lines.append("    if (current && current.src) {")
    lines.append("      return current as AssetDefinition;")
    lines.append("    }")
    lines.append("    throw new Error(`[AssetRegistry] Asset not found for identifier: \"${id}\". Known IDs: ${ASSET_MANIFEST.length} available.`);")
    lines.append("  }")
    lines.append("  return asset;")
    lines.append("}")
    lines.append("")
    lines.append("/**")
    lines.append(" * Safely retrieve an asset by identifier without throwing.")
    lines.append(" */")
    lines.append("export function tryGetAsset(id: string): AssetDefinition | undefined {")
    lines.append("  try {")
    lines.append("    return getAsset(id);")
    lines.append("  } catch {")
    lines.append("    return undefined;")
    lines.append("  }")
    lines.append("}")
    lines.append("")
    lines.append("/**")
    lines.append(" * Check if an asset identifier exists in the registry.")
    lines.append(" */")
    lines.append("export function hasAsset(id: string): boolean {")
    lines.append("  return tryGetAsset(id) !== undefined;")
    lines.append("}")
    lines.append("")
    lines.append("/**")
    lines.append(" * Retrieve all assets designated for initial preload (Scene 01 + opening foundations).")
    lines.append(" */")
    lines.append("export function getPreloadAssets(): AssetDefinition[] {")
    lines.append("  return ASSET_MANIFEST.filter(a => a.preload);")
    lines.append("}")
    lines.append("")
    lines.append("/**")
    lines.append(" * Retrieve all assets belonging to a given category.")
    lines.append(" */")
    lines.append("export function getAssetsByCategory(category: AssetCategory): AssetDefinition[] {")
    lines.append("  return ASSET_MANIFEST.filter(a => a.category === category);")
    lines.append("}")
    lines.append("")
    lines.append("/**")
    lines.append(" * Retrieve all assets mapped to a given narrative Scene.")
    lines.append(" */")
    lines.append("export function getAssetsByScene(sceneId: SceneId): AssetDefinition[] {")
    lines.append("  return ASSET_MANIFEST.filter(a => a.sceneIds.includes(sceneId));")
    lines.append("}")
    lines.append("")

    with open(ASSETS_TS_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"📝 Successfully updated {ASSETS_TS_FILE} with runtime WebP metadata.")

    manifest_json_file = OUTPUT_DIR / "manifest.json"
    with open(manifest_json_file, "w", encoding="utf-8") as f:
        json.dump(assets, f, indent=2)

    print(f"📝 Successfully wrote runtime manifest to {manifest_json_file}.")


if __name__ == "__main__":
    optimize_assets()
