"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import RoomInput from "./components/RoomInput"
import SignoutButton from "./components/signoutButton"
import ChatList from "./components/chatList"

// ONLY FOR MOBILE
export default function Home() {
  const router = useRouter()
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      const screen_width = window.innerWidth
      if(screen_width >= 640){
        router.push('/chat')
      }
      setLoaded(true)
    }
  }, [isLoaded])

  return isLoaded && (
    <div className="w-full">
      {/* TEMPORARY PLACEMENT */}
      {/* <SignoutButton />
      <RoomInput /> */}

      {/* CHAT LIST */}
      <ChatList />
      
    </div>
  )
}