"use server"

import { jwtVerify, SignJWT, decodeJwt } from "jose"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_ALG = "HS256"
const ACCESS_TOKEN_EXP = "15mins"
const REFRESH_TOKEN_EXP = "7days"
const ACCESS_TOKEN = "ACCESS_TOKEN"
const REFRESH_TOKEN = "REFRESH_TOKEN"

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    )
    return payload
  } catch (error) {
    console.error("Error decoding JWT token: ", error)
    return null
  }
}

export async function generateToken(data, type = "ACCESS_TOKEN") {
  const secret = new TextEncoder().encode(JWT_SECRET)
  if (type === ACCESS_TOKEN) {
    const token = await new SignJWT(data)
      .setProtectedHeader({ alg: JWT_ALG })
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXP)
      .sign(secret)
    return token
  }
  // REFRESH_TOKEN
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXP)
    .sign(secret)
  return token
}

export async function decodeToken(token) {
  try {
    return decodeJwt(token)
  } catch (error) {
    console.error("Error decoding token:", error)
    throw error
  }
}

export async function generateAccessToken(user_id) {
  return generateToken({ user_id: user_id })
}

export async function regenerateAccessToken(access_token, refresh_token) {
  const access_token_payload = await decodeToken(access_token)
  const refresh_token_payload = await decodeToken(refresh_token)
  if (access_token_payload.user_id === refresh_token_payload.user_id) {
    // REGENERATE ACCESS_TOKEN
    return generateAccessToken(access_token_payload.user_id)
  }
  return null
}

export async function generateRefreshToken(user_id) {
  return generateToken({ user_id: user_id }, "REFRESH_TOKEN")
}
