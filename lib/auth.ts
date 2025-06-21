// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { getUserByEmail } from "./db";
import { verifyPassword } from "./password-utils";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Correo", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Faltan credenciales");

        const user = await getUserByEmail(credentials.email);

        if (!user || !(await verifyPassword(credentials.password, user.password))) {
          throw new Error("Credenciales inválidas");
        }

        return {
          id: user.id.toString(),         // Aseguramos que sea string para el token JWT
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // ✅ Añadimos el rol al token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string; // ✅ Incluimos el rol en la sesión
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

