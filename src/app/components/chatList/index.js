"use client"

import { FaUser } from "react-icons/fa6"

import NewChatButton from "../newChatButton"
import SignoutButton from "../signoutButton"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const chats = [
  {
    _id: "1",
    users: ["asfasfa safasdf", "456"],
    lastUpdated: "2024-04-28T23:04:16.225Z",
    color: "#FBD344",
  },
  {
    _id: "2",
    users: ["123", "456"],
    lastUpdated: "2024-04-28T23:04:16.225Z",
    color: "#FBD344",
  },
  {
    _id: "3",
    users: ["123", "456"],
    lastUpdated: "2024-04-28T23:04:16.225Z",
    color: "#FBD344",
  },

  // {
  //   _id: "1",
  //   users: ["asfasfa safasdf", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "2",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "3",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "1",
  //   users: ["asfasfa safasdf", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "2",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "3",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "1",
  //   users: ["asfasfa safasdf", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "2",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "3",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "1",
  //   users: ["asfasfa safasdf", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "2",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "3",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "1",
  //   users: ["asfasfa safasdf", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "2",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "3",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "1",
  //   users: ["asfasfa safasdf", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "2",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
  // {
  //   _id: "3",
  //   users: ["123", "456"],
  //   lastUpdated: "2024-04-28T23:04:16.225Z",
  //   color: "#FBD344",
  // },
]

export default function ChatList() {
  const [isLoaded, setLoaded] = useState(false)
  
  useEffect(()=>{
    if(!isLoaded && chats){
      setLoaded(true)
    }
  },[isLoaded])
  
  const router = useRouter()
  function joinChat(chat_id) {
    if (!chat_id) {
      alert("Erorr: you can't join the chat")
    }
    router.push(`/chat?room=${chat_id}`)
  }
  return (
    isLoaded && (
<div className="w-full pt-6 sm:pt-4 h-screen max-h-screen min-h-screen overflow-y-hidden flex flex-col">
      {/* TOP BAR */}
      <div className="flex w-full justify-between items-center mb-4 px-6 sm:px-4 ">
        <p className="text-2xl">Chats</p>
        <NewChatButton />
      </div>

      {/* CHAT LIST */}
      <div className="flex flex-col h-full sm:overflow-y-scroll overflow-y-auto">
        <div className="pt-4">
          {chats.map((chat) => (
            <button
              className="flex w-full my-1 py-4 px-6 sm:px-4 items-center hover:bg-gray-100 focus:outline-none"
              key={chat._id}
              onClick={() => joinChat(chat?._id)}
            >
              <div>
              <div className={"w-fit p-3 rounded-full"} style={{backgroundColor: chat.color}}>
                  <FaUser size={20} />
                </div>
              </div>
              <p className="ml-4 text-start">
                {/* CHANGE THIS: USE USERNAME NOT USER_ID */}
                {chat?.users[0]}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="">
        <SignoutButton />
      </div>
    </div>
    )
  )
}
