import { Offset } from '../types';

interface IProps {
  image: HTMLImageElement;
  scaleBase: number;
  canvasWidth: number;
  canvasHeight: number;
}

function getDefaultOffset({ image, scaleBase, canvasWidth, canvasHeight }: IProps): Offset {
  const initialOffsetX = (canvasWidth - image.width * scaleBase) / 2;
  const initialOffsetY = (canvasHeight - image.height * scaleBase) / 2;
  const initialOffset: Offset = {
    x: initialOffsetX,
    y: initialOffsetY,
  };

  return initialOffset;
}

export default getDefaultOffset;
