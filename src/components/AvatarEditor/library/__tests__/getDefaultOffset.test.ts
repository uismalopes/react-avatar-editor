import getDefaultOffset from '../getDefaultOffset';
import { DEFAULT_CANVAS_SIZE } from '../../constants';
import type { Offset } from '../../types';

describe('getDefaultOffset', () => {
  it('should calculate the correct center offset for a given image and scale', () => {
    const image = { width: 200, height: 100 } as HTMLImageElement;
    const scaleBase = 1.5;

    const expectedOffset: Offset = {
      x: (DEFAULT_CANVAS_SIZE - 200 * 1.5) / 2,
      y: (DEFAULT_CANVAS_SIZE - 100 * 1.5) / 2,
    };

    expect(
      getDefaultOffset({
        image,
        scaleBase,
        canvasHeight: DEFAULT_CANVAS_SIZE,
        canvasWidth: DEFAULT_CANVAS_SIZE,
      })
    ).toEqual(expectedOffset);
  });

  it('should return zero offset if image size times scale equals canvas size', () => {
    const size = DEFAULT_CANVAS_SIZE;
    const image = { width: size, height: size } as HTMLImageElement;
    const scaleBase = 1;

    const expectedOffset: Offset = { x: 0, y: 0 };

    expect(
      getDefaultOffset({
        image,
        scaleBase,
        canvasHeight: DEFAULT_CANVAS_SIZE,
        canvasWidth: DEFAULT_CANVAS_SIZE,
      })
    ).toEqual(expectedOffset);
  });

  it('should return negative offsets when the scaled image is larger than the canvas', () => {
    const image = {
      width: DEFAULT_CANVAS_SIZE * 2,
      height: DEFAULT_CANVAS_SIZE * 2,
    } as HTMLImageElement;
    const scaleBase = 1;

    const expectedOffset: Offset = {
      x: (DEFAULT_CANVAS_SIZE - DEFAULT_CANVAS_SIZE * 2) / 2, // negative
      y: (DEFAULT_CANVAS_SIZE - DEFAULT_CANVAS_SIZE * 2) / 2, // negative
    };

    expect(
      getDefaultOffset({
        image,
        scaleBase,
        canvasHeight: DEFAULT_CANVAS_SIZE,
        canvasWidth: DEFAULT_CANVAS_SIZE,
      })
    ).toEqual(expectedOffset);
  });
});
