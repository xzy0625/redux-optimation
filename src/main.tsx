import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Old.tsx'
import New from './New.tsx'
import { Provider } from 'react-redux'
import store from './old_store'
import newStore from './new_store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <Provider store={store}>
        <App />
      </Provider>
      <Provider store={newStore}>
        <New />
      </Provider>
    </div>
  </StrictMode>,
)
