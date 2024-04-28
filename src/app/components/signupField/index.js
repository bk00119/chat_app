"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupField() {
  const router = useRouter()
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function signup(e) {
    e.preventDefault()

    if (!fullname || fullname.length == 0) {
      return alert("Please type your fullname")
    }

    if (!username || username.length == 0) {
      return alert("Please type your username")
    }
    if (!password || password.length == 0) {
      return alert("Please type your password")
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          fullname: fullname
        }),
      })
      if (res.ok) {
        const data = await res.json()
        router.push("/")
        router.refresh()
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.log("error updating is_completed of task: ", error)
    }

    setFullname('')
    setUsername('')
    setPassword('')
  }

  return (
    <form className="flex flex-col" onSubmit={signup}>
      <input
        className="focus:outline-none px-3 py-2 text-lg mb-4 rounded"
        placeholder="Fullname"
        value={fullname}
        onChange={(e) => setFullname(e.currentTarget.value)}
      />
      <input
        className="focus:outline-none px-3 py-2 text-lg mb-4 rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <input
        className="focus:outline-none px-3 py-2 text-lg mb-4 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button
        className="w-full bg-primary-red text-white py-2 px-4 rounded focus:outline-none hover:bg-secondary-red"
        onClick={signup}
      >
        Sign up
      </button>
    </form>
  )
}
