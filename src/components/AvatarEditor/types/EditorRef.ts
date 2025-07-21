export interface EditorRef {
  getImage: () => HTMLCanvasElement | undefined;
  restoreImage: () => void;
}
