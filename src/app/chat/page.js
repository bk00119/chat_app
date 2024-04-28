"use server"

import { Suspense } from "react"

import ChatList from "../components/chatList"
import ChatRoom from "../components/chatRoom"

export default async function ChatPage() {
  return (
    // useSearchParams() needs to be wrapped in a Suspense boundary.
    <Suspense>
      <div className="flex w-full">
        {/* SHOW CHAT LIST -- FOR LAPTOP, NOT FOR MOBILE */}
        <div className="w-96 hidden sm:flex">
          <ChatList />
        </div>

        <ChatRoom />
      </div>
    </Suspense>
  )
}
