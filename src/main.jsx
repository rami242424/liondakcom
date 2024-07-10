import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RecoilRoot } from 'recoil'; // RecoilRoot import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot> {/* RecoilRoot로 감싸기 */}
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);
