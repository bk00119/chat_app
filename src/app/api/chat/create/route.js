import { postAPI } from "@/lib/api";
import { createChat } from "@/lib/db/chat";
import { cookies } from "next/headers"

export async function POST(req){
  const reqData = await req.json()
  
  // VERIFY THE USER
  
  // CHANGE THIS
  reqData.user_id = cookies().get("user_id")?.value

  return await postAPI(reqData, createChat)
  return new Response(JSON.stringify("123"), {
    status: 201,
    headers: { "content-type": "application/json" },
  })
}