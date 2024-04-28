import RoomInput from "./components/RoomInput"
import SignoutButton from "./components/signoutButton"

export default async function Home() {

  return (
    <div className="w-full">
      {/* TEMPORARY PLACEMENT */}
      <SignoutButton />

      <RoomInput />
      <p className="text-red-500 font-bold">asdf</p>
    </div>
  )
}
