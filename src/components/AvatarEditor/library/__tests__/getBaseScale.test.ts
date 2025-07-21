import getBaseScale from '../getBaseScale';

describe('getBaseScale', () => {
  function createImage(width: number, height: number): HTMLImageElement {
    return { width, height } as HTMLImageElement;
  }

  it('should return 1 if image is undefined', () => {
    expect(getBaseScale({ canvasWidth: 100, canvasHeight: 100 })).toBe(1);
  });

  it('should return 1 if image size matches canvas size', () => {
    const image = createImage(200, 200);
    expect(getBaseScale({ canvasWidth: 200, canvasHeight: 200, image })).toBe(1);
  });

  it('should return < 1 if image is larger than canvas', () => {
    const image = createImage(400, 400);
    expect(getBaseScale({ canvasWidth: 200, canvasHeight: 200, image })).toBe(0.5);
  });

  it('should return > 1 if image is smaller than canvas', () => {
    const image = createImage(100, 100);
    expect(getBaseScale({ canvasWidth: 200, canvasHeight: 200, image })).toBe(2);
  });

  it('should use the largest scale factor for non-square images/canvas', () => {
    const image = createImage(100, 200);
    expect(getBaseScale({ canvasWidth: 300, canvasHeight: 100, image })).toBe(3);
    // canvasWidth/image.width = 3, canvasHeight/image.height = 0.5
    // max = 3
  });

  it('should handle zero image width gracefully', () => {
    const image = createImage(0, 100);
    expect(getBaseScale({ canvasWidth: 100, canvasHeight: 100, image })).toBe(Infinity);
  });

  it('should handle zero image height gracefully', () => {
    const image = createImage(100, 0);
    expect(getBaseScale({ canvasWidth: 100, canvasHeight: 100, image })).toBe(Infinity);
  });
});
