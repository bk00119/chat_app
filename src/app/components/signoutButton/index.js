"use client"

import { useRouter } from "next/navigation"

export default function SignoutButton() {
  const router = useRouter()
  async function signout() {
    const res = await fetch("/api/auth/signout")
    router.push("/")
    router.refresh()
  }

  return (
    <button
      className="inline-block rounded-full px-4 py-2 bg-gray-300 text-gray-800 mr-4"
      onClick={signout}
    >
      Sign out
    </button>
  )
}
