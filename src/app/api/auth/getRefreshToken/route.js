import { getAPI, invalidAccessTokenResponse, postAPI } from "@/lib/api";
import { getRefreshToken } from "@/lib/db/auth";
import { getUserChats } from "@/lib/db/chat";
import { verifyToken, decodeToken } from "@/utils/jwt";
import { cookies } from "next/headers"

export async function POST(req){
  const reqData = await req.json()
  
  // VERIFY THE USER
  const access_token = reqData.access_token
  // const access_token = cookies().get("access_token")?.value
  // const access_token_data = await verifyToken(access_token)
  // if(!access_token_data){
  //   return await invalidAccessTokenResponse()
  // }
  const user_data = await decodeToken(access_token)
  const user_id = user_data?.user_id
  if(!user_id){
    return await invalidAccessTokenResponse()
  }

  return await postAPI({_id: user_id}, getRefreshToken)
}