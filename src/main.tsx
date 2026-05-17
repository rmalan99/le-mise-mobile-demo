import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import '@ionic/react/css/core.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import '@/index.css'
import App from '@/App'

setupIonicReact()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IonReactRouter>
      <App />
    </IonReactRouter>
  </StrictMode>,
)
