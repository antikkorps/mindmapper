import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce, throttle } from '@/utils/debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should delay function execution', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(299)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('should cancel previous calls', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn()
    vi.advanceTimersByTime(100)
    debouncedFn()
    vi.advanceTimersByTime(100)
    debouncedFn()

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('should pass arguments correctly', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 300)

    debouncedFn('test', 123)
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledWith('test', 123)
  })
})

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should execute immediately on first call', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 300)

    throttledFn()
    expect(fn).toHaveBeenCalledOnce()
  })

  it('should ignore calls within time limit', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 300)

    throttledFn()
    throttledFn()
    throttledFn()

    expect(fn).toHaveBeenCalledOnce()
  })

  it('should allow calls after time limit', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 300)

    throttledFn()
    vi.advanceTimersByTime(300)
    throttledFn()

    expect(fn).toHaveBeenCalledTimes(2)
  })
})
