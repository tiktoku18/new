import "./globals.css"

export const metadata = {
  title: "TikTok Clone",
  description: "A TikTok-like video streaming app",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
