"use client"

import { io } from "socket.io-client"

// export const socket = io.connect("http://192.168.1.151:3001")

// console.log(process.env.NEXT_PUBLIC_SOCKET_SERVER)
export const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_SERVER)
