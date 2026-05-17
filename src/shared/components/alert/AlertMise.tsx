import { useEffect, useState } from 'react'
import { IonAlert } from '@ionic/react'
import { getAlertController, registerAlertNotifier } from './alertMiseController'

const alertController = getAlertController()

// ---------------------------------------------------------------------------
// AlertMise — global singleton host component
// ---------------------------------------------------------------------------

/**
 * Global alert host. Renders a single IonAlert that is controlled by
 * AlertController (module-level singleton).
 *
 * Mounted once in App.tsx. Re-renders only when alert visibility changes,
 * which keeps rerenders local and prevents app-wide cascades.
 */
export function AlertMise() {
  // Only used as a re-render trigger — value itself is meaningless
  const [, setTick] = useState(0)

  useEffect(() => {
    return registerAlertNotifier(() => setTick((n) => n + 1))
  }, [])

  return (
    <IonAlert
      isOpen={alertController.visible}
      onDidDismiss={() => alertController.dismiss()}
      header={alertController.options.header ?? ''}
      message={alertController.options.message ?? ''}
      buttons={alertController.options.buttons ?? []}
      inputs={alertController.options.inputs}
      cssClass={alertController.options.cssClass}
    />
  )
}
