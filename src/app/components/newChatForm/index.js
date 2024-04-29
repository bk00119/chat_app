"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewChatForm({
  openModal = null,
  setOpenModal = null,
  loadNewChats = null,
}) {
  const router = useRouter()
  const [username, setUsername] = useState("")

  async function startChat(e) {
    e.preventDefault()
    if (!username || username.length == 0) {
      return alert("Please type a username")
    }

    try {
      const res = await fetch("/api/chat/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      })
      if (res.ok) {
        const chat_id = await res.json()
        // ROUTE TO THE NEW CHAT ROOM
        // REFRESH THE CHAT LIST
        router.push(`/chat?room=${chat_id}`)
        router.refresh()
        if (openModal) {
          setOpenModal(false)
        }
        if (loadNewChats) {
          loadNewChats(true)
        }
      } else {
        throw new Error(res.statusText)
      }
    } catch (error) {
      // console.log(error)
      alert(error)
    }
  }

  return (
    <form onSubmit={startChat} className="sm:w-96 min-w-64 flex flex-col">
      <input
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
        placeholder="Search by username"
        className="w-full border-[1px] border-gray-400 px-2 py-1 rounded focus:outline-none"
      />
      <button
        onClick={startChat}
        className="w-full bg-primary-red rounded text-white mt-6 py-1 hover:bg-secondary-red focus:outline-none"
      >
        Chat
      </button>
    </form>
  )
}
