import { useRef, useState } from 'react';
import { AvatarEditor, type AvatarEditorRef } from 'react-avatar-editor';
import './styles/main.scss';

function App() {
  const [image, setImage] = useState<string>('');
  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = event.target.files?.[0];
    if (currentFile) {
      const reader = new FileReader();
      reader.readAsDataURL(currentFile);

      reader.onload = function () {
        const data = this.result?.toString();
        if (data) setImage(data);
      };
    }
  };

  const jacoRef = useRef<AvatarEditorRef>(null);

  const [convertImage, setConvertImage] = useState<string>();

  const onSave = () => {
    const events = jacoRef.current;
    if (events) {
      setConvertImage(events.convert.toDataURL());
    }
  };
  return (
    <section className="container">
      <div className="my-5">
        <div className="row justify-content-center">
          <div className="col-4">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1>React Avatar Editor</h1>
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
                <AvatarEditor ref={jacoRef} image={image} />
              </div>
            </div>
            <div className="mt-5">
              <div className="d-flex flex-column gap-3  align-items-center">
                <div className="text-center">
                  <button className="btn btn-primary" onClick={onSave} style={{ marginTop: 10 }}>
                    Gerar imagem
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
