"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { socket } from "@/socket"
import MsgInput from "../components/MsgInput"

export default function ChatPage() {
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
