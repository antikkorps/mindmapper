// Global toast instance (singleton pattern for DRY)
let toastInstance = null

export function setToastInstance(instance) {
  toastInstance = instance
}

export function useToast() {
  if (!toastInstance) {
    // Toast not ready yet - return no-op functions
    // This is normal during initial component setup
    return {
      success: () => {},
      error: () => {},
      warning: () => {},
      info: () => {},
    }
  }

  return {
    success: (message, duration = 3000) =>
      toastInstance.addToast(message, 'success', duration),
    error: (message, duration = 5000) =>
      toastInstance.addToast(message, 'error', duration),
    warning: (message, duration = 4000) =>
      toastInstance.addToast(message, 'warning', duration),
    info: (message, duration = 3000) =>
      toastInstance.addToast(message, 'info', duration),
  }
}
