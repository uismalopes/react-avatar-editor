export interface ReturnConvertCanvas {
  toBlob: (callback: BlobCallback, type?: string, quality?: number) => void;
  toDataURL: (type?: string, quality?: number) => string;
}
