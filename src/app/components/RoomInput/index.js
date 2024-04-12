"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RoomInput() {
  const [room, setRoom] = useState("")

  const router = useRouter()
  const joinRoom = () => {
    if (room !== "") {
      router.push(`/chat?room=${room}`)
    }
  }

  return (
    <div>
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value)
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
    </div>
  )
}
