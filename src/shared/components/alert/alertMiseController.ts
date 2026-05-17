import { useCallback } from 'react'
import type { AlertOptions } from '@ionic/react'

class AlertController {
  private _options: AlertOptions = { header: '', message: '', buttons: [] }
  private _visible = false
  private _resolveDismissing?: () => void

  show(options: AlertOptions): Promise<void> {
    this._options = options
    this._visible = true
    this._resolveDismissing = undefined
    notifyStateChange()
    return new Promise((resolve) => {
      this._resolveDismissing = resolve
    })
  }

  dismiss() {
    this._visible = false
    const resolve = this._resolveDismissing
    this._resolveDismissing = undefined
    notifyStateChange()
    resolve?.()
  }

  get options(): AlertOptions {
    return this._options
  }

  get visible(): boolean {
    return this._visible
  }
}

type AlertSubscriber = () => void

const alertController = new AlertController()

let stateNotifier: AlertSubscriber | null = null

function notifyStateChange() {
  stateNotifier?.()
}

export function registerAlertNotifier(notifier: AlertSubscriber) {
  stateNotifier = notifier
  return () => {
    if (stateNotifier === notifier) {
      stateNotifier = null
    }
  }
}

export function getAlertController() {
  return alertController
}

export type { AlertOptions }

export function useAlertMise() {
  const showAlert = useCallback((options: AlertOptions) => {
    return alertController.show(options)
  }, [])

  return { showAlert }
}
