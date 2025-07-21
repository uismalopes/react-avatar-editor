import { useState } from 'react';
import { getNewOffsetFromMouseDrag, getZoomOffset } from '../library';
import type { EditorProps, Offset } from '../types';
import { DEFAULT_OFFSET } from '../constants';
import { useEditorContext } from '../context/hooks';

type Listeners = Pick<
  EditorProps,
  'onMouseMove' | 'onMouseUp' | 'onPositionChange' | 'onScaleChange'
>;

interface EventHookParams {
  offset: Offset;
  scale: number;
  observerOffset?: (offset: Offset) => void;
  observerScale?: (scale: number) => void;
}

function useEvents({ offset, scale, observerOffset, observerScale }: EventHookParams) {
  const { canvasHeight, canvasWidth, ...context } = useEditorContext();

  const listeners: Listeners = {
    onMouseMove: context.onMouseMove,
    onMouseUp: context.onMouseUp,
    onPositionChange: context.onPositionChange,
    onScaleChange: context.onScaleChange,
  };

  const [dragging, setDragging] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<Offset>(DEFAULT_OFFSET);

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(event.target.value);
    const newOffset = getZoomOffset({ newScale, offset, scale, canvasHeight, canvasWidth });
    observerOffset?.(newOffset);
    observerScale?.(newScale);

    listeners.onScaleChange?.(newScale);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    setLastPos({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    listeners.onMouseMove?.();
    if (!dragging) return;

    const currentMouse = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };

    const newOffset = getNewOffsetFromMouseDrag({
      currentMouse,
      lastMouse: lastPos,
      currentOffset: offset,
    });

    setLastPos(currentMouse);
    observerOffset?.(newOffset);
    listeners.onPositionChange?.(newOffset);
  };

  const handleMouseUp = () => {
    setDragging(false);
    listeners.onMouseUp?.();
  };

  const resetStates = () => {
    setDragging(false);
    setLastPos(DEFAULT_OFFSET);
  };

  return {
    resetStates,
    handleZoomChange,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}

export default useEvents;
