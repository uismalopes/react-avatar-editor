import { Offset } from '../types';

export interface PaintImageParams {
  scale: number;
  offset: Offset;
  canvas?: HTMLCanvasElement | null;
  imageElement?: HTMLImageElement;
  paintBg?: boolean;
}

export function paintImage({
  offset,
  scale,
  imageElement,
  canvas,
  paintBg = false,
}: PaintImageParams) {
  const image = imageElement;
  const ctx = canvas?.getContext('2d');

  if (!image || !ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
  ctx.clip();
  if (paintBg) {
    const boxSize = 10;
    for (let y = 0; y < canvas.height; y += boxSize) {
      for (let x = 0; x < canvas.width; x += boxSize) {
        const isEven = (x / boxSize + y / boxSize) % 2 === 0;
        ctx.fillStyle = isEven ? '#ccc' : '#fff';
        ctx.fillRect(x, y, boxSize, boxSize);
      }
    }
  }

  const width = image.width * scale;
  const height = image.height * scale;

  ctx.drawImage(image, offset.x, offset.y, width, height);

  ctx.restore();
}
