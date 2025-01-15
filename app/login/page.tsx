import Image from "next/image";
import LoginForm from "@/components/Forms/LoginForm/LoginForm";

export default function LoginPage() {
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
