"use client"

import { useState } from "react"

import { socket } from "@/socket"

export default function MsgInput({ room }) {
  const [message, setMessage] = useState("")

  function sendMessage() {
    socket.emit("send_message", { message, room })
  }

  return (
    <div>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value)
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
