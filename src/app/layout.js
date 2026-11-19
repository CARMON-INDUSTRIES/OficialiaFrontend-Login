import { Source_Sans_3 } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import AddUserClickContextProvider from '@/contexts/AddUserClickContext';
import AddUserContextProvider from '@/contexts/AddUserContext';
import { NotificacionesProvider } from '@/contexts/NotificacionesContext';

import NotificacionGlobal from '@/components/NotificacionGlobal';



const sourceSans = Source_Sans_3({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="icon" type="image/png" sizes="96x96" href="/images/presidencia.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Secretaría Municipal · Registro de oficios</title>
      </head>
      <body className={sourceSans.className}>
        <ThemeToggle />
        <NotificacionesProvider>
          <NotificacionGlobal /> {/* Notificación visible en todas las vistas */}
          <AddUserClickContextProvider>
            <AddUserContextProvider>
              {children}
            </AddUserContextProvider>
          </AddUserClickContextProvider>
        </NotificacionesProvider>
      </body>
    </html>
  );
}
