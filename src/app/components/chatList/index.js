"use client"

import { FaUser } from "react-icons/fa6"
import Cookies from 'js-cookie'

import NewChatButton from "../newChatButton"
import SignoutButton from "../signoutButton"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ChatList() {
  const router = useRouter()
  const [isLoaded, setLoaded] = useState(false)
  const [chats, setChats] = useState(null)

  const curr_user_id = Cookies.get('user_id')

  useEffect(() => {
    if (!isLoaded && !chats) {
      getChats()
    }
  }, [isLoaded])

  async function getChats() {
    try {
      const res = await fetch("/api/chat/fetchAll", {
        method: "GET",
      })
      if (res.ok) {
        const data = await res.json()
        setChats(data)
        setLoaded(true)
      } else {
        throw new Error(res.statusText)
      }
    } catch (error) {
      console.log(error)
      // alert(error)
    }
  }

  function joinChat(chat_id) {
    if (!chat_id) {
      alert("Erorr: you can't join the chat")
    }
    router.push(`/chat?room=${chat_id}`)
  }

  function getFullname(users){
    for(const user of users){
      if(user?._id != curr_user_id){
        return user?.fullname
      }
    }
    return null
  }

  return (
    <div className="w-full pt-6 sm:pt-4 h-screen max-h-screen min-h-screen overflow-y-hidden flex flex-col">
      {/* TOP BAR */}
      <div className="flex w-full justify-between items-center mb-4 px-6 sm:px-4 ">
        <p className="text-2xl">Chats</p>
        <NewChatButton />
      </div>

      {/* CHAT LIST */}
      <div className="flex flex-col h-full sm:overflow-y-scroll overflow-y-auto">
        <div className="pt-4">
          {isLoaded ?
            chats &&
            chats.map((chat) => (
              <button
                className="flex w-full my-1 py-4 px-6 sm:px-4 items-center hover:bg-gray-100 focus:outline-none"
                key={chat._id}
                onClick={() => joinChat(chat?._id)}
              >
                <div>
                  <div
                    className={"w-fit p-3 rounded-full"}
                    style={{ backgroundColor: chat.color }}
                  >
                    <FaUser size={20} />
                  </div>
                </div>
                <p className="ml-4 text-start">
                  {getFullname(chat?.usernames)}
                </p>
              </button>
            )):(<div className="px-6 sm:px-4">Loading chats...</div>)}
        </div>
      </div>

      <div className="">
        <SignoutButton />
      </div>
    </div>
  )
}
