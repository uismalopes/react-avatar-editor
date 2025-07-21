import { forwardRef } from 'react';
import { PREFIX_CLASS, ZOOM_RANGE } from './constants';
import styles from './styles/editor.module.scss';
import { InputRange, RestoreButton } from './types/EditorProps';

interface IProps {
  width: number;
  height: number;
  scale: number;
  minZoom: number | string;
  maxZoom: number | string;
  onZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onClickResetValues: () => void;
  className?: string;
  restoreButton?: RestoreButton;
  inputRange?: InputRange;
}

const EditorView = forwardRef<HTMLCanvasElement, IProps>((props, ref) => (
  <div className={`${styles.wrapper} ${props.className}`.trim()}>
    <canvas
      className={`${PREFIX_CLASS}-canvas`}
      ref={ref}
      width={props.width}
      height={props.height}
      onMouseDown={props.onMouseDown}
      onMouseMove={props.onMouseMove}
      onMouseUp={props.onMouseUp}
      onMouseLeave={props.onMouseLeave}
    />
    {props.inputRange?.show && (
      <div className={`${styles.range} ${PREFIX_CLASS}-range`}>
        <input
          type="range"
          min={props.minZoom}
          max={props.maxZoom}
          step={ZOOM_RANGE.STEP}
          value={Math.round(props.scale / ZOOM_RANGE.STEP) * ZOOM_RANGE.STEP}
          onChange={props.onZoomChange}
          disabled={props.inputRange?.disabled}
          className={props.inputRange?.clasName || ''}
        />
      </div>
    )}
    {props.restoreButton?.show && (
      <div className={`${styles.button} ${PREFIX_CLASS}-button-restore`}>
        <button
          type="button"
          onClick={props.onClickResetValues}
          className={props.restoreButton.className}
          disabled={props.restoreButton.disabled}
        >
          {props.restoreButton.text}
        </button>
      </div>
    )}
  </div>
));

export default EditorView;
