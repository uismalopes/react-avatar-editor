import { ForwardRefExoticComponent, RefAttributes, forwardRef } from 'react';
import EditorProvider from '../editor-provider';
import { EditorProps, EditorRef } from '../../types';

function withProvider(WrapperComponent: ForwardRefExoticComponent<RefAttributes<EditorRef>>) {
  const ComponentWithProvider = forwardRef<EditorRef, EditorProps>((props, ref) => (
    <EditorProvider {...props}>
      <WrapperComponent ref={ref} />
    </EditorProvider>
  ));

  ComponentWithProvider.displayName = `withProvider(${
    WrapperComponent.displayName || WrapperComponent.name || 'Component'
  })`;

  return ComponentWithProvider;
}

export default withProvider;
