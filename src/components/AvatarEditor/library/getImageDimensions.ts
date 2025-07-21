interface GetImageDimensionsProps {
  image: {
    width: number;
    height: number;
  };
  canvas: {
    width: number;
    height: number;
  };
}

function getImageDimensions({ canvas, image }: GetImageDimensionsProps) {
  let newHeight: number;
  let newWidth: number;

  const { height, width } = image;

  const dimensions = canvas;
  const canvasRatio = dimensions.height / dimensions.width;
  const imageRatio = height / width;

  if (canvasRatio > imageRatio) {
    newHeight = dimensions.height;
    newWidth = Math.round(width * (newHeight / height));
  } else {
    newWidth = dimensions.width;
    newHeight = Math.round(height * (newWidth / width));
  }

  return {
    height: newHeight,
    width: newWidth,
  };
}

export default getImageDimensions;
