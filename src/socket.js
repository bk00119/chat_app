"use client"

import { io } from "socket.io-client"

export const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_SERVER)
