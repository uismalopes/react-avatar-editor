import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import EditorView from './editor.view';
import { DEFAULT_OFFSET, DEFAULT_SCALE, ZOOM_RANGE } from './constants';
import { useEvents, useExportEvents } from './hooks';
import { getBaseScale, getDefaultOffset } from './library';
import type { Offset, EditorRef } from './types';
import { useEditorContext } from './context/hooks';

const Editor = forwardRef<EditorRef>((_, ref) => {
  const {
    canvasRef,
    canvasHeight,
    canvasWidth,
    imageElement,
    className,
    restoreButton,
    inputRange,
    draw,
    onPositionChange,
    onScaleChange,
  } = useEditorContext();

  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [offset, setOffset] = useState<Offset>(DEFAULT_OFFSET);

  const initialValuesRef = useRef({
    scale: DEFAULT_SCALE,
    offset: DEFAULT_OFFSET,
  });

  const setupImagePreview = useCallback(
    (image: HTMLImageElement) => {
      const newScale = getBaseScale({ canvasHeight, canvasWidth, image });
      const newOffset = getDefaultOffset({ image, scaleBase: newScale, canvasHeight, canvasWidth });

      setScale(newScale);
      setOffset(newOffset);

      initialValuesRef.current = {
        scale: newScale,
        offset: newOffset,
      };

      draw({ scale: newScale, offset: newOffset });
    },
    [canvasHeight, canvasWidth, draw]
  );

  useEffect(() => {
    if (!imageElement) return;
    setupImagePreview(imageElement);
  }, [imageElement, setupImagePreview]);

  const { resetStates, handleZoomChange, handleMouseDown, handleMouseMove, handleMouseUp } =
    useEvents({
      offset,
      scale,
      observerOffset: setOffset,
      observerScale: setScale,
    });

  const restoreInitialState = useCallback(() => {
    const { scale: defaultScale, offset: defaultOffset } = initialValuesRef.current;
    resetStates();
    setScale(defaultScale);
    setOffset(defaultOffset);
    onPositionChange?.(defaultOffset);
    onScaleChange?.(defaultScale);
    draw({ scale: defaultScale, offset: defaultOffset });
  }, [draw, resetStates, onPositionChange, onScaleChange]);

  const zoomRange = useMemo(
    () => ({
      min: initialValuesRef.current.scale,
      max: +(initialValuesRef.current.scale * ZOOM_RANGE.MULTIPLIER).toFixed(2),
    }),
    []
  );

  useEffect(() => {
    draw({ scale, offset });
  }, [scale, offset, draw]);

  const exportedEvents = useExportEvents({ offset, scale });

  useImperativeHandle(
    ref,
    () => ({
      ...exportedEvents,
      restoreImage: restoreInitialState,
    }),
    [exportedEvents, restoreInitialState]
  );

  return (
    <EditorView
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      maxZoom={zoomRange.max}
      minZoom={zoomRange.min}
      onClickResetValues={restoreInitialState}
      onZoomChange={handleZoomChange}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      scale={scale}
      restoreButton={restoreButton}
      inputRange={inputRange}
      className={className}
    />
  );
});

export default Editor;
