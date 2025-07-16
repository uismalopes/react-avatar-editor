import { CANVAS_SIZE } from '../constants';
import type { Offset } from '../types';

interface IProps {
  newScale: number;
  scale: number;
  offset: Offset;
}

function getZoomOffset({ newScale, scale, offset }: IProps) {
  const centerX = CANVAS_SIZE / 2;
  const centerY = CANVAS_SIZE / 2;

  const zoomRatio = newScale / scale;

  const newOffsetX = centerX - (centerX - offset.x) * zoomRatio;
  const newOffsetY = centerY - (centerY - offset.y) * zoomRatio;

  return {
    x: newOffsetX,
    y: newOffsetY,
  };
}

export default getZoomOffset;
