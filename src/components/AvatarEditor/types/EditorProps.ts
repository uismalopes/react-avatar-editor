import { ErrorLoadImage } from './ErrorLoadImage';
import type { Offset } from './Offset';

export interface RestoreButton {
  text?: string;
  className?: string;
  show?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export interface InputRange {
  clasName?: string;
  disabled?: boolean;
  show?: boolean;
}

export interface EditorProps {
  width: number;
  height: number;
  image?: string | File;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  restoreButton?: RestoreButton;
  inputRange?: InputRange;
  className?: string;
  onMouseMove?: () => void;
  onMouseUp?: () => void;
  onImageReady?: (image: HTMLImageElement) => void;
  onPositionChange?: (offset: Offset) => void;
  onScaleChange?: (scale: number) => void;
  onError?: (error: ErrorLoadImage) => void;
}
