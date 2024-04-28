"use client"

import { useEffect, useState } from "react"

import RoomInput from "./components/RoomInput"
import SignoutButton from "./components/signoutButton"

export default function Home() {
  const [isMobile, setMobile] = useState(true)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      const screen_width = window.innerWidth
      setMobile(screen_width < 640)
      setLoaded(true)
    }
  }, [isLoaded])

  return isLoaded ? (
    <div className="w-full">
      {/* TEMPORARY PLACEMENT */}
      <SignoutButton />

      {isMobile ? <div>MOBILE</div> : <div>LAPTOP</div>}

      <RoomInput />
    </div>
  ) : (
    <div>Loading</div>
  )
}
