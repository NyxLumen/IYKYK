import React from 'react';
import { ASSET_MANIFEST } from '../data/assets';
import type { SceneId } from '../data/types';

const assetSrc = (id: string) => ASSET_MANIFEST.find((asset) => asset.id === id)?.src ?? '';

type StorySceneId = Extract<SceneId, 'plan' | 'first-drink' | 'buzzed' | 'drunk' | 'party-peak' | 'passed-out'>;

type ArtworkLayer = {
  assetId: string;
  className: string;
  alt?: string;
};

type ArtworkConfig = {
  environment: string;
  layers: ArtworkLayer[];
};

/** Approved production artwork arranged into the first-pass collage grammar. */
const SCENE_ARTWORK: Record<StorySceneId, ArtworkConfig> = {
  plan: {
    environment: 'environments.bedroomStudyNight',
    layers: [
      { assetId: 'characters.full.gettingReady', className: 'plan-character', alt: 'Faceless protagonist getting ready' },
      { assetId: 'objects.booksStack01', className: 'plan-books' },
      { assetId: 'objects.collegeBag01', className: 'plan-bag' },
      { assetId: 'objects.timetable01', className: 'plan-timetable', alt: 'College timetable' },
      { assetId: 'graphics.barcodePurpleGreen', className: 'plan-mark' },
    ],
  },
  'first-drink': {
    environment: 'environments.partyHallwayEntrance',
    layers: [
      { assetId: 'characters.full.firstDrink', className: 'drink-character', alt: 'Faceless protagonist with their first drink' },
      { assetId: 'objects.redCup01', className: 'drink-cup' },
      { assetId: 'objects.bottleGlass01', className: 'drink-bottle' },
      { assetId: 'graphics.speechBubble', className: 'drink-sticker', alt: 'Just one more?' },
      { assetId: 'graphics.brushPurple', className: 'drink-mark' },
    ],
  },
  buzzed: {
    environment: 'environments.partyLivingRoomMaster',
    layers: [
      { assetId: 'characters.full.socialising', className: 'buzzed-character', alt: 'Faceless protagonist socialising' },
      { assetId: 'characters.close.buzzed', className: 'buzzed-close' },
      { assetId: 'objects.speakerVibration01', className: 'buzzed-speaker' },
      { assetId: 'graphics.swirlPurpleGreen', className: 'buzzed-mark' },
      { assetId: 'textures.tapeLayered01', className: 'buzzed-tape' },
    ],
  },
  drunk: {
    environment: 'environments.partyNearSpeakers',
    layers: [
      { assetId: 'characters.full.drunk', className: 'drunk-character', alt: 'Faceless protagonist with a disoriented posture' },
      { assetId: 'characters.close.drunk', className: 'drunk-close' },
      { assetId: 'objects.clockFragment01', className: 'drunk-clock' },
      { assetId: 'graphics.splatterPurpleGreen', className: 'drunk-mark' },
      { assetId: 'textures.tornPaperLarge01', className: 'drunk-torn' },
    ],
  },
  'party-peak': {
    environment: 'environments.partyCrowdPeak',
    layers: [
      { assetId: 'characters.full.dancing', className: 'peak-character', alt: 'Faceless protagonist dancing' },
      { assetId: 'characters.close.partyPeak', className: 'peak-close' },
      { assetId: 'objects.discoBall01', className: 'peak-disco' },
      { assetId: 'graphics.smileyGreen', className: 'peak-smiley' },
      { assetId: 'graphics.crownGreen', className: 'peak-crown' },
      { assetId: 'objects.streamers01', className: 'peak-streamers' },
    ],
  },
  'passed-out': {
    environment: 'environments.bedroomMorningMessy',
    layers: [
      { assetId: 'characters.full.passedOut', className: 'passed-character', alt: 'Faceless protagonist passed out on the bed' },
      { assetId: 'objects.alarmDigital0758', className: 'passed-alarm', alt: 'Alarm clock at 7:58 AM' },
      { assetId: 'objects.phoneNotification01', className: 'passed-phone' },
      { assetId: 'graphics.crossGreen', className: 'passed-cross' },
      { assetId: 'textures.crumpledPaper01', className: 'passed-paper' },
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

  return (
    <>
      <div className="scene-environment" aria-hidden="true">
        <img
          src={assetSrc(artwork.environment)}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
        />
      </div>
      <div ref={compositionRef} className={`scene-composition scene-collage scene-collage-${sceneId}`} aria-label="Illustrated scene composition">
        {artwork.layers.map((layer) => (
          <figure className={`art-card ${layer.className}`} key={layer.assetId}>
            <img
              src={assetSrc(layer.assetId)}
              alt={layer.alt ?? ''}
              loading={eager ? 'eager' : 'lazy'}
            />
          </figure>
        ))}
      </div>
    </>
  );
};
