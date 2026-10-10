import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');
if (container) {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode') === 'tab' ? 'tab' : 'popup';
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App mode={mode} />
    </StrictMode>
  );
}
