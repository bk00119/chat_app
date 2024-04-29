import NewChatForm from "../components/newChatForm"
import Navbar from "../components/Navbar"

export default async function newChat() {
  return (
    <div className="w-full h-screen p-8 flex flex-col items-center bg-primary-yellow">
      <Navbar title="New chat" backButtonText="Cancel" />

      <div className="w-full mt-8">
        <NewChatForm />
      </div>
    </div>
  )
}
