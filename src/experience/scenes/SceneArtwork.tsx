import React from 'react';
import { ASSET_MANIFEST } from '../data/assets';
import type { SceneId } from '../data/types';

const assetSrc = (id: string) => ASSET_MANIFEST.find((asset) => asset.id === id)?.src ?? '';

type StorySceneId = Extract<SceneId, 'plan' | 'first-drink' | 'buzzed' | 'drunk' | 'party-peak' | 'passed-out'>;

export type DepthPlane = 'B' | 'C' | 'D' | 'E';

export type ArtworkLayer = {
  assetId: string;
  className: string;
  plane: DepthPlane;
  alt?: string;
};

type ArtworkConfig = {
  environment: string;
  layers: ArtworkLayer[];
};

/**
 * Approved production artwork arranged into the 5-plane depth system:
 * - Plane A: Continuous Environment Plate (rendered separately in ContinuousBackground)
 * - Plane B: Distant collage material (marks, paper backings, texture prints)
 * - Plane C: Protagonist (oversized approved close-up shots exclusively)
 * - Plane D: Secondary props and narrative objects
 * - Plane E: Near-field collage fragments (stickers, foreground shards, paper scraps)
 */
const SCENE_ARTWORK: Record<StorySceneId, ArtworkConfig> = {
  plan: {
    environment: 'environments.bedroomStudyNight',
    layers: [
      { assetId: 'graphics.barcodePurpleGreen', className: 'plan-mark', plane: 'B' },
      { assetId: 'characters.close.gettingReady', className: 'plan-character', plane: 'C', alt: 'Faceless protagonist getting ready' },
      { assetId: 'objects.booksStack01', className: 'plan-books', plane: 'D' },
      { assetId: 'objects.collegeBag01', className: 'plan-bag', plane: 'D' },
      { assetId: 'objects.timetable01', className: 'plan-timetable', plane: 'E', alt: 'College timetable' },
    ],
  },
  'first-drink': {
    environment: 'environments.partyHallwayEntrance',
    layers: [
      { assetId: 'graphics.brushPurple', className: 'drink-mark', plane: 'B' },
      { assetId: 'characters.close.firstDrink', className: 'drink-character', plane: 'C', alt: 'Faceless protagonist with their first drink' },
      { assetId: 'objects.bottleGlass01', className: 'drink-bottle', plane: 'D' },
      { assetId: 'objects.redCup01', className: 'drink-cup', plane: 'D' },
      { assetId: 'graphics.speechBubble', className: 'drink-sticker', plane: 'E', alt: 'Just one more?' },
    ],
  },
  buzzed: {
    environment: 'environments.partyLivingRoomMaster',
    layers: [
      { assetId: 'textures.tapeLayered01', className: 'buzzed-tape', plane: 'B' },
      { assetId: 'graphics.swirlPurpleGreen', className: 'buzzed-mark', plane: 'B' },
      { assetId: 'characters.close.buzzed', className: 'buzzed-character', plane: 'C', alt: 'Faceless protagonist socialising' },
      { assetId: 'objects.speakerVibration01', className: 'buzzed-speaker', plane: 'D' },
      { assetId: 'graphics.splatterPurpleGreen', className: 'buzzed-splatter', plane: 'E' },
    ],
  },
  drunk: {
    environment: 'environments.partyNearSpeakers',
    layers: [
      { assetId: 'textures.tornPaperLarge01', className: 'drunk-torn', plane: 'B' },
      { assetId: 'graphics.splatterPurpleGreen', className: 'drunk-mark', plane: 'B' },
      { assetId: 'characters.close.drunk', className: 'drunk-character', plane: 'C', alt: 'Faceless protagonist with a disoriented posture' },
      { assetId: 'objects.clockFragment01', className: 'drunk-clock', plane: 'D' },
      { assetId: 'textures.tapeLayered01', className: 'drunk-tape', plane: 'E' },
    ],
  },
  'party-peak': {
    environment: 'environments.partyCrowdPeak',
    layers: [
      { assetId: 'objects.discoBall01', className: 'peak-disco', plane: 'B' },
      { assetId: 'characters.close.partyPeak', className: 'peak-character', plane: 'C', alt: 'Faceless protagonist dancing euphoric' },
      { assetId: 'graphics.crownGreen', className: 'peak-crown', plane: 'D' },
      { assetId: 'objects.streamers01', className: 'peak-streamers', plane: 'E' },
      { assetId: 'graphics.smileyGreen', className: 'peak-smiley', plane: 'E' },
    ],
  },
  'passed-out': {
    environment: 'environments.bedroomMorningMessy',
    layers: [
      { assetId: 'textures.crumpledPaper01', className: 'passed-paper', plane: 'B' },
      { assetId: 'graphics.crossGreen', className: 'passed-cross', plane: 'B' },
      { assetId: 'characters.close.passedOut', className: 'passed-character', plane: 'C', alt: 'Faceless protagonist passed out on the bed' },
      { assetId: 'objects.alarmDigital0758', className: 'passed-alarm', plane: 'D', alt: 'Alarm clock at 7:58 AM' },
      { assetId: 'objects.phoneNotification01', className: 'passed-phone', plane: 'D' },
      { assetId: 'textures.tapeLayered01', className: 'passed-tape', plane: 'E' },
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
    <figure className={`art-card ${layer.className}`} key={layer.assetId} data-plane={layer.plane}>
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
