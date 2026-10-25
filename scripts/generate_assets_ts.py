#!/usr/bin/env python3
"""
Generate src/experience/data/assets.ts and scripts/validate-assets.mjs from production/assets-inventory.json
"""

import json
from pathlib import Path

REPO_ROOT = Path("/home/lumen/Code/IYKYK")
INVENTORY_FILE = REPO_ROOT / "production" / "assets-inventory.json"
ASSETS_TS_FILE = REPO_ROOT / "src" / "experience" / "data" / "assets.ts"
VALIDATE_SCRIPT_FILE = REPO_ROOT / "scripts" / "validate-assets.mjs"

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


def build():
    with open(INVENTORY_FILE, "r") as f:
        inv = json.load(f)

    assets = inv["assets"]

    # Enrich assets with preload and sceneIds
    for a in assets:
        cid = a["id"]
        a["preload"] = cid in PRELOAD_SET
        a["sceneIds"] = SCENE_MAP.get(cid, [])
        # description
        a["description"] = f"{a['category'].capitalize()} asset: {a['slug']}"

    # Group into registry
    char_close = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "character" and a["variant"] == "close"}
    char_full = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "character" and a["variant"] == "full"}
    char_rebuild = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "character" and a["variant"] == "rebuild"}
    environments = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "environment"}
    objects = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "object"}
    graphics = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "graphic"}
    textures = {a["id"].split(".")[-1]: a for a in assets if a["category"] == "texture"}

    # Generate TypeScript code
    lines = []
    lines.append("/**")
    lines.append(" * IYKYK Production Asset Manifest")
    lines.append(" * Auto-generated from verified assets in production/source/assetsReady/")
    lines.append(" * Total assets registered: 99")
    lines.append(" * ")
    lines.append(" * DO NOT modify source artwork or manually alter paths.")
    lines.append(" */")
    lines.append("")
    lines.append("import type { SceneId, AssetCategory, AssetDefinition } from './types';")
    lines.append("export type { SceneId, AssetCategory, AssetVariant, AssetDimensions, AssetDefinition } from './types';")
    lines.append("")

    # Output ASSET_MANIFEST array
    lines.append("export const ASSET_MANIFEST: AssetDefinition[] = [")
    for a in assets:
        lines.append("  {")
        lines.append(f"    id: {json.dumps(a['id'])},")
        lines.append(f"    kebabId: {json.dumps(a['kebabId'])},")
        lines.append(f"    slug: {json.dumps(a['slug'])},")
        lines.append(f"    src: {json.dumps(a['repoPath'])},")
        lines.append(f"    category: {json.dumps(a['category'])},")
        if a.get("variant"):
            lines.append(f"    variant: {json.dumps(a['variant'])},")
        lines.append(f"    description: {json.dumps(a['description'])},")
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

    # Map by id
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

    # objects with aliases
    lines.append("  objects: {")
    for k, a in sorted(objects.items()):
        lines.append(f"    {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    # aliases
    for alias_k, orig_k in sorted(ALIASES.items()):
        if orig_k in objects:
            lines.append(f"    {alias_k}: ASSETS_BY_ID[{json.dumps(objects[orig_k]['id'])}],")
    lines.append("  },")

    # graphics with aliases
    lines.append("  graphics: {")
    for k, a in sorted(graphics.items()):
        lines.append(f"    {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    for alias_k, orig_k in sorted(ALIASES.items()):
        if orig_k in graphics:
            lines.append(f"    {alias_k}: ASSETS_BY_ID[{json.dumps(graphics[orig_k]['id'])}],")
    lines.append("  },")

    # textures with aliases
    lines.append("  textures: {")
    for k, a in sorted(textures.items()):
        lines.append(f"    {k}: ASSETS_BY_ID[{json.dumps(a['id'])}],")
    for alias_k, orig_k in sorted(ALIASES.items()):
        if orig_k in textures:
            lines.append(f"    {alias_k}: ASSETS_BY_ID[{json.dumps(textures[orig_k]['id'])}],")
    lines.append("  },")

    lines.append("} as const;")
    lines.append("")

    # Lookup helper functions
    lines.append("/**")
    lines.append(" * Retrieve an asset by its semantic ID (e.g. 'characters.full.gettingReady' or 'char-full-getting-ready').")
    lines.append(" * Throws an explicit error if the asset does not exist.")
    lines.append(" */")
    lines.append("export function getAsset(id: string): AssetDefinition {")
    lines.append("  const asset = ASSETS_BY_ID[id];")
    lines.append("  if (!asset) {")
    lines.append("    // Also check dot-navigation or aliases")
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

    print(f"Generated {ASSETS_TS_FILE} with {len(assets)} assets.")


if __name__ == "__main__":
    build()
