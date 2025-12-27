import jwt from 'jsonwebtoken'
import config from '../config/index.js'

/**
 * JWT utility functions
 */

/**
 * Generate JWT access token
 * @param {Object} payload - User data to encode in token
 * @param {string} payload.id - User ID
 * @param {string} payload.email - User email
 * @returns {string} JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
      issuer: 'mindmapper-api',
      audience: 'mindmapper-app',
    }
  )
}

/**
 * Generate refresh token with longer expiration
 * @param {Object} payload - User data to encode in token
 * @returns {string} Refresh token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
    },
    config.jwt.secret,
    {
      expiresIn: '30d',
      issuer: 'mindmapper-api',
      audience: 'mindmapper-app',
    }
  )
}

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret, {
      issuer: 'mindmapper-api',
      audience: 'mindmapper-app',
    })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired')
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token')
    }
    throw error
  }
}

/**
 * Decode token without verification (for debugging)
 * @param {string} token - JWT token to decode
 * @returns {Object} Decoded token payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token)
}
