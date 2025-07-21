import { useRef, useState } from 'react';
import { RoundAvatarEditor, ErrorLoadImage, EditorRef } from 'react-round-avatar';
import './styles/main.scss';

function App() {
  const [file, setFile] = useState<File | string>(
    'https://upload.wikimedia.org/wikipedia/pt/b/bf/SpongeBob_SquarePants_personagem.png'
  );
  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = event.target.files?.[0];
    if (currentFile) setFile(currentFile);
  };

  const editorRef = useRef<EditorRef>(null);

  const [convertImage, setConvertImage] = useState<string>();

  const handleSave = () => {
    const editor = editorRef.current;
    if (!editor) return;
    setConvertImage(editor.getImage()?.toDataURL() || '');
  };

  const handleError = (error: ErrorLoadImage) => {
    console.log(error);
  };

  const handleImageReady = (image: HTMLImageElement) => {
    console.log(image);
  };

  const handleClickRestore = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.restoreImage();
  };

  return (
    <section className="container">
      <div className="my-5">
        <div className="row justify-content-center">
          <div className="col-4">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1>React Round Avatar</h1>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  name="avatar-image"
                  accept="image/png, image/jpeg"
                  onChange={onChangeImage}
                />
              </div>
              <div className="card">
                <RoundAvatarEditor
                  ref={editorRef}
                  image={file}
                  width={200}
                  height={200}
                  onError={handleError}
                  onImageReady={handleImageReady}
                  onPositionChange={(offset) => console.log('new offset', offset)}
                  onMouseMove={() => console.log('mouse move')}
                  onMouseUp={() => console.log('mouse up')}
                  onScaleChange={(scale) => console.log('new Scale', scale)}
                  restoreButton={{
                    show: false,
                  }}
                  crossOrigin="anonymous"
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="d-flex flex-column gap-3  align-items-center">
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={handleClickRestore}
                    style={{ marginTop: 10 }}
                  >
                    Restore
                  </button>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    style={{ marginTop: 10 }}
                  >
                    Generate Image
                  </button>
                </div>
                <h1 className="mt-4 text-center">Preview</h1>
                <div className="w-75 text-center">
                  <img src={convertImage} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
