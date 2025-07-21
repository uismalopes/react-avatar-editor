import { Offset } from '../types';
import { useEditorContext } from '../context/hooks';
import { paintImage } from '../utils';

interface UseExportEventsParams {
  scale: number;
  offset: Offset;
}

function useExportEvents({ offset, scale }: UseExportEventsParams) {
  const { imageElement, canvasHeight, canvasWidth } = useEditorContext();

  const getImage = () => {
    const image = imageElement;
    if (!image) return;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    paintImage({
      offset,
      scale,
      canvas,
      imageElement,
    });

    return canvas;
  };

  return {
    getImage,
  };
}

export default useExportEvents;
