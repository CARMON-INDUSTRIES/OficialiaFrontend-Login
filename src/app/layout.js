import { Inter } from 'next/font/google'
import './globals.css'
import AddUserClickContextProvider from '@/contexts/AddUserClickContext'
import AddUserContextProvider from '@/contexts/AddUserContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="96x96" href="/images/oficialia.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Oficialia</title>
      </head>
      <body className={inter.className}>
        <AddUserClickContextProvider>
          <AddUserContextProvider>
            {children}
          </AddUserContextProvider>
        </AddUserClickContextProvider>
      </body>
    </html>
  )
}
