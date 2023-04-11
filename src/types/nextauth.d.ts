// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
// export enum Role {
//   user = "user",
//   admin = "admin",
// }

interface IUser extends DefaultUser {
  /**
   * Role of user
   */
  roles: object;
  /**
   * Field to check whether a user has a subscription
   */
  subscribed?: boolean;
  accessToken: string;
  username: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

// reference https://reacthustle.com/blog/extend-user-session-nextauth-typescript
