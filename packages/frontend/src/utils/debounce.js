/**
 * DRY utility: Debounce function to limit API calls
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId = null

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * DRY utility: Throttle function to limit execution rate
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (fn, limit = 300) => {
  let inThrottle = false

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
