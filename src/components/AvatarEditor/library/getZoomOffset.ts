import type { Offset } from '../types';

interface GetZoomOffsetParams {
  newScale: number;
  scale: number;
  offset: Offset;
  canvasWidth: number;
  canvasHeight: number;
}

function getZoomOffset({
  newScale,
  scale,
  offset,
  canvasHeight,
  canvasWidth,
}: GetZoomOffsetParams) {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  const zoomRatio = newScale / scale;

  const newOffsetX = centerX - (centerX - offset.x) * zoomRatio;
  const newOffsetY = centerY - (centerY - offset.y) * zoomRatio;

  return {
    x: newOffsetX,
    y: newOffsetY,
  };
}

export default getZoomOffset;
