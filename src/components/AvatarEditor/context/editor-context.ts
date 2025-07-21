import { createContext, type RefObject } from 'react';
import { EditorProps } from '../types';
import { PaintImageParams } from '../utils/paintImage';

export interface EditorContextProps extends Omit<EditorProps, 'width' | 'height'> {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  canvasHeight: number;
  canvasWidth: number;
  draw: (props: PaintImageParams) => void;
  imageElement?: HTMLImageElement;
}

const EditorContext = createContext<EditorContextProps>({} as EditorContextProps);

export default EditorContext;
