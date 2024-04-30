"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect, useState, Suspense, useRef } from "react"

import { socket } from "@/socket"
import MsgInput from "../MsgInput"

import Navbar from "../Navbar"

export default function ChatRoom() {
  const searchParams = useSearchParams()
  const room = searchParams.get("room")
  const [currRoom, setCurrRoom] = useState(null)
  const [otherUser, setOtherUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messageReceived, setMessageReceived] = useState("")
  const [chats, setChats] = useState([])
  const lastMessageRef = useRef(null)

  useEffect(() => {
    if (isLoading && room && currRoom) {
      joinRoom()
    }
    socket.on("receive_message", (data) => {
      setChats([...chats, { isReceived: true, content: data.message }])
      setMessageReceived(data.message)
    })

    if (room && room != currRoom) {
      exitRoom()
      setCurrRoom(room)
      setIsLoading(true)
    }

    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [socket, room, currRoom, chats])

  async function joinRoom() {
    // setChats([])
    try {
      const res = await fetch("/api/chat/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: currRoom,
        }),
      })
      if (res.ok) {
        const chat_data = await res.json()
        setOtherUser(chat_data.data.usernames[0])
        socket.emit("join_room", currRoom)
        setChats([])
        setIsLoading(false)
      } else {
        throw new Error(res.statusText)
      }
    } catch (error) {
      alert(error)
    }

    // when it's successful
    // socket.emit("join_room", currRoom)
    // setIsLoading(false)
  }

  async function exitRoom(){
    if(currRoom){
      socket.emit("leave_room", currRoom)
    }
  }

  return (
    <div
      className={`w-full flex flex-col sm:h-screen sm:flex-grow sm:justify-between overflow-y-hidden`}
    >
      <div className="sm:overflow-y-auto">
        {/* NAVBAR */}
        {/* HEIGHT: 64px */}
        <Navbar
          title={otherUser ? otherUser.fullname : ""}
          titleStyles="text-start"
          divStyles="p-4 sm:p-6 bg-white"
          showCancelText={false}
        />
        {!isLoading && (
          <div
            className={`px-4 sm:px-6 absolute sm:static top-[64px] w-full overflow-y-hidden sm:overflow-auto`}
          >
            <div className={`flex-grow sm:flex-none mb-14 sm:mb-0 w-full`}>
              {chats &&
                chats.map((chat, index) => (
                  <div
                    key={index}
                    className={`w-full flex ${
                      chat.isReceived ? "justify-start" : "justify-end"
                    }`}
                    ref={index === chats.length - 1 ? lastMessageRef : null}
                  >
                    <div
                      className={`w-9/12 sm:w-4/6 flex ${
                        chat.isReceived ? "justify-start" : "justify-end"
                      }`}
                    >
                      <p
                        className={`rounded-lg mt-2 px-2 py-2 w-fit break-all ${
                          chat.isReceived ? "bg-gray-300" : "bg-primary-yellow"
                        }`}
                      >
                        {chat.content.split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {!isLoading && (
        <MsgInput room={currRoom} chats={chats} setChats={setChats} />
      )}
    </div>
  )
}
