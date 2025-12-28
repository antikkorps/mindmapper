import { onMounted, onBeforeUnmount } from 'vue'

/**
 * DRY composable for keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to handlers
 * @param {Object} options - Options (enabled, preventDefault)
 *
 * @example
 * useKeyboardShortcuts({
 *   'ctrl+n': () => addNode(),
 *   'delete': () => deleteNode(),
 *   'escape': () => closeModal(),
 * })
 */
export function useKeyboardShortcuts(shortcuts, options = {}) {
  const {
    enabled = true,
    preventDefault = true,
    target = null, // null = document, or pass a ref
  } = options

  const handleKeyDown = event => {
    if (!enabled) return

    // Build key combination string
    const modifiers = []
    if (event.ctrlKey || event.metaKey) modifiers.push('ctrl')
    if (event.shiftKey) modifiers.push('shift')
    if (event.altKey) modifiers.push('alt')

    const key = event.key.toLowerCase()
    const combination = [...modifiers, key].join('+')

    // Also check without modifiers (for simple keys like 'escape', 'delete')
    const simpleKey = key === 'escape' ? 'escape' : key === 'delete' ? 'delete' : null

    // Find matching shortcut
    const handler = shortcuts[combination] || (simpleKey && shortcuts[simpleKey])

    if (handler) {
      if (preventDefault) {
        event.preventDefault()
      }
      handler(event)
    }
  }

  onMounted(() => {
    const element = target?.value || document
    element.addEventListener('keydown', handleKeyDown)
  })

  onBeforeUnmount(() => {
    const element = target?.value || document
    element.removeEventListener('keydown', handleKeyDown)
  })

  return {
    handleKeyDown,
  }
}

/**
 * Keyboard shortcuts reference
 */
export const SHORTCUTS = {
  // Editor shortcuts
  ADD_NODE: 'ctrl+n',
  DELETE_NODE: 'delete',
  SAVE: 'ctrl+s',
  UNDO: 'ctrl+z',
  REDO: 'ctrl+shift+z',

  // UI shortcuts
  ESCAPE: 'escape',
  SEARCH: 'ctrl+k',
  HELP: 'shift+?',

  // Navigation
  ZOOM_IN: 'ctrl++',
  ZOOM_OUT: 'ctrl+-',
  FIT_VIEW: 'ctrl+0',
}

export const SHORTCUT_DESCRIPTIONS = {
  [SHORTCUTS.ADD_NODE]: 'Add new node',
  [SHORTCUTS.DELETE_NODE]: 'Delete selected node',
  [SHORTCUTS.SAVE]: 'Save changes',
  [SHORTCUTS.UNDO]: 'Undo',
  [SHORTCUTS.REDO]: 'Redo',
  [SHORTCUTS.ESCAPE]: 'Close modal/menu',
  [SHORTCUTS.SEARCH]: 'Search',
  [SHORTCUTS.HELP]: 'Show keyboard shortcuts',
  [SHORTCUTS.ZOOM_IN]: 'Zoom in',
  [SHORTCUTS.ZOOM_OUT]: 'Zoom out',
  [SHORTCUTS.FIT_VIEW]: 'Fit view',
}
