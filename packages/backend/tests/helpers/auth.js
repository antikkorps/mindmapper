import { generateToken } from '../../src/utils/jwt.js'

/**
 * Auth helpers for testing protected routes
 */

export const getAuthToken = (user) => {
  return generateToken({
    id: user.id,
    email: user.email,
    username: user.username,
  })
}

export const getAuthHeader = (user) => {
  const token = getAuthToken(user)
  return `Bearer ${token}`
}
