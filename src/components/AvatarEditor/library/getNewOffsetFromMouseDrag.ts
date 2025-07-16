import type { Offset } from '../types';

interface GetDraggedOffsetProps {
  currentMouse: Offset;
  lastMouse: Offset;
  currentOffset: Offset;
}

export function getNewOffsetFromMouseDrag({
  currentMouse,
  lastMouse,
  currentOffset,
}: GetDraggedOffsetProps): Offset {
  const dx = currentMouse.x - lastMouse.x;
  const dy = currentMouse.y - lastMouse.y;

  return {
    x: currentOffset.x + dx,
    y: currentOffset.y + dy,
  };
}
