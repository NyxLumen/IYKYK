import React from 'react';
import { ASSET_MANIFEST } from '../data/assets';
import type { SceneId } from '../data/types';

const assetSrc = (id: string) => ASSET_MANIFEST.find((asset) => asset.id === id)?.src ?? '';

type StorySceneId = Extract<SceneId, 'plan' | 'first-drink' | 'buzzed' | 'drunk' | 'party-peak' | 'passed-out'>;

export type DepthPlane = 'B' | 'C' | 'D' | 'E';
export type AssetRole = 'protagonist' | 'object' | 'graphic' | 'paper' | 'texture';
export type EntranceStyle = 'slide' | 'stamp' | 'drop' | 'paper' | 'burst' | 'whip' | 'fade-material';
export type ExitStyle = 'slide-down' | 'slide-left' | 'slide-right' | 'slide-up' | 'scatter' | 'fade-material';

export type ArtworkLayer = {
  assetId: string;
  className: string;
  plane: DepthPlane;
  role: AssetRole;
  entrance?: EntranceStyle;
  exit?: ExitStyle;
  alt?: string;
  content?: React.ReactNode;
  overlayText?: string;
};

type ArtworkConfig = {
  environment: string;
  layers: ArtworkLayer[];
};

/**
 * Maximalist punk/editorial collage composition system.
 * Classifies every asset into one of 5 distinct visual roles:
 * - protagonist: approved close-up character artwork
 * - object: tangible physical props (books, cups, clocks, bags, speakers)
 * - graphic: standalone cutout doodles, marks, symbols, speech bubbles
 * - paper: torn paper scraps, flyers, timetables, and tape fragments with physical edges
 * - texture: integrated material washes (fibers, grime, scratches, halftones, smears)
 *
 * Each element defines both entrance and deliberate exit choreography.
 */
const SCENE_ARTWORK: Record<StorySceneId, ArtworkConfig> = {
  plan: {
    environment: 'environments.bedroomStudyNight',
    layers: [
      // Plane B: Backing study elements (behind character)
      { assetId: 'objects.booksStack01', className: 'plan-books', plane: 'B', role: 'object', entrance: 'slide', exit: 'slide-down', alt: 'Stack of study books' },
      { assetId: 'objects.timetable01', className: 'plan-timetable', plane: 'B', role: 'paper', entrance: 'stamp', exit: 'slide-left', alt: 'College timetable' },
      { assetId: 'objects.collegeBag01', className: 'plan-bag', plane: 'B', role: 'object', entrance: 'slide', exit: 'slide-right', alt: 'Purple college backpack' },
      // Plane C: Protagonist Hero (Primary visual anchor, left-center getting ready)
      { assetId: 'characters.close.gettingReady', className: 'plan-character', plane: 'C', role: 'protagonist', entrance: 'drop', exit: 'slide-left', alt: 'Protagonist getting ready' },
      // Plane D: Midground objects & cutouts
      { assetId: 'objects.textbook01', className: 'plan-textbook', plane: 'D', role: 'object', entrance: 'stamp', exit: 'slide-down', alt: 'Upright pattern textbook' },
      { assetId: 'objects.phoneNotification01', className: 'plan-phone', plane: 'D', role: 'object', entrance: 'drop', exit: 'slide-down', alt: 'Phone with chat notifications' },
      { assetId: 'objects.partyFlyer01', className: 'plan-flyer', plane: 'D', role: 'paper', entrance: 'stamp', exit: 'slide-right', alt: 'Scattered party flyers' },
      // Plane E: Foreground collage typography, badges & expressive mark
      {
        assetId: 'graphics.brushPurple',
        className: 'plan-brush',
        plane: 'E',
        role: 'graphic',
        entrance: 'slide',
        exit: 'slide-right',
        alt: "WE'RE GOOD affirmation",
        content: (
          <div className="plan-brush-text" aria-label="WE'RE GOOD">
            <span>WE'RE GOOD</span>
          </div>
        ),
      },
      {
        assetId: 'graphics.paperBadge',
        className: 'plan-badge',
        plane: 'E',
        role: 'paper',
        entrance: 'stamp',
        exit: 'slide-right',
        alt: "I'LL BE BACK EARLY statement badge",
        content: (
          <div className="plan-badge-text" aria-label="I'LL BE BACK EARLY">
            <span className="plan-badge-line plan-badge-line-1">I'LL BE BACK</span>
            <span className="plan-badge-line plan-badge-line-2">EARLY</span>
          </div>
        ),
      },
      { assetId: 'graphics.scribbleGreen', className: 'plan-scribble', plane: 'E', role: 'graphic', entrance: 'burst', exit: 'slide-up', alt: 'Neon green gestural scribble' },
    ],
  },
  'first-drink': {
    environment: 'environments.partyHallwayEntrance',
    layers: [
      // Plane B: Main green brush ribbon graphic with integrated "JUST ONE..." copy
      {
        assetId: 'graphics.targetGreen',
        className: 'drink-target-green',
        plane: 'B',
        role: 'graphic',
        entrance: 'slide',
        exit: 'slide-left',
        alt: 'Graphic target green ribbon brush with JUST ONE... copy',
        overlayText: 'JUST ONE...',
      },
      // Plane C: Protagonist Hero (Center close-up holding drink)
      {
        assetId: 'characters.close.firstDrink',
        className: 'drink-character',
        plane: 'C',
        role: 'protagonist',
        entrance: 'slide',
        exit: 'slide-right',
        alt: 'Protagonist holding first drink',
      },
      // Plane D: Wall paper scrap, ambient graphics & mid-ground items
      {
        assetId: 'textures.crumpledPaperStrip01',
        className: 'drink-paper-strip',
        plane: 'D',
        role: 'paper',
        entrance: 'stamp',
        exit: 'slide-left',
        alt: 'Crumpled paper strip',
      },
      {
        assetId: 'graphics.globePurple',
        className: 'drink-globe',
        plane: 'D',
        role: 'graphic',
        entrance: 'drop',
        exit: 'slide-up',
        alt: 'Wireframe purple globe',
      },
      {
        assetId: 'objects.phoneAngle01',
        className: 'drink-phone',
        plane: 'D',
        role: 'object',
        entrance: 'slide',
        exit: 'slide-right',
        alt: 'Angled smartphone',
      },
      {
        assetId: 'graphics.brushGreen',
        className: 'drink-brush-green',
        plane: 'B',
        role: 'graphic',
        entrance: 'slide',
        exit: 'slide-right',
        alt: 'Green brush paint splash',
      },
      // Plane E: Foreground tangible party stickers
      {
        assetId: 'objects.earbuds01',
        className: 'drink-earbuds',
        plane: 'E',
        role: 'object',
        entrance: 'drop',
        exit: 'slide-left',
        alt: 'Coiled wired earbuds',
      },
      {
        assetId: 'objects.glass01',
        className: 'drink-glass',
        plane: 'E',
        role: 'object',
        entrance: 'slide',
        exit: 'slide-down',
        alt: 'Glass with drink and ice',
      },
      {
        assetId: 'objects.redCup02',
        className: 'drink-cup',
        plane: 'E',
        role: 'object',
        entrance: 'burst',
        exit: 'slide-right',
        alt: 'Crinkled red party cup',
      },
    ],
  },
  buzzed: {
    environment: 'environments.partyLivingRoomMaster',
    layers: [
      // Plane B: Risograph halftone wash, tape, kinetic lightning & swirl
      { assetId: 'textures.colorHalftone01', className: 'buzzed-halftone', plane: 'B', role: 'texture', entrance: 'fade-material', exit: 'fade-material' },
      { assetId: 'textures.tapeLayered01', className: 'buzzed-tape', plane: 'B', role: 'paper', entrance: 'stamp', exit: 'slide-left' },
      { assetId: 'graphics.swirlPurpleGreen', className: 'buzzed-mark', plane: 'B', role: 'graphic', entrance: 'burst', exit: 'slide-right' },
      { assetId: 'graphics.lightningGreenPurple', className: 'buzzed-lightning', plane: 'B', role: 'graphic', entrance: 'burst', exit: 'slide-up' },
      // Plane C: Protagonist Hero (Right-elevated posture)
      { assetId: 'characters.close.buzzed', className: 'buzzed-character', plane: 'C', role: 'protagonist', entrance: 'slide', exit: 'slide-left', alt: 'Faceless protagonist socialising' },
      // Plane D: Audio & party objects
      { assetId: 'objects.speaker01', className: 'buzzed-speaker-box', plane: 'D', role: 'object', entrance: 'drop', exit: 'slide-down' },
      { assetId: 'objects.speakerVibration01', className: 'buzzed-speaker', plane: 'D', role: 'object', entrance: 'burst', exit: 'slide-down' },
      { assetId: 'objects.redCup02', className: 'buzzed-cup', plane: 'D', role: 'object', entrance: 'slide', exit: 'slide-right' },
      { assetId: 'objects.earbuds01', className: 'buzzed-earbuds', plane: 'D', role: 'object', entrance: 'drop', exit: 'slide-left' },
      { assetId: 'objects.partyLight01', className: 'buzzed-light', plane: 'D', role: 'object', entrance: 'slide', exit: 'slide-down' },
      { assetId: 'objects.phoneAngle01', className: 'buzzed-phone', plane: 'D', role: 'object', entrance: 'slide', exit: 'slide-right' },
      // Plane E: Splatter, comic burst & foreground paper strip
      { assetId: 'graphics.splatterPurpleGreen', className: 'buzzed-splatter', plane: 'E', role: 'graphic', entrance: 'burst', exit: 'slide-down' },
      { assetId: 'graphics.comicBurstGreen', className: 'buzzed-burst', plane: 'E', role: 'graphic', entrance: 'stamp', exit: 'slide-up' },
      { assetId: 'graphics.spiralGreen', className: 'buzzed-spiral', plane: 'E', role: 'graphic', entrance: 'burst', exit: 'slide-right' },
      { assetId: 'textures.crumpledPaperStrip01', className: 'buzzed-paper-strip', plane: 'E', role: 'paper', entrance: 'slide', exit: 'slide-left' },
    ],
  },
  drunk: {
    environment: 'environments.partyNearSpeakers',
    layers: [
      // Plane B: Massive torn paper backing, dark ink drag, photocopy grime
      { assetId: 'textures.photocopyGrime01', className: 'drunk-grime', plane: 'B', role: 'texture', entrance: 'fade-material', exit: 'fade-material' },
      { assetId: 'textures.inkDrag01', className: 'drunk-ink-drag', plane: 'B', role: 'texture', entrance: 'fade-material', exit: 'fade-material' },
      { assetId: 'textures.tornPaperLarge01', className: 'drunk-torn', plane: 'B', role: 'paper', entrance: 'paper', exit: 'slide-left' },
      { assetId: 'graphics.splatterPurpleGreen', className: 'drunk-mark', plane: 'B', role: 'graphic', entrance: 'burst', exit: 'slide-down' },
      { assetId: 'graphics.bracketGreenPurple', className: 'drunk-bracket', plane: 'B', role: 'graphic', entrance: 'stamp', exit: 'slide-up' },
      // Plane C: Protagonist Hero (Left-Tilted disoriented posture)
      { assetId: 'characters.close.drunk', className: 'drunk-character', plane: 'C', role: 'protagonist', entrance: 'slide', exit: 'slide-down', alt: 'Faceless protagonist with a disoriented posture' },
      // Plane D: Shattered clocks & toppling bottles
      { assetId: 'objects.clockFragment01', className: 'drunk-clock-1', plane: 'D', role: 'object', entrance: 'burst', exit: 'scatter' },
      { assetId: 'objects.clockFragment02', className: 'drunk-clock-2', plane: 'D', role: 'object', entrance: 'burst', exit: 'scatter' },
      { assetId: 'objects.crushedCup01', className: 'drunk-crushed-cup', plane: 'D', role: 'object', entrance: 'drop', exit: 'slide-down' },
      { assetId: 'objects.bottleGlass01', className: 'drunk-bottle', plane: 'D', role: 'object', entrance: 'drop', exit: 'slide-down' },
      { assetId: 'objects.glass01', className: 'drunk-glass', plane: 'D', role: 'object', entrance: 'slide', exit: 'slide-down' },
      { assetId: 'objects.phoneAngle01', className: 'drunk-phone', plane: 'D', role: 'object', entrance: 'slide', exit: 'slide-right' },
      // Plane E: Distorted foreground shards & hallucinatory marks
      { assetId: 'graphics.starburstPurple', className: 'drunk-starburst', plane: 'E', role: 'graphic', entrance: 'stamp', exit: 'scatter' },
      { assetId: 'graphics.targetGreen', className: 'drunk-target', plane: 'E', role: 'graphic', entrance: 'stamp', exit: 'slide-right' },
      { assetId: 'graphics.scribbleGreen', className: 'drunk-scribble', plane: 'E', role: 'graphic', entrance: 'burst', exit: 'slide-left' },
      { assetId: 'textures.tornPaperFragment01', className: 'drunk-shard', plane: 'E', role: 'paper', entrance: 'slide', exit: 'slide-right' },
      { assetId: 'textures.clearTape01', className: 'drunk-tape', plane: 'E', role: 'paper', entrance: 'stamp', exit: 'slide-up' },
    ],
  },
  'party-peak': {
    environment: 'environments.partyCrowdPeak',
    layers: [
      // Plane B: Scratches, rave halftone, disco ball, globe, clusters
      { assetId: 'textures.surfaceScratches01', className: 'peak-scratches', plane: 'B', role: 'texture', entrance: 'fade-material', exit: 'fade-material' },
      { assetId: 'textures.colorHalftone01', className: 'peak-halftone', plane: 'B', role: 'texture', entrance: 'fade-material', exit: 'fade-material' },
      { assetId: 'objects.discoBall01', className: 'peak-disco', plane: 'B', role: 'object', entrance: 'drop', exit: 'slide-up' },
      { assetId: 'graphics.globePurple', className: 'peak-globe', plane: 'B', role: 'graphic', entrance: 'slide', exit: 'slide-right' },
      { assetId: 'graphics.collageClusterGreenPurple', className: 'peak-cluster', plane: 'B', role: 'graphic', entrance: 'burst', exit: 'slide-left' },
      { assetId: 'objects.tornPaper01', className: 'peak-flyers', plane: 'B', role: 'paper', entrance: 'paper', exit: 'slide-right' },
      // Plane C: Protagonist Hero (Monumental Centered Euphoric dancing)
      { assetId: 'characters.close.partyPeak', className: 'peak-character', plane: 'C', role: 'protagonist', entrance: 'burst', exit: 'slide-down', alt: 'Faceless protagonist dancing euphoric' },
      // Plane D: Dense confetti, lights, crowns, flying cups
      { assetId: 'objects.confetti01', className: 'peak-confetti', plane: 'D', role: 'object', entrance: 'burst', exit: 'slide-down' },
      { assetId: 'objects.partyLight01', className: 'peak-light', plane: 'D', role: 'object', entrance: 'slide', exit: 'slide-down' },
      { assetId: 'graphics.crownGreen', className: 'peak-crown', plane: 'D', role: 'graphic', entrance: 'stamp', exit: 'slide-up' },
      { assetId: 'objects.redCup01', className: 'peak-cup-1', plane: 'D', role: 'object', entrance: 'burst', exit: 'slide-right' },
      { assetId: 'objects.redCup02', className: 'peak-cup-2', plane: 'D', role: 'object', entrance: 'burst', exit: 'slide-left' },
      // Plane E: Acid smiley, streamers, neon stars, dilated eye, VIP badge
      { assetId: 'objects.streamers01', className: 'peak-streamers', plane: 'E', role: 'object', entrance: 'whip', exit: 'slide-up' },
      { assetId: 'graphics.smileyGreen', className: 'peak-smiley', plane: 'E', role: 'graphic', entrance: 'stamp', exit: 'slide-right' },
      { assetId: 'graphics.starsGreen', className: 'peak-stars', plane: 'E', role: 'graphic', entrance: 'stamp', exit: 'slide-left' },
      { assetId: 'graphics.eyeGreen', className: 'peak-eye', plane: 'E', role: 'graphic', entrance: 'stamp', exit: 'slide-right' },
      { assetId: 'graphics.paperBadge', className: 'peak-badge', plane: 'E', role: 'paper', entrance: 'stamp', exit: 'slide-left' },
      { assetId: 'graphics.comicBurstGreen', className: 'peak-burst', plane: 'E', role: 'graphic', entrance: 'stamp', exit: 'slide-down' },
      { assetId: 'graphics.lightningGreenPurple', className: 'peak-lightning', plane: 'E', role: 'graphic', entrance: 'burst', exit: 'slide-up' },
      { assetId: 'textures.tornPaperFragment01', className: 'peak-ticket', plane: 'E', role: 'paper', entrance: 'slide', exit: 'slide-right' },
      { assetId: 'textures.tapeLayered01', className: 'peak-tape-x', plane: 'E', role: 'paper', entrance: 'stamp', exit: 'slide-up' },
    ],
  },
  'passed-out': {
    environment: 'environments.bedroomMorningMessy',
    layers: [
      // Plane B: Crumpled bedsheet wash & morning dust speckles
      { assetId: 'textures.paperInkSpeckle01', className: 'passed-speckle', plane: 'B', role: 'texture', entrance: 'fade-material', exit: 'fade-material' },
      { assetId: 'textures.crumpledPaper01', className: 'passed-paper', plane: 'B', role: 'texture', entrance: 'fade-material', exit: 'fade-material' },
      // Plane C: Protagonist Hero (Low-Weighted on bed, face-down on pillow)
      { assetId: 'characters.close.passedOut', className: 'passed-character', plane: 'C', role: 'protagonist', entrance: 'drop', exit: 'slide-down', alt: 'Faceless protagonist passed out on the bed' },
      // Plane D: Jarring alarms, phone notifications & fallen cup
      { assetId: 'objects.alarmDigital0758', className: 'passed-alarm', plane: 'D', role: 'object', entrance: 'drop', exit: 'slide-down', alt: 'Alarm clock at 7:58 AM' },
      { assetId: 'objects.alarmAnalog01', className: 'passed-alarm-analog', plane: 'D', role: 'object', entrance: 'drop', exit: 'slide-down' },
      { assetId: 'objects.phoneNotification01', className: 'passed-phone', plane: 'D', role: 'object', entrance: 'slide', exit: 'slide-right' },
      { assetId: 'objects.crushedCup01', className: 'passed-crushed-cup', plane: 'D', role: 'object', entrance: 'drop', exit: 'slide-down' },
      { assetId: 'objects.foldedPaper01', className: 'passed-folded-note', plane: 'D', role: 'paper', entrance: 'drop', exit: 'slide-left' },
      // Plane E: Cancellation cross, bed strip & peeling tape
      { assetId: 'graphics.crossGreen', className: 'passed-cross', plane: 'E', role: 'graphic', entrance: 'stamp', exit: 'slide-up' },
      { assetId: 'textures.crumpledPaperStrip01', className: 'passed-paper-strip', plane: 'E', role: 'paper', entrance: 'slide', exit: 'slide-down' },
      { assetId: 'textures.clearTape01', className: 'passed-tape', plane: 'E', role: 'paper', entrance: 'stamp', exit: 'slide-down' },
    ],
  },
};

interface SceneArtworkProps {
  sceneId: StorySceneId;
  compositionRef?: React.Ref<HTMLDivElement>;
}

export const SceneArtwork: React.FC<SceneArtworkProps> = ({ sceneId, compositionRef }) => {
  const artwork = SCENE_ARTWORK[sceneId];
  const eager = sceneId === 'plan';

  const planeBLayers = artwork.layers.filter((l) => l.plane === 'B');
  const planeCLayers = artwork.layers.filter((l) => l.plane === 'C');
  const planeDLayers = artwork.layers.filter((l) => l.plane === 'D');
  const planeELayers = artwork.layers.filter((l) => l.plane === 'E');

  const renderLayer = (layer: ArtworkLayer) => {
    const isTexture = layer.role === 'texture';
    const isProtagonist = layer.role === 'protagonist';

    if (isTexture) {
      return (
        <div
          className={`scene-layer material-texture-overlay ${layer.className}`}
          key={`${layer.assetId}-${layer.className}`}
          data-plane={layer.plane}
          data-role="texture"
          data-entrance={layer.entrance ?? 'fade-material'}
          data-exit={layer.exit ?? 'fade-material'}
          aria-hidden="true"
        >
          <img
            src={assetSrc(layer.assetId)}
            alt=""
            loading={eager ? 'eager' : 'lazy'}
          />
        </div>
      );
    }

    return (
      <figure
        className={`scene-layer art-card ${layer.className} ${isProtagonist ? 'art-card-protagonist' : ''}`}
        key={`${layer.assetId}-${layer.className}`}
        data-plane={layer.plane}
        data-role={layer.role}
        data-entrance={layer.entrance ?? 'slide'}
        data-exit={layer.exit ?? 'slide-down'}
      >
        <div className="motion-pointer-layer">
          <div className="motion-ambient-layer">
            <img
              src={assetSrc(layer.assetId)}
              alt={layer.alt ?? ''}
              loading={eager ? 'eager' : 'lazy'}
            />
            {layer.content}
            {layer.overlayText && (
              <span className="art-card-overlay-text" aria-hidden="true">
                {layer.overlayText}
              </span>
            )}
          </div>
        </div>
      </figure>
    );
  };

  return (
    <div
      ref={compositionRef}
      className={`scene-composition scene-collage scene-collage-${sceneId}`}
      aria-label="Illustrated scene composition"
    >
      <div className="scene-plane scene-plane-b" data-plane="B">
        {planeBLayers.map(renderLayer)}
      </div>
      <div className="scene-plane scene-plane-c" data-plane="C">
        {planeCLayers.map(renderLayer)}
      </div>
      <div className="scene-plane scene-plane-d" data-plane="D">
        {planeDLayers.map(renderLayer)}
      </div>
      <div className="scene-plane scene-plane-e" data-plane="E">
        {planeELayers.map(renderLayer)}
      </div>
    </div>
  );
};
