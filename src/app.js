import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />);

