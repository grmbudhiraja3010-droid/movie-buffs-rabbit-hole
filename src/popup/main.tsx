import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');
if (container) {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode') === 'tab' ? 'tab' : 'popup';

  // Apply mode class to both html and body for styling
  document.documentElement.classList.remove('mode-popup', 'mode-tab');
  document.body.classList.remove('mode-popup', 'mode-tab');
  document.documentElement.classList.add(`mode-${mode}`);
  document.body.classList.add(`mode-${mode}`);

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App mode={mode} />
    </StrictMode>
  );
}
