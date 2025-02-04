import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userName: { label: "Usuario", type: "text", placeholder: "tu_usuario" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://oficialialoginbackend.somee.com/api/Cuentas/UserLogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: credentials.userName,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        if (!res.ok || !user.token) throw new Error("Credenciales inválidas");

        return user; // Retorna el usuario si la autenticación es exitosa
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.token = user.token; // Guarda el token en la sesión
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.token = token.token; // Incluye el token en la sesión
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
