"use server"

export default async function ChatRoom() {
  return (
    <div>
      <div className="w-20 h-20 bg-red-500 hidden sm:flex">
        {/* SHOW CHAT LIST -- FOR LAPTOP, NOT FOR MOBILE */}
        {/* RENDER CHATLIST ? */}
        {console.log("laptop")}
      </div>


      <div className="w-20 h-20 bg-blue-500 flex sm:hidden">
        {/* CHAT ROOM */}
        {console.log("mobile")}
      </div>
    </div>
  )
}
