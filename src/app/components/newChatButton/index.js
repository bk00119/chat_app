"use client"

import { PiNotePencilBold } from "react-icons/pi";

export default function NewChatButton(){
  return (
    <button className="text-primary-red hover:text-secondary-red focus:outline-none">
      <PiNotePencilBold size={32}/>
    </button>
  )
}