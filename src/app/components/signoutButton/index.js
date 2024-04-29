"use client"

import { useRouter } from "next/navigation"
import { MdLogout } from "react-icons/md";

export default function SignoutButton() {
  const router = useRouter()
  async function signout() {
    const res = await fetch("/api/auth/signout")
    router.push("/")
    router.refresh()
  }

  return (
    <button
      className="w-full flex items-center justify-center text-sm rounded px-2 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
      onClick={signout}
    >
      <MdLogout size={18}/>
      <p className="ml-1">Sign out</p>
    </button>
  )
}
