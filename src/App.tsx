import './App.css';
import { Provider } from 'react-redux';
import AppRoutes from './components/Routes/Routes';

import Header from './components/Header/Header';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="bg-whitesmoke">
        <Header />
        <AppRoutes />;
      </div>
    </Provider>
  );
}
export default App;
