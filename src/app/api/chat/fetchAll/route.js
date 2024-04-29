import { getAPI, invalidAccessTokenResponse } from "@/lib/api";
import { getUserChats } from "@/lib/db/chat";
import { verifyToken, decodeToken } from "@/utils/jwt";
import { cookies } from "next/headers"

export async function GET(req){
  // const reqData = await req.json()
  
  // VERIFY THE USER
  const access_token = cookies().get("access_token")?.value
  const access_token_data = await verifyToken(access_token)
  if(!access_token_data){
    return await invalidAccessTokenResponse()
  }
  const user_data = await decodeToken(access_token)
  const user_id = user_data?.user_id
  if(!user_id){
    return await invalidAccessTokenResponse()
  }

  return await getAPI({user_id: user_id}, getUserChats)
}