import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import type { EditorProps, ErrorLoadImage } from '../types';
import { getImageDimensions, isBase64Image } from '../library';
import { DEFAULT_CANVAS_SIZE } from '../constants';

interface UseImageLoaderParams {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  image?: EditorProps['image'];
  enabled?: boolean;
  crossOrigin?: EditorProps['crossOrigin'];
  onImageReady?: EditorProps['onImageReady'];
  onError?: EditorProps['onError'];
}

function useImageLoader({
  image = '',
  crossOrigin,
  enabled = true,
  onImageReady,
  onError,
  canvasRef,
}: UseImageLoaderParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorLoadImage | null>(null);
  const [data, setData] = useState<HTMLImageElement>();

  const prevImageRef = useRef<string | File>(null);

  const safeOnImageReady = useRef(onImageReady);
  const safeOnError = useRef(onError);

  useEffect(() => {
    safeOnImageReady.current = onImageReady;
    safeOnError.current = onError;
  }, [onImageReady, onError]);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    return new Promise<HTMLImageElement>((resolve, reject) => {
      if (!image) {
        reject(new Error('You need to pass a valid value in the image property'));
        return;
      }

      const img = new Image();

      img.onload = () => {
        const canvas = canvasRef.current;
        const { height, width } = getImageDimensions({
          canvas: {
            height: canvas?.height || DEFAULT_CANVAS_SIZE,
            width: canvas?.width || DEFAULT_CANVAS_SIZE,
          },
          image: {
            width: img.width,
            height: img.height,
          },
        });

        img.width = width;
        img.height = height;

        resolve(img);
      };

      img.onerror = (e) => {
        reject(e);
      };

      if (image instanceof File) {
        const reader = new FileReader();

        reader.onload = function () {
          const result = this.result?.toString() || '';
          img.src = result;
        };

        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(image);

        return;
      }

      if (!isBase64Image(image) && crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.src = image;
    });
  }, [canvasRef, crossOrigin, image]);

  useEffect(() => {
    if (!enabled || !image || image === prevImageRef.current) return;

    prevImageRef.current = image;

    fetchData()
      .then((img) => {
        setData(img);
        safeOnImageReady.current?.(img);
      })
      .catch((err) => {
        setError(err);
        safeOnError.current?.(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [enabled, image, fetchData]);

  return {
    isLoading,
    error,
    data,
    refetch: fetchData,
  };
}

export default useImageLoader;
