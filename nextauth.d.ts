import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

interface CustomUser {
  id: number;
  email: string;
  userTypes: string;
  personals: {
    firstName?: string;
    lastName?: string;
    pesel?: string;
  };
}

declare module "next-auth" {
  //   interface User extends CustomUser {}
  interface User {
    id: number;
    email: string;
    userTypes: string;
    personals: {
      firstName?: string;
      lastName?: string;
      pesel?: string;
    };
  }

  interface Session extends DefaultSession {
    user: {
      id: number;
      email: string;
      userTypes: string;
      personals: {
        firstName?: string;
        lastName?: string;
        pesel?: string;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: number;
      email: string;
      userTypes: string;
      personals: {
        firstName?: string;
        lastName?: string;
        pesel?: string;
      };
    };
  }
}
