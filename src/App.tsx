import { useState } from 'react';
// import useTypedSelector from './hooks/useTypedSelector';
import reactLogo from './assets/react.svg';
import viteLogo from '../public/vite.svg';
import './App.css';
import apiRoot from './shared/API/apiRoot';

function App() {
  const getProject = () => {
    return apiRoot.get().execute();
  };
  getProject().then(console.log).catch(console.error);

  // const user = useTypedSelector(state => state.user);
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="flex">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(val => val + 1)} type="button">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}
export default App;
