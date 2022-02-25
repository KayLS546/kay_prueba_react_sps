import { Provider } from 'react-redux';
import Home from './src/home/home';
import store from './src/index';

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

