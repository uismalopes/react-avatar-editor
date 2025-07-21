interface GetBaseScaleParams {
  canvasWidth: number;
  canvasHeight: number;
  image?: HTMLImageElement;
}

function getBaseScale({ canvasHeight, canvasWidth, image }: GetBaseScaleParams): number {
  if (!image) return 1;

  const scaleBase = Math.max(canvasWidth / image.width, canvasHeight / image.height);

  return scaleBase;
}

export default getBaseScale;
