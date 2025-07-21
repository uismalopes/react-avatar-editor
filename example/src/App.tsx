import React, { useEffect, useRef, useState } from 'react';
import { RoundAvatarEditor } from 'react-round-avatar';

function App() {
  const [file, setFile] = useState<File | string>('https://example.com/avatar.png');
  const editorRef = useRef(null);

  useEffect(() => {
    setFile('');
  }, []);

  return (
    <RoundAvatarEditor
      ref={editorRef}
      width={200}
      height={200}
      image={file}
      crossOrigin="anonymous"
      restoreButton={{
        text: 'Restore',
        className: 'restore-btn',
        show: true,
        onClick: () => alert('Restored!'),
        disabled: false,
      }}
      inputRange={{
        clasName: 'input-range',
        disabled: false,
        show: true,
      }}
      className="avatar-editor"
      onMouseMove={() => console.log('Mouse moving')}
      onMouseUp={() => console.log('Mouse up')}
      onImageReady={(img) => console.log('Image ready', img)}
      onPositionChange={(offset) => console.log('Position changed', offset)}
      onScaleChange={(scale) => console.log('Scale changed', scale)}
      onError={(error) => console.error('Error loading image', error)}
    />
  );
}

export default App;
