import React from 'react';
import { ASSET_MANIFEST } from '../data/assets';
import type { SceneId } from '../data/types';

const assetSrc = (id: string) => ASSET_MANIFEST.find((asset) => asset.id === id)?.src ?? '';

type StorySceneId = Extract<SceneId, 'plan' | 'first-drink' | 'buzzed' | 'drunk' | 'party-peak' | 'passed-out'>;

export type DepthPlane = 'B' | 'C' | 'D' | 'E';
export type EntranceStyle = 'slide' | 'stamp' | 'drop' | 'paper' | 'burst' | 'whip';

export type ArtworkLayer = {
  assetId: string;
  className: string;
  plane: DepthPlane;
  entrance?: EntranceStyle;
  alt?: string;
};

type ArtworkConfig = {
  environment: string;
  layers: ArtworkLayer[];
};

/**
 * Maximalist punk/editorial collage composition system.
 * Escalates across the narrative curve from ordered maximalism to party peak chaos,
 * then scattered aftermath:
 * - Plan: 8 secondary elements (Study collage)
 * - First Drink: 10 secondary elements (Social arrival & glassware)
 * - Buzzed: 14 secondary elements (Diagonal energy & vibration)
 * - Drunk: 16 secondary elements (Distortion & shattered clocks)
 * - Party Peak: 20 secondary elements (Maximum collision & confetti)
 * - Passed Out: 10 secondary elements (Scattered morning aftermath)
 */
const SCENE_ARTWORK: Record<StorySceneId, ArtworkConfig> = {
  plan: {
    environment: 'environments.bedroomStudyNight',
    layers: [
      // Plane B: Distant textures & registration marks
      { assetId: 'textures.paperFiber01', className: 'plan-fiber', plane: 'B', entrance: 'paper' },
      { assetId: 'graphics.barcodePurpleGreen', className: 'plan-mark', plane: 'B', entrance: 'stamp' },
      // Plane C: Protagonist Hero (approved close-up exclusively)
      { assetId: 'characters.close.gettingReady', className: 'plan-character', plane: 'C', entrance: 'drop', alt: 'Faceless protagonist getting ready' },
      // Plane D: Desk study objects
      { assetId: 'objects.booksStack01', className: 'plan-books', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.collegeBag01', className: 'plan-bag', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.notebook01', className: 'plan-notebook', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.stationery01', className: 'plan-stationery', plane: 'D', entrance: 'slide' },
      // Plane E: Pinned notes & stickers
      { assetId: 'objects.timetable01', className: 'plan-timetable', plane: 'E', entrance: 'stamp', alt: 'College timetable' },
      { assetId: 'objects.partyFlyer01', className: 'plan-flyer', plane: 'E', entrance: 'stamp', alt: 'Party flyer teaser' },
    ],
  },
  'first-drink': {
    environment: 'environments.partyHallwayEntrance',
    layers: [
      // Plane B: Distant ink smear & brush
      { assetId: 'textures.inkSmear01', className: 'drink-smear', plane: 'B', entrance: 'paper' },
      { assetId: 'graphics.brushPurple', className: 'drink-mark', plane: 'B', entrance: 'slide' },
      // Plane C: Protagonist Hero
      { assetId: 'characters.close.firstDrink', className: 'drink-character', plane: 'C', entrance: 'slide', alt: 'Faceless protagonist with their first drink' },
      // Plane D: Glassware & entrance objects
      { assetId: 'objects.bottleGlass01', className: 'drink-bottle', plane: 'D', entrance: 'drop' },
      { assetId: 'objects.redCup01', className: 'drink-cup', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.glass01', className: 'drink-cocktail', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.phoneTime01', className: 'drink-phone', plane: 'D', entrance: 'drop' },
      { assetId: 'objects.partyFlyer01', className: 'drink-flyer', plane: 'D', entrance: 'slide' },
      // Plane E: Foreground intervention stickers
      { assetId: 'graphics.speechBubble', className: 'drink-sticker', plane: 'E', entrance: 'stamp', alt: 'Just one more?' },
      { assetId: 'graphics.arrowGreen', className: 'drink-arrow', plane: 'E', entrance: 'burst' },
      { assetId: 'textures.clearTape01', className: 'drink-tape', plane: 'E', entrance: 'stamp' },
    ],
  },
  buzzed: {
    environment: 'environments.partyLivingRoomMaster',
    layers: [
      // Plane B: Diagonal tape, chromatic halftone & kinetic lightning
      { assetId: 'textures.colorHalftone01', className: 'buzzed-halftone', plane: 'B', entrance: 'paper' },
      { assetId: 'textures.tapeLayered01', className: 'buzzed-tape', plane: 'B', entrance: 'stamp' },
      { assetId: 'graphics.swirlPurpleGreen', className: 'buzzed-mark', plane: 'B', entrance: 'burst' },
      { assetId: 'graphics.lightningGreenPurple', className: 'buzzed-lightning', plane: 'B', entrance: 'burst' },
      // Plane C: Protagonist Hero
      { assetId: 'characters.close.buzzed', className: 'buzzed-character', plane: 'C', entrance: 'slide', alt: 'Faceless protagonist socialising' },
      // Plane D: Audio & party objects
      { assetId: 'objects.speaker01', className: 'buzzed-speaker-box', plane: 'D', entrance: 'drop' },
      { assetId: 'objects.speakerVibration01', className: 'buzzed-speaker', plane: 'D', entrance: 'burst' },
      { assetId: 'objects.redCup02', className: 'buzzed-cup', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.earbuds01', className: 'buzzed-earbuds', plane: 'D', entrance: 'drop' },
      { assetId: 'objects.partyLight01', className: 'buzzed-light', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.phoneAngle01', className: 'buzzed-phone', plane: 'D', entrance: 'slide' },
      // Plane E: Splatter, comic burst & foreground paper
      { assetId: 'graphics.splatterPurpleGreen', className: 'buzzed-splatter', plane: 'E', entrance: 'burst' },
      { assetId: 'graphics.comicBurstGreen', className: 'buzzed-burst', plane: 'E', entrance: 'stamp' },
      { assetId: 'graphics.spiralGreen', className: 'buzzed-spiral', plane: 'E', entrance: 'burst' },
      { assetId: 'textures.crumpledPaperStrip01', className: 'buzzed-paper-strip', plane: 'E', entrance: 'slide' },
    ],
  },
  drunk: {
    environment: 'environments.partyNearSpeakers',
    layers: [
      // Plane B: Massive torn paper backing, dark ink drag, photocopy grime
      { assetId: 'textures.tornPaperLarge01', className: 'drunk-torn', plane: 'B', entrance: 'paper' },
      { assetId: 'textures.inkDrag01', className: 'drunk-ink-drag', plane: 'B', entrance: 'paper' },
      { assetId: 'textures.photocopyGrime01', className: 'drunk-grime', plane: 'B', entrance: 'paper' },
      { assetId: 'graphics.splatterPurpleGreen', className: 'drunk-mark', plane: 'B', entrance: 'burst' },
      { assetId: 'graphics.bracketGreenPurple', className: 'drunk-bracket', plane: 'B', entrance: 'stamp' },
      // Plane C: Protagonist Hero (tilted disoriented posture)
      { assetId: 'characters.close.drunk', className: 'drunk-character', plane: 'C', entrance: 'slide', alt: 'Faceless protagonist with a disoriented posture' },
      // Plane D: Shattered clocks & toppling bottles
      { assetId: 'objects.clockFragment01', className: 'drunk-clock-1', plane: 'D', entrance: 'burst' },
      { assetId: 'objects.clockFragment02', className: 'drunk-clock-2', plane: 'D', entrance: 'burst' },
      { assetId: 'objects.crushedCup01', className: 'drunk-crushed-cup', plane: 'D', entrance: 'drop' },
      { assetId: 'objects.bottleGlass01', className: 'drunk-bottle', plane: 'D', entrance: 'drop' },
      { assetId: 'objects.glass01', className: 'drunk-glass', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.phoneAngle01', className: 'drunk-phone', plane: 'D', entrance: 'slide' },
      // Plane E: Distorted foreground shards & hallucinatory marks
      { assetId: 'graphics.starburstPurple', className: 'drunk-starburst', plane: 'E', entrance: 'stamp' },
      { assetId: 'graphics.targetGreen', className: 'drunk-target', plane: 'E', entrance: 'stamp' },
      { assetId: 'graphics.scribbleGreen', className: 'drunk-scribble', plane: 'E', entrance: 'burst' },
      { assetId: 'textures.tornPaperFragment01', className: 'drunk-shard', plane: 'E', entrance: 'slide' },
      { assetId: 'textures.clearTape01', className: 'drunk-tape', plane: 'E', entrance: 'stamp' },
    ],
  },
  'party-peak': {
    environment: 'environments.partyCrowdPeak',
    layers: [
      // Plane B: Disco ball, rave halftone, surface scratches, globe
      { assetId: 'objects.discoBall01', className: 'peak-disco', plane: 'B', entrance: 'drop' },
      { assetId: 'textures.colorHalftone01', className: 'peak-halftone', plane: 'B', entrance: 'paper' },
      { assetId: 'textures.surfaceScratches01', className: 'peak-scratches', plane: 'B', entrance: 'paper' },
      { assetId: 'graphics.globePurple', className: 'peak-globe', plane: 'B', entrance: 'slide' },
      { assetId: 'graphics.collageClusterGreenPurple', className: 'peak-cluster', plane: 'B', entrance: 'burst' },
      { assetId: 'objects.tornPaper01', className: 'peak-flyers', plane: 'B', entrance: 'paper' },
      // Plane C: Protagonist Hero (dancing euphoric)
      { assetId: 'characters.close.partyPeak', className: 'peak-character', plane: 'C', entrance: 'burst', alt: 'Faceless protagonist dancing euphoric' },
      // Plane D: Dense confetti, lights, crowns, flying cups
      { assetId: 'objects.confetti01', className: 'peak-confetti', plane: 'D', entrance: 'burst' },
      { assetId: 'objects.partyLight01', className: 'peak-light', plane: 'D', entrance: 'slide' },
      { assetId: 'graphics.crownGreen', className: 'peak-crown', plane: 'D', entrance: 'stamp' },
      { assetId: 'objects.redCup01', className: 'peak-cup-1', plane: 'D', entrance: 'burst' },
      { assetId: 'objects.redCup02', className: 'peak-cup-2', plane: 'D', entrance: 'burst' },
      // Plane E: Acid smiley, streamers, neon stars, dilated eye, VIP badge
      { assetId: 'objects.streamers01', className: 'peak-streamers', plane: 'E', entrance: 'whip' },
      { assetId: 'graphics.smileyGreen', className: 'peak-smiley', plane: 'E', entrance: 'stamp' },
      { assetId: 'graphics.starsGreen', className: 'peak-stars', plane: 'E', entrance: 'stamp' },
      { assetId: 'graphics.eyeGreen', className: 'peak-eye', plane: 'E', entrance: 'stamp' },
      { assetId: 'graphics.paperBadge', className: 'peak-badge', plane: 'E', entrance: 'stamp' },
      { assetId: 'graphics.comicBurstGreen', className: 'peak-burst', plane: 'E', entrance: 'stamp' },
      { assetId: 'graphics.lightningGreenPurple', className: 'peak-lightning', plane: 'E', entrance: 'burst' },
      { assetId: 'textures.tornPaperFragment01', className: 'peak-ticket', plane: 'E', entrance: 'slide' },
      { assetId: 'textures.tapeLayered01', className: 'peak-tape-x', plane: 'E', entrance: 'stamp' },
    ],
  },
  'passed-out': {
    environment: 'environments.bedroomMorningMessy',
    layers: [
      // Plane B: Crumpled bedsheets & morning ink speckle
      { assetId: 'textures.crumpledPaper01', className: 'passed-paper', plane: 'B', entrance: 'paper' },
      { assetId: 'textures.paperInkSpeckle01', className: 'passed-speckle', plane: 'B', entrance: 'paper' },
      // Plane C: Protagonist Hero (face-down motionless on pillow)
      { assetId: 'characters.close.passedOut', className: 'passed-character', plane: 'C', entrance: 'drop', alt: 'Faceless protagonist passed out on the bed' },
      // Plane D: Jarring alarms, phone notifications & fallen cup
      { assetId: 'objects.alarmDigital0758', className: 'passed-alarm', plane: 'D', entrance: 'drop', alt: 'Alarm clock at 7:58 AM' },
      { assetId: 'objects.alarmAnalog01', className: 'passed-alarm-analog', plane: 'D', entrance: 'drop' },
      { assetId: 'objects.phoneNotification01', className: 'passed-phone', plane: 'D', entrance: 'slide' },
      { assetId: 'objects.crushedCup01', className: 'passed-crushed-cup', plane: 'D', entrance: 'drop' },
      { assetId: 'objects.foldedPaper01', className: 'passed-folded-note', plane: 'D', entrance: 'drop' },
      // Plane E: Cancellation cross, bed strip & peeling tape
      { assetId: 'graphics.crossGreen', className: 'passed-cross', plane: 'E', entrance: 'stamp' },
      { assetId: 'textures.crumpledPaperStrip01', className: 'passed-paper-strip', plane: 'E', entrance: 'slide' },
      { assetId: 'textures.clearTape01', className: 'passed-tape', plane: 'E', entrance: 'stamp' },
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

  const renderCard = (layer: ArtworkLayer) => (
    <figure
      className={`art-card ${layer.className}`}
      key={`${layer.assetId}-${layer.className}`}
      data-plane={layer.plane}
      data-entrance={layer.entrance ?? 'slide'}
    >
      <img
        src={assetSrc(layer.assetId)}
        alt={layer.alt ?? ''}
        loading={eager ? 'eager' : 'lazy'}
      />
    </figure>
  );

  return (
    <div
      ref={compositionRef}
      className={`scene-composition scene-collage scene-collage-${sceneId}`}
      aria-label="Illustrated scene composition"
    >
      <div className="scene-plane scene-plane-b" data-plane="B">
        {planeBLayers.map(renderCard)}
      </div>
      <div className="scene-plane scene-plane-c" data-plane="C">
        {planeCLayers.map(renderCard)}
      </div>
      <div className="scene-plane scene-plane-d" data-plane="D">
        {planeDLayers.map(renderCard)}
      </div>
      <div className="scene-plane scene-plane-e" data-plane="E">
        {planeELayers.map(renderCard)}
      </div>
    </div>
  );
};
