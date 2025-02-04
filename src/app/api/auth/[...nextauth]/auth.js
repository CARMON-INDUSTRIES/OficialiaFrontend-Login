export const authOptions = {
  providers: [
    // Configura tus proveedores aquí
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role, // Asegúrate de incluir el rol si lo usas
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; // Agrega los datos necesarios
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de que esté configurado en .env
};
