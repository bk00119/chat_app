"use client"

import { MdClose } from "react-icons/md"

export default function Modal({ openModal, setOpenModal, title, children}){
  function close(){
    setOpenModal(false)
  }
  return(
    // <>{children}</>
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <dialog
        open={openModal}
        className="flex flex-col bg-white rounded-lg shadow-lg p-4 z-10 min-w-56 h-fit"
      >
        <div className="flex justify-between items-center relative">
          <p className="text-lg font-semibold flex-grow text-center">{title}</p>
          <button
            className="text-gray-500 hover:text-gray-700 absolute top-0 right-0 focus:outline-none"
            onClick={close}
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* <hr className="border-gray-400" /> */}
        <div className="mt-6 overflow-y-auto h-full">
          {children}
        </div>
      </dialog>
      <div
        className="fixed inset-0 bg-black opacity-50 z-0"
        onClick={close}
      ></div>
    </div>
  )
}