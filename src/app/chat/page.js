"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

import { socket } from "@/socket"
import MsgInput from "../components/MsgInput"

function ChatPageInner() {
  const searchParams = useSearchParams()
  const room = searchParams.get("room")
  const [isLoading, setIsLoading] = useState(true)
  const [messageReceived, setMessageReceived] = useState("")

  useEffect(() => {
    if (isLoading) {
      if (room) {
        joinRoom()
      }
    }
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  async function joinRoom() {
    socket.emit("join_room", room)
    setIsLoading(false)
  }

  return (
    <div className="w-full">
      <h1> Message:</h1>
      {messageReceived}
      
      {/* REMOVE BR */}
      <br />
      <br />
      <MsgInput room={room} />
    </div>
  )
}

export default function ChatPage() {
  return (
    // useSearchParams() needs to be wrapped in a Suspense boundary.
    <Suspense>
      <ChatPageInner />
    </Suspense>
  )
}