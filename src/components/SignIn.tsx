import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

export default function SignIn({}: Props) {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.username} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
