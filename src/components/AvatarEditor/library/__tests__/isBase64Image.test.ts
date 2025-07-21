import isBase64Image from '../isBase64Image';

// isBase64Image.test.ts

describe('isBase64Image', () => {
  it('should return true for a valid base64 PNG image string', () => {
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
    expect(isBase64Image(base64)).toBe(true);
  });

  it('should return true for a valid base64 JPEG image string', () => {
    const base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD';
    expect(isBase64Image(base64)).toBe(true);
  });

  it('should return true for a valid base64 GIF image string', () => {
    const base64 = 'data:image/gif;base64,R0lGODdhPQBEAPeoAJosM//AwO/AwHV';
    expect(isBase64Image(base64)).toBe(true);
  });

  it('should return false for a string without data URI prefix', () => {
    const notBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAUA';
    expect(isBase64Image(notBase64)).toBe(false);
  });

  it('should return false for a random string', () => {
    expect(isBase64Image('hello world')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isBase64Image('')).toBe(false);
  });

  it('should return false for a non-image data URI', () => {
    const notImage = 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==';
    expect(isBase64Image(notImage)).toBe(false);
  });

  it('should return false for undefined', () => {
    // @ts-expect-error
    expect(isBase64Image(undefined)).toBe(false);
  });

  it('should return false for null', () => {
    // @ts-expect-error
    expect(isBase64Image(null)).toBe(false);
  });
});
