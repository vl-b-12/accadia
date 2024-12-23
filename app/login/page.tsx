"use client";

import Image from "next/image";
import LoginForm from "@/components/Forms/LoginForm/LoginForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/slices/CartSlice/cartSlice";

export default function LoginPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCart());
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center w-screen h-screen">
      <Image
        src="/images/background-image.png"
        alt="Backround Image"
        className="-z-10"
        fill
      />
      <LoginForm />
    </div>
  );
}
