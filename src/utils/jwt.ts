import cookie from 'cookie'
import jwt from 'jsonwebtoken'

const HOUR = 60 * 60 // 1 hour in seconds

export const generateAccessToken = (
  userId: string,
  expireTimeInMinutes: number
) =>
  jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: expireTimeInMinutes + 'm'
  })

export const verifyAccessToken = (token: string): string | jwt.JwtPayload =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET)

export const generateRefreshTokenCookie = (
  userId: string,
  expireTimeInHours: number
): string => {
  const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: expireTimeInHours + 'h'
  })

  return cookie.serialize('token', token, {
    maxAge: expireTimeInHours * HOUR,
    httpOnly: true
  })
}

export const verifyRefreshTokenCookie = (
  cookieHeader: string
): string | jwt.JwtPayload => {
  const { token } = cookie.parse(cookieHeader)

  return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}
