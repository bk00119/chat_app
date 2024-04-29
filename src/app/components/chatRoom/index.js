"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

import { socket } from "@/socket"
import MsgInput from "../MsgInput"

export default function ChatRoom() {
  const searchParams = useSearchParams()
  const room = searchParams.get("room")
  const [currRoom, setCurrRoom] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messageReceived, setMessageReceived] = useState("")

  useEffect(() => {
    if (isLoading && room && currRoom) {
      joinRoom()
    }
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })

    if (room && room != currRoom) {
      setCurrRoom(room)
      setIsLoading(true)
    }
  }, [socket, room, currRoom])

  async function joinRoom() {
    socket.emit("join_room", currRoom)
    setIsLoading(false)
  }

  return (
    <div className="w-full">
      <h1> Message:</h1>
      {messageReceived}

      {/* REMOVE BR */}
      <br />
      <br />
      <MsgInput room={currRoom} />
    </div>
  )
}
