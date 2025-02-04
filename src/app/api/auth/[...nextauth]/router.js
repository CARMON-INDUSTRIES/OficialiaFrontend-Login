import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userName: { label: "userName", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Aquí llamas a tu API para autenticar al usuario
        const res = await fetch("https://oficialialoginbackend.somee.com/api/Cuentas/UserLogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (!res.ok || !user) throw new Error("Credenciales incorrectas");

        return user; // Devuelve el usuario autenticado
      },
    }),
  ],

  session: {
    strategy: "jwt", // Asegura que la sesión use JWT
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Si el usuario existe, genera un token y guárdalo
        token.accessToken = jwt.sign(
          { userName: user.userName, role: user.role }, 
          process.env.JWT_SECRET, 
          { expiresIn: "1h" } 
        );
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      // Agrega el token a la sesión para acceder desde el frontend
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
