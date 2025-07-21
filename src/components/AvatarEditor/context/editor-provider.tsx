import { useCallback, useEffect, useMemo, useRef, type PropsWithChildren } from 'react';

import EditorContext, { EditorContextProps } from './editor-context';
import { EditorProps, ErrorLoadImage } from '../types';
import { DEFAULT_CANVAS_SIZE } from '../constants';
import { useImageLoader } from '../hooks';
import { paintImage, PaintImageParams } from '../utils/paintImage';

function EditorProvider({ children, ...props }: PropsWithChildren<EditorProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onImageReadyRef = useRef(props.onImageReady);
  const onErrorRef = useRef(props.onError);

  useEffect(() => {
    onImageReadyRef.current = props.onImageReady;
  }, [props.onImageReady]);

  useEffect(() => {
    onErrorRef.current = props.onError;
  }, [props.onError]);

  const handleImageReady = useCallback((image: HTMLImageElement) => {
    onImageReadyRef.current?.(image);
  }, []);

  const handleError = useCallback((error: ErrorLoadImage) => {
    onErrorRef.current?.(error);
  }, []);

  const { data: imageElement } = useImageLoader({
    canvasRef,
    image: props.image,
    crossOrigin: props.crossOrigin ?? '',
    enabled: Boolean(props.image),
    onImageReady: handleImageReady,
    onError: handleError,
  });

  const draw = useCallback(
    ({ offset, scale }: PaintImageParams) => {
      if (imageElement) {
        paintImage({
          offset,
          scale,
          canvas: canvasRef.current,
          imageElement,
          paintBg: true,
        });
      }
    },
    [imageElement]
  );

  const contextValue = useMemo<EditorContextProps>(() => {
    const { height = DEFAULT_CANVAS_SIZE, width = DEFAULT_CANVAS_SIZE, crossOrigin = '' } = props;

    return {
      ...props,
      canvasHeight: height,
      canvasWidth: width,
      crossOrigin,
      inputRange: {
        disabled: false,
        show: true,
        ...props.inputRange,
      },
      restoreButton: {
        show: true,
        disabled: false,
        text: 'Restore',
        ...props.restoreButton,
      },
      canvasRef,
      draw,
      imageElement,
    };
  }, [props, draw, imageElement]);

  return <EditorContext.Provider value={contextValue}>{children}</EditorContext.Provider>;
}

export default EditorProvider;
