import React from 'react';
import { render } from 'react-dom';
// import { Root, createRoot } from 'react-dom/client';

import App from './components/App';

// get reference to window object
const w = window;

// get reference to geoview apis
const cgpv = w['cgpv'];

const { ui, react, createRoot } = cgpv;

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
