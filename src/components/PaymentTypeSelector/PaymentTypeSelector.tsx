import React from "react";
import Image from "next/image";

interface PaymentTypeSelectorProps {
  icon: string;
  text: string;
  onClick?: () => void;
}

const PaymentTypeSelector = ({
  icon,
  text,
  onClick,
}: PaymentTypeSelectorProps) => {
  return (
    <div
      className="group rounded-md w-[452px] h-[190px] gap-6 border border-violent-20 cursor-pointer flex flex-col items-center justify-center hover:bg-violent-20 hover:scale-105 hover:border-none duration-300"
      onClick={onClick}
    >
      <div className="size-11 rounded-md border border-violent-30 flex justify-center items-center group-hover:bg-violent-40 group-hover:border-none duration-300">
        <Image src={icon} width={20} height={20} alt="icon" unoptimized />
      </div>
      <div className="font-semibold opacity-60 text-lg group-hover:opacity-100 duration-300">
        {text}
      </div>
    </div>
  );
};

export default PaymentTypeSelector;
