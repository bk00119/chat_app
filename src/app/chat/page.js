"use client"

import { Suspense, useEffect, useState } from "react"

import ChatList from "../components/chatList"
import ChatRoom from "../components/chatRoom"

export default function ChatPage() {
  const [listLoading, setListLoading] = useState(true)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      const screen_width = window.innerWidth
      if(screen_width < 640){
        // ONLY LOAD THE LIST FOR NON-MOBILE DEVICES
        setListLoading(false)
      }
      setLoaded(true)
    }
  }, [isLoaded])

  return isLoaded && (
    // useSearchParams() needs to be wrapped in a Suspense boundary.
    <Suspense>
      <div className="flex w-full">
        {/* SHOW CHAT LIST -- FOR LAPTOP, NOT FOR MOBILE */}
        <div className="w-96 hidden sm:flex">
          <ChatList isLoading={listLoading} setLoading={setListLoading} />
        </div>

        <ChatRoom />
      </div>
    </Suspense>
  )
}
