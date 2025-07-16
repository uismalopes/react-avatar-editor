import { CANVAS_SIZE } from '../constants';
import { Offset } from '../types';

interface IProps {
  image: HTMLImageElement;
  scaleBase: number;
}

function getDefaultOffset({ image, scaleBase }: IProps): Offset {
  const initialOffsetX = (CANVAS_SIZE - image.width * scaleBase) / 2;
  const initialOffsetY = (CANVAS_SIZE - image.height * scaleBase) / 2;
  const initialOffset: Offset = {
    x: initialOffsetX,
    y: initialOffsetY,
  };

  return initialOffset;
}

export default getDefaultOffset;
