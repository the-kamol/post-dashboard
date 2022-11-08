import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { saveState } from 'utils/storage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.subscribe(() => saveState('posts', store.getState().post));

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
    <ToastContainer />
  </Provider>
);

export default App;
