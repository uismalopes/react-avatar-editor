import { RefObject, useCallback } from 'react';
import { ReturnConvertCanvas } from '../types';

function useConvertCanvas(canvasRef: RefObject<HTMLCanvasElement | null>): ReturnConvertCanvas {
  const toBlob = useCallback(
    (callback: BlobCallback, type?: string, quality?: number) => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.toBlob(callback, type, quality);
      } else {
        callback(null);
      }
    },
    [canvasRef]
  );

  const toDataURL = useCallback(
    (type?: string, quality?: number): string => {
      const canvas = canvasRef.current;
      if (canvas) {
        return canvas.toDataURL(type, quality);
      }
      return '';
    },
    [canvasRef]
  );

  return {
    toBlob,
    toDataURL,
  };
}

export default useConvertCanvas;
