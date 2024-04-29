import { cookies } from "next/headers"

export async function GET(req) {
  cookies().delete("access_token")
  cookies().delete("refresh_token")
  cookies().delete("user_id")
  cookies().delete("username")

  return Response.json({ message: "Signout successful" }, { status: 200 })
}
