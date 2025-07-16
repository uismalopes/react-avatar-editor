import { useCallback } from 'react';
import type { RefObject, SetStateAction } from 'react';
import { getNewOffsetFromMouseDrag, getZoomOffset } from '../library';
import type { Offset } from '../types';
import { IDrawParams } from './useDraw';

type OffsetSetter = (value: SetStateAction<Offset>) => void;
type ScaleSetter = (value: SetStateAction<number>) => void;

interface EventHookParams {
  offset: Offset;
  scale: number;
  dragging: RefObject<boolean>;
  lastPos: RefObject<Offset>;
  setOffset: OffsetSetter;
  setScale: ScaleSetter;
  draw: ({ scale, offset }: IDrawParams) => void;
}

function useEvents({
  offset,
  scale,
  dragging,
  lastPos,
  setOffset,
  setScale,
  draw,
}: EventHookParams) {
  const handleZoomChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newScale = parseFloat(event.target.value);
      const newOffset = getZoomOffset({ newScale, offset, scale });

      setScale(newScale);
      setOffset(newOffset);
      draw({ scale: newScale, offset: newOffset });
    },
    [offset, scale, setScale, setOffset, draw]
  );

  const handleZoomInput = function (event: React.ChangeEvent<HTMLInputElement>) {
    const newScale = parseFloat(event.target.value);
    const progress = (newScale / parseFloat(event.target.max)) * 100;
    console.log(progress);

    event.target.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      dragging.current = true;
      lastPos.current = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
    },
    [dragging, lastPos]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!dragging.current) return;

      const currentMouse = {
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      };

      const newOffset = getNewOffsetFromMouseDrag({
        currentMouse,
        lastMouse: lastPos.current,
        currentOffset: offset,
      });

      lastPos.current = currentMouse;
      setOffset(newOffset);
      draw({ scale, offset: newOffset });
    },
    [dragging, lastPos, offset, scale, setOffset, draw]
  );

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, [dragging]);

  return {
    handleZoomChange,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleZoomInput,
  };
}

export default useEvents;
