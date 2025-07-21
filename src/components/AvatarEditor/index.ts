import Editor from './editor.controller';
import { withProvider } from './context/hoc';
export * from './types';

const RoundAvatarEditor = withProvider(Editor);

export { RoundAvatarEditor };
