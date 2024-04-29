"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PiNotePencilBold } from "react-icons/pi"
import Modal from "../modal"
import NewChatForm from "../newChatForm"

export default function NewChatButton() {
  const router = useRouter()
  const [isLoaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  // IF THE WINDOW SIZE IS SMALL -> ROUTE TO newChat
  // IF LAPTOP -> OPEN A MODAL
  useEffect(() => {
    if (!isLoaded) {
      const screen_width = window.innerWidth
      if (screen_width < 640) {
        setIsMobile(true)
      }
      setLoaded(true)
    }
  }, [isLoaded])

  function openNewChat() {
    if (isMobile) {
      // ROUTE TO newChat
      router.push("/newChat")
    } else {
      // OPEN MODAL FOR NEWC CHAT
      setOpenModal(true)
    }
  }

  return (
    isLoaded && (
      <>
        <button
          onClick={openNewChat}
          className="text-primary-red hover:text-secondary-red focus:outline-none"
        >
          <PiNotePencilBold size={26} />
        </button>

        {/* MODAL */}
        {openModal && (
          <Modal openModal={openModal} setOpenModal={setOpenModal} title="New chat">
            {/* INCLUDE NEWCHATFORM COMPONENT HERE */}
            <NewChatForm openModal={openModal} setOpenModal={setOpenModal}  />
          </Modal>
        )}
      </>
    )
  )
}
