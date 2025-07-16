import { getNewOffsetFromMouseDrag } from '../getNewOffsetFromMouseDrag';
import type { Offset } from '../../types';

describe('getNewOffsetFromMouseDrag', () => {
  it('should calculate the new offset based on mouse movement', () => {
    const currentMouse: Offset = { x: 120, y: 150 };
    const lastMouse: Offset = { x: 100, y: 100 };
    const currentOffset: Offset = { x: 10, y: 20 };

    // deltaX = 20, deltaY = 50 → expected offset = 10 + 20, 20 + 50
    const expectedOffset: Offset = { x: 30, y: 70 };

    expect(getNewOffsetFromMouseDrag({ currentMouse, lastMouse, currentOffset })).toEqual(
      expectedOffset
    );
  });

  it('should return the same offset when there is no mouse movement', () => {
    const currentMouse: Offset = { x: 200, y: 200 };
    const lastMouse: Offset = { x: 200, y: 200 };
    const currentOffset: Offset = { x: 50, y: 50 };

    const expectedOffset: Offset = { x: 50, y: 50 };

    expect(getNewOffsetFromMouseDrag({ currentMouse, lastMouse, currentOffset })).toEqual(
      expectedOffset
    );
  });

  it('should handle negative mouse movement correctly', () => {
    const currentMouse: Offset = { x: 80, y: 90 };
    const lastMouse: Offset = { x: 100, y: 100 };
    const currentOffset: Offset = { x: 20, y: 30 };

    // deltaX = -20, deltaY = -10 → expected = 0, 20
    const expectedOffset: Offset = { x: 0, y: 20 };

    expect(getNewOffsetFromMouseDrag({ currentMouse, lastMouse, currentOffset })).toEqual(
      expectedOffset
    );
  });
});
