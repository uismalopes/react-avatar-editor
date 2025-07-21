import { useContext } from 'react';
import EditorContext from '../editor-context';

function useEditorContext() {
  const context = useContext(EditorContext);

  if (!context) throw new Error();

  return context;
}

export default useEditorContext;
