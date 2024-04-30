import { cookies } from "next/headers"

import {
  signupUser,
  getUserByUsername,
  updateRefreshToken,
} from "@/lib/db/auth"
import { hashPassword } from "@/utils/auth"
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt"

const auth_fail_msg = "Signup failed"
const username_conflict_msg = "Username already exists"
const auth_success_msg = "Signup completed"

function failedResponse(msg) {
  return new Response(JSON.stringify({ message: msg }), {
    statusText: auth_fail_msg,
    status: 500,
    headers: { "content-type": "application/json" },
  })
}

export async function POST(req) {
  const reqData = await req.json()
  const password = reqData.password

  // 1) CHECK IF THERE'S AN EXISTING USER WITH THE SAME USERNAME
  const user = await getUserByUsername({ username: reqData.username })
  if (user) {
    return failedResponse(username_conflict_msg)
  }

  // 2) HASH THE PASSWORD
  const hashed_password = await hashPassword(password)
  if (!hashed_password) {
    return failedResponse(auth_fail_msg)
  }
  reqData.password = hashed_password

  // 3) ADD A USER TO THE DB -> GET USER_ID
  reqData.refresh_token = ""
  reqData.chat_ids = []
  const user_id = await signupUser(reqData)
  if (!user_id) {
    return failedResponse(auth_fail_msg)
  }

  // 4) AUTHENTICATION SUCCESSFUL: GENERATE ACCESS_TOKEN AND REFRESH_TOKEN & SAVE TO HTTPONLY TOKEN
  const access_token = await generateAccessToken(user_id)
  const refresh_token = await generateRefreshToken(user_id)
  // HTTPONLY COOKIES
  const access_token_cookie = cookies().set("access_token", access_token, {
    httpOnly: true,
    sameSite: "lax",
  })
  const refresh_token_cookie = cookies().set("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: "lax",
  })

  // 5) ADD REFRESH TOKEN TO THE DB
  const updatedRefreshToken = await updateRefreshToken({
    _id: user_id,
    refresh_token: refresh_token,
  })
  if (!updateRefreshToken) {
    return new Response(
      JSON.stringify({ message: update_refresh_token_fail_msg }),
      {
        statusText: update_refresh_token_fail_msg,
        status: 500,
        headers: { "content-type": "application/json" },
      }
    )
  }

  // GENERAL USER DATA
  const user_id_cookie = cookies().set("user_id", user_id)
  const username_cookie = cookies().set("username", reqData.username)

  // 6) RETURN A RESPONSE
  return new Response(
    JSON.stringify({ data: { user_id: user_id }, message: auth_success_msg }),
    {
      statusText: auth_success_msg,
      status: 201,
      headers: { "content-type": "application/json" },
    }
  )
}
