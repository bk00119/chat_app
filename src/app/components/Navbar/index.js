"use client"

import { useRouter } from "next/navigation"
import { MdChevronLeft } from "react-icons/md"

export default function Navbar({
  title,
  titleStyles = "",
  divStyles = "",
  backButtonText = "TITLE",
  showCancelText = true,
}) {
  const router = useRouter()

  return (
    <nav
      className={`w-full flex justify-between ${divStyles}`}
    >
      {showCancelText ? (
        <button
          className="flex absolute bottom-0 left-0"
          onClick={() => router.back()}
        >
          <MdChevronLeft size={24} />
          <p>{backButtonText}</p>
        </button>
      ) : (
        <button
          className="flex sm:hidden relative left-[-8px]"
          onClick={() => router.back()}
        >
          <MdChevronLeft size={28} />
        </button>
      )}

      <span className={`flex-grow text-center text-xl ${titleStyles}`}>
        {title}
      </span>
    </nav>
  )
}
