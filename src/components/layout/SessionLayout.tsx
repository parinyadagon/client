import React from "react";
import { useRouter } from "next/router";

import { useEffectCustom } from "@/hooks/useEffectCustom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setToken, selectorIsAuth } from "@/slices/auth/authSlice";

// components
import MainAppBar from "../MainAppBar";

type Props = {
  children: React.ReactNode;
};

export default function SessionLayout({ children }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectorIsAuth);

  useEffectCustom(() => {
    dispatch(setToken());
    if (!isAuth) {
      router.push("/");
    }
  });

  return (
    <>
      <MainAppBar />
      {children}
    </>
  );
}
