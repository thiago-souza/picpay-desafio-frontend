import { hot } from 'react-hot-loader';
import App from './app';

declare let module: Record<string, unknown>;
export default hot(module)(App);
