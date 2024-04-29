export async function generateRandomHexColor() {
  const chars = "0123456789ABCDEF"
  let color = "#"

  const red = Math.floor(Math.random() * 64 + 210)
  const green = Math.floor(Math.random() * 61 + 210)
  const blue = Math.floor(Math.random() * 61 + 210)

  color += chars[(red >> 4) & 0x0f] + chars[red & 0x0f]
  color += chars[(green >> 4) & 0x0f] + chars[green & 0x0f]
  color += chars[(blue >> 4) & 0x0f] + chars[blue & 0x0f]

  return color
}
