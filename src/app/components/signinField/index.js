"use client"

import { useState } from "react"

export default function SigninField() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function signin(e) {
    e.preventDefault()

    if (!username || username.length == 0){
      return alert("Please type your username")
    }
    if(!password || password.length == 0){
      return alert("Please type your password")
    }

    console.log(username)
    console.log(password)

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      })
      if (res.ok) {
        // setIsCompleted(!isCompleted)
        // router.refresh()
        const data = await res.json()
        console.log(data)
      } else {
        throw new Error("Failed to create task")
      }
    } catch (error) {
      console.log("error updating is_completed of task: ", error)
    }

    // setUsername('')
    // setPassword('')
  }

  return (
    <form className="flex flex-col" onSubmit={signin}>
      <input
        className="focus:outline-none px-3 py-2 text-lg mb-4 rounded"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.currentTarget.value)}
      />
      <input
        className="focus:outline-none px-3 py-2 text-lg mb-4 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.currentTarget.value)}        
      />
      <button
        className="w-full bg-primary-red text-white py-2 px-4 rounded focus:outline-none hover:bg-secondary-red"
        onClick={signin}
      >
        Sign in
      </button>
    </form>
  )
}
