import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // 💡 esto es lo que faltaba
    };
  }

  interface User {
    role?: string;
  }
}


