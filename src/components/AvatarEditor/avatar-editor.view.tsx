import { forwardRef } from 'react';
import { CANVAS_SIZE, ZOOM_RANGE } from './constants';
import styles from './styles/avatar-editor.module.scss';

interface IProps {
  scale: number;
  minZoom: number | string;
  maxZoom: number | string;
  onZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onClickResetValues: () => void;
  showResetButton?: boolean;
  className?: string;
  disabledRange?: boolean;
}

const AvatarEditorView = forwardRef<HTMLCanvasElement, IProps>((props, ref) => (
  <div className={`${styles.avatarEditorModule} ${props.className}`.trim()}>
    <canvas
      className="avatar-editor-canvas"
      ref={ref}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      onMouseDown={props.onMouseDown}
      onMouseMove={props.onMouseMove}
      onMouseUp={props.onMouseUp}
      onMouseLeave={props.onMouseLeave}
    />
    <div className={`${styles.avatarEditorRange} avatar-editor-range`}>
      <input
        type="range"
        min={props.minZoom}
        max={props.maxZoom}
        step={ZOOM_RANGE.STEP}
        value={Math.round(props.scale / ZOOM_RANGE.STEP) * ZOOM_RANGE.STEP}
        onChange={props.onZoomChange}
        disabled={props.disabledRange}
      />
    </div>
    {props.showResetButton && (
      <div className={`${styles.avatarEditorButton} avatar-editor-button-restore`}>
        <button type="button" onClick={props.onClickResetValues}>
          Restaurar
        </button>
      </div>
    )}
  </div>
));

export default AvatarEditorView;
