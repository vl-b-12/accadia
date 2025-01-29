"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { push } = useRouter();

  useEffect(() => {
    push(sessionStorage.getItem("access_token") ? "/catalog" : "/login");
  }, []);

  return null;
};

export default HomePage;
