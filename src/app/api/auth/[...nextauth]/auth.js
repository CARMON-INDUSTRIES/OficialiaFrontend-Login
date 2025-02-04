import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Aquí puedes validar las credenciales con tu base de datos
        const user = { id: 1, name: "Usuario", email: "usuario@example.com" };
        if (user) return user;
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) token.id = user.id;
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
});