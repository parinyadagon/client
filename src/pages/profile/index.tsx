import React from "react";
import { useRouter } from "next/router";

// components
import SessionLayout from "@/components/layout/SessionLayout";

type Props = {};

export default function Profile({}: Props) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/");
  };
  return (
    <>
      <SessionLayout>
        <div>Profile</div>

        <button onClick={handleSignIn}>sign-in</button>
      </SessionLayout>
    </>
  );
}
