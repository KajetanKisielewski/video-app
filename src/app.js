import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import Main from './components/Main';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<Main />);

