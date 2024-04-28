import { Inter, Merienda } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const merienda = Merienda({ subsets: ["latin"], variable: '--font-merienda'})

export const metadata = {
  title: "MangoTalk",
  description: "Free chat app for myself",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${merienda.variable} + min-h-screen flex flex-col justify-between`}
      >
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <header className="w-full">
            {/* NAVBAR */}
          </header>
          <main className="h-full mt-4 w-full max-w-7xl px-4">
          {children}
          </main>
        </div>
      </body>
    </html>
  )
}
