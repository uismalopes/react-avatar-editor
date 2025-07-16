import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import AvatarEditorView from './avatar-editor.view';
import { CANVAS_SIZE, DEFAULT_OFFSET, ZOOM_RANGE } from './constants';
import { useConvertCanvas, useDraw, useEvents } from './hooks';
import { getDefaultOffset } from './library';
import type { AvatarEditorProps, Offset, AvatarEditorRef } from './types';

const AvatarEditor = forwardRef<AvatarEditorRef, AvatarEditorProps>((props, ref) => {
  const { image: imageData, showResetButton = true, className = '' } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);
  const lastPos = useRef<Offset>(DEFAULT_OFFSET);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [offset, setOffset] = useState<Offset>(DEFAULT_OFFSET);

  const draw = useDraw({ canvasRef, imageRef });

  const initializeImageView = useCallback(() => {
    const image = imageRef.current;
    if (!image) return;

    const scaleBase = Math.max(CANVAS_SIZE / image.width, CANVAS_SIZE / image.height);

    setBaseScale(scaleBase);
    setScale(scaleBase);

    const initialOffset = getDefaultOffset({ image, scaleBase });

    setOffset(initialOffset);
    draw({ scale: scaleBase, offset: initialOffset });
  }, [draw]);

  useEffect(() => {
    const image = new Image();
    image.src = imageData;

    image.onload = function () {
      imageRef.current = image;
      initializeImageView();
    };
  }, [imageData, initializeImageView]);

  const { handleMouseDown, handleMouseMove, handleMouseUp, handleZoomChange } = useEvents({
    dragging,
    lastPos,
    offset,
    scale,
    draw,
    setOffset,
    setScale,
  });

  const zoomRange = useMemo(
    () => ({
      min: baseScale,
      max: (baseScale * ZOOM_RANGE.MULTIPLIER).toFixed(2),
    }),
    [baseScale]
  );

  const convertCanvas = useConvertCanvas(canvasRef);

  useImperativeHandle(ref, () => ({
    convert: convertCanvas,
  }));

  const disabledRange = useMemo(() => {
    return props.disabledRange ?? Boolean(!imageData);
  }, [props, imageData]);

  return (
    <AvatarEditorView
      ref={canvasRef}
      scale={scale}
      minZoom={zoomRange.min}
      maxZoom={zoomRange.max}
      showResetButton={showResetButton}
      onZoomChange={handleZoomChange}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClickResetValues={initializeImageView}
      className={className}
      disabledRange={disabledRange}
    />
  );
});

export default AvatarEditor;
