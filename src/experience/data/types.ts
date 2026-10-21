import { FrameTransform } from '@/components/ResponsiveFrame';

export type SceneId =
  | 'plan'
  | 'first-drink'
  | 'buzzed'
  | 'drunk'
  | 'party-peak'
  | 'passed-out'
  | 'question'
  | 'rebuild'
  | 'reveal';

export type CompositionMode = 'fixed' | 'crop' | 'layered';

export type LayerType =
  | 'background'
  | 'environment'
  | 'panel'
  | 'character'
  | 'object'
  | 'texture'
  | 'clock'
  | 'meter'
  | 'typography'
  | 'graphic'
  | 'cta';

export type ClockVariant = 'digital' | 'analog' | 'oversized';

export interface LayerTransform {
  x?: number | string;
  y?: number | string;
  scale?: number;
  rotation?: number;
  opacity?: number;
  zIndex?: number;
}

export interface LayerConfig {
  id: string;
  type: LayerType;
  label?: string;
  content?: string;
  position?: {
    x?: number | string;
    y?: number | string;
  };
  scale?: number;
  rotation?: number;
  opacity?: number;
  zIndex?: number;
  mobile?: Partial<LayerTransform>;
  desktop?: Partial<LayerTransform>;
  className?: string;
}

export interface SceneMeterConfig {
  value: number; // 0 to 100
  visible?: boolean;
  mode?: 'story' | 'rebuild';
}

export interface SceneClockConfig {
  time?: string;
  variant?: ClockVariant;
  visible?: boolean;
}

export interface SceneConfig {
  id: SceneId;
  sceneNumber: string; // e.g. "01", "02", "06.5", etc.
  title: string;
  time?: string;
  meter?: SceneMeterConfig;
  clock?: SceneClockConfig;
  mood: string;
  composition: {
    mode: CompositionMode;
    mobile?: FrameTransform;
    desktop?: FrameTransform;
  };
  storyAction: string;
  copy?: {
    headline?: string;
    subhead?: string;
    note?: string;
    cta?: string;
  };
  layers: LayerConfig[];
}
