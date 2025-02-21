import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  // Si la página tiene un layout definido, se usa; si no, se envuelve con el Layout global
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}> {/* Envuelve con SessionProvider */}
      <SessionProvider>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </SessionProvider>
  );
}
