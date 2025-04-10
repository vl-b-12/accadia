import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  text: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
}

const ShareButton = ({
  text,
  onClick,
  icon,
  disabled = false,
}: ShareButtonProps) => {
  return (
    <div
      className={cn(
        "h-[106px] w-full rounded-md border border-b-violent-20 p-6 flex flex-col justify-center items-center gap-2.5 bg-violent-10 cursor-pointer hover:bg-violent-20 duration-300",
        {
          "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-100":
            disabled,
        },
      )}
      onClick={onClick}
    >
      <Image src={icon} alt={icon} width={24} height={24} />
      <div className="text-xs font-bold text-violent-80">{text}</div>
    </div>
  );
};

export default ShareButton;
