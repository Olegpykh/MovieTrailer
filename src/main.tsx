import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { ClerkProvider } from '@clerk/clerk-react';
import { clerkKey } from './auth/clerk';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
