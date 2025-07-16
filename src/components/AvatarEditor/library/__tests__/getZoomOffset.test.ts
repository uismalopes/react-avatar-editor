import getZoomOffset from '../getZoomOffset';
import type { Offset } from '../../types';

// Mocking CANVAS_SIZE to make the tests predictable
jest.mock('../../constants', () => ({
  CANVAS_SIZE: 400,
}));

describe('getZoomOffset', () => {
  const CANVAS_SIZE = 400;
  const center = CANVAS_SIZE / 2;

  it('should return the same offset when scale does not change', () => {
    const scale = 2;
    const newScale = 2;
    const offset: Offset = { x: 50, y: 100 };

    const result = getZoomOffset({ newScale, scale, offset });

    expect(result).toEqual(offset);
  });

  it('should calculate zoom-in offset correctly (zooming in)', () => {
    const scale = 1;
    const newScale = 2;
    const offset: Offset = { x: 0, y: 0 };

    // Zoom ratio = 2
    // newOffsetX = 200 - (200 - 0) * 2 = 200 - 400 = -200
    // newOffsetY = 200 - (200 - 0) * 2 = 200 - 400 = -200
    const expected: Offset = { x: -200, y: -200 };

    const result = getZoomOffset({ newScale, scale, offset });

    expect(result).toEqual(expected);
  });

  it('should calculate zoom-out offset correctly (zooming out)', () => {
    const scale = 2;
    const newScale = 1;
    const offset: Offset = { x: -200, y: -200 };

    // Zoom ratio = 0.5
    // newOffsetX = 200 - (200 - (-200)) * 0.5 = 200 - 400 * 0.5 = 200 - 200 = 0
    // newOffsetY = same
    const expected: Offset = { x: 0, y: 0 };

    const result = getZoomOffset({ newScale, scale, offset });

    expect(result).toEqual(expected);
  });

  it('should work when the offset is already centered', () => {
    const scale = 1;
    const newScale = 2;
    const offset: Offset = { x: center, y: center };

    const result = getZoomOffset({ newScale, scale, offset });

    // If already centered, result stays centered
    expect(result).toEqual({ x: center, y: center });
  });
});
