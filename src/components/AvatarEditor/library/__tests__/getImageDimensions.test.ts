import getImageDimensions from '../getImageDimensions';

describe('getImageDimensions', () => {
  it('scales image to fit canvas when canvas is taller relative to width (canvasRatio > imageRatio)', () => {
    const result = getImageDimensions({
      image: { width: 100, height: 100 },
      canvas: { width: 100, height: 200 },
    });

    // canvasRatio = 2, imageRatio = 1 → canvas is taller
    expect(result).toEqual({ width: 200, height: 200 });
  });

  it('scales image to fit canvas when canvas is wider relative to height (canvasRatio < imageRatio)', () => {
    const result = getImageDimensions({
      image: { width: 100, height: 200 },
      canvas: { width: 200, height: 100 },
    });

    expect(result).toEqual({ width: 200, height: 400 });
  });

  it('returns original dimensions when image and canvas have the same aspect ratio', () => {
    const result = getImageDimensions({
      image: { width: 100, height: 200 },
      canvas: { width: 300, height: 600 },
    });

    // both aspect ratios are 2
    expect(result).toEqual({ width: 300, height: 600 });
  });

  it('rounds the resulting dimensions correctly', () => {
    const result = getImageDimensions({
      image: { width: 101, height: 100 },
      canvas: { width: 200, height: 100 },
    });

    // canvasRatio = 0.5, imageRatio ≈ 0.99 → canvas is wider
    // newWidth = 200, newHeight = Math.round(100 * (200 / 101)) ≈ Math.round(198.02) = 198
    expect(result).toEqual({ width: 200, height: 198 });
  });
});
