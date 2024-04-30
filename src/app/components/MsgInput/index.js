"use client"

import { MdSend } from "react-icons/md"
import { useState } from "react"

import { socket } from "@/socket"

export default function MsgInput({ room, chats, setChats }) {
  const [message, setMessage] = useState("")

  function sendMessage(e) {
    if (e) {
      e.preventDefault()
    }
    if (!message || message.length == 0) {
      return
    }

    socket.emit("send_message", { message, room })
    setChats([...chats, { isReceived: false, content: message }])
    setMessage("")
  }

  function handleKeys(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
    if (event.key === "Enter" && event.shiftKey) {
      let new_text = message
      new_text += "\n"
      setMessage(new_text)
    }
  }

  return (
    <form className="fixed sm:relative bottom-0 w-full text-end sm:h-fit flex justify-center z-10 bg-white px-2 py-2">
      <textarea
        placeholder="Message..."
        resize="none"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value)
        }}
        onKeyDown={handleKeys}
        className="flex px-2 py-2 border border-gray-300 rounded focus:outline-none w-full mr-2 resize-none h-10 overflow-hidden"
      />
      <button onClick={sendMessage} className="">
        <MdSend
          size={26}
          className={`${
            message?.length > 0 ? "text-primary-red" : "text-gray-500"
          }`}
        />
      </button>
    </form>
  )
}
