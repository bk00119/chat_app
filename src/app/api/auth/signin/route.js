import { cookies } from "next/headers"

import { getUser, userSignin } from "@/lib/db/auth"
import { verifyPassword } from "@/utils/auth"

import { generateAccessToken, generateRefreshToken } from "@/utils/jwt"

export async function POST(req) {
  const reqData = await req.json()
  const password = reqData.password
  const auth_fail_msg = "Incorrect username or password"
  const auth_success_msg = "Authentication completed"

  // 1) CHECK THE HASHED PASSWORD FROM THE DB WITH ITS USERNAME
  const user = await getUser(reqData)
  if (!user) {
    return new Response(JSON.stringify({ message: auth_fail_msg }), {
      statusText: auth_fail_msg,
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }

  // 2) CHECK IF THE HASHED PASSWORD AND PLAIN TEXT PASSWORD MATCH
  const is_matched = await verifyPassword(password, user.password)
  if (!is_matched) {
    return new Response(JSON.stringify({ message: auth_fail_msg }), {
      statusText: auth_fail_msg,
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }

  // 3) AUTHENTICATION SUCCESSFUL: GENERATE ACCESS_TOKEN AND REFRESH_TOKEN & SAVE TO HTTPONLY TOKEN
  const access_token = await generateAccessToken(user._id)
  const refresh_token = await generateRefreshToken(user._id)
  // HTTPONLY COOKIES
  const access_token_cookie = cookies().set("access_token", access_token, {
    httpOnly: true,
    sameSite: "lax",
  })
  const refresh_token_cookie = cookies().set("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: "lax",
  })
  // GENERAL USER DATA
  const user_id_cookie = cookies().set("user_id", user._id)

  // 4) RETURN A RESPONSE
  return new Response(
    JSON.stringify({ data: user._id, message: auth_success_msg }),
    {
      statusText: auth_success_msg,
      status: 201,
      headers: { "content-type": "application/json" },
    }
  )
}
