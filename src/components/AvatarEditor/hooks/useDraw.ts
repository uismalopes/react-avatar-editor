import { useCallback, type RefObject } from 'react';

export interface IDrawParams {
  scale: number;
  offset: { x: number; y: number };
}

interface IUseDrawParams {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  imageRef: RefObject<HTMLImageElement | null>;
}

function useDraw({ canvasRef, imageRef }: IUseDrawParams) {
  const draw = useCallback(
    ({ scale, offset }: IDrawParams) => {
      const canvas = canvasRef.current;
      const image = imageRef.current;

      if (!canvas || !image) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
      ctx.clip();

      const boxSize = 10;
      for (let y = 0; y < canvas.height; y += boxSize) {
        for (let x = 0; x < canvas.width; x += boxSize) {
          const isEven = (x / boxSize + y / boxSize) % 2 === 0;
          ctx.fillStyle = isEven ? '#ccc' : '#fff';
          ctx.fillRect(x, y, boxSize, boxSize);
        }
      }

      const width = image.width * scale;
      const height = image.height * scale;

      ctx.drawImage(image, offset.x, offset.y, width, height);

      ctx.restore();
    },
    [canvasRef, imageRef]
  );

  return draw;
}

export default useDraw;
