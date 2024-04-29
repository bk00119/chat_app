"use client"

import { useRouter } from "next/navigation";
import { MdChevronLeft } from "react-icons/md";

export default function Navbar({title, backButtonText}) {
  const router = useRouter()

  return (
    <nav className="w-full flex justify-between relative">
      <button className="flex absolute bottom-0 left-0" onClick={()=>router.back()}>
        <MdChevronLeft size={24} />
        <p>{backButtonText}</p>
      </button>
      <span className="flex-grow text-center text-2xl">{title}</span>
    </nav>
  )
}
