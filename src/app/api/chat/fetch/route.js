import { invalidAccessTokenResponse, postAPI } from "@/lib/api"
import { getChatWithUsernames } from "@/lib/db/chat"
import { verifyToken, decodeToken } from "@/utils/jwt"
import { cookies } from "next/headers"

export async function POST(req) {
  const reqData = await req.json()
  // reqData: _id -> chat's _id

  // VERIFY THE USER
  const access_token = cookies().get("access_token")?.value
  const access_token_data = await verifyToken(access_token)
  if (!access_token_data) {
    return await invalidAccessTokenResponse()
  }
  const user_data = await decodeToken(access_token)
  const user_id = user_data?.user_id
  if (!user_id) {
    return await invalidAccessTokenResponse()
  }

  // return await postAPI(reqData, getChat)
  const res = await getChatWithUsernames(reqData)
  if (!res || res.error || !res.data || !res.data.usernames) {
    return new Response(JSON.stringify({ message: res.error }), {
      statusText: res.error,
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
  const chat_data = res.data
  for (let i = 0; i < chat_data.usernames.length; i++) {
    if (chat_data.usernames[i].user_id.toString() === user_id) {
      // USER FOUND FROM THIS CHAT!
      // REMOVE THE CURR USER'S INFO FROM THE ARRAY
      chat_data.usernames.splice(i, 1)
      return new Response(JSON.stringify({ data: chat_data }), {
        status: 201,
        headers: { "content-type": "application/json" },
      })
    }
  }

  return new Response(
    JSON.stringify({ message: `Not authorized to chat: ${reqData._id}` }),
    {
      statusText: `Not authorized to chat: ${reqData._id}`,
      status: 500,
      headers: { "content-type": "application/json" },
    }
  )
}
