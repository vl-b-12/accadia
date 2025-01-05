import React from "react";
import { cn } from "@/lib/utils";

interface KaratsBulletProps {
  karats: string;
  type?: "vertical" | "horizontal";
  className?: string;
}

const KaratsBullet = ({
  karats,
  type = "vertical",
  className,
}: KaratsBulletProps) => {
  return (
    <div
      className={cn(
        "px-3 py-0.5 rounded-md bg-pink-default w-fit text-gray-0 text-xs font-semibold mb-2",
        className,
      )}
    >
      {type === "horizontal" ? `Karats: ${karats}` : karats}
    </div>
  );
};

export default KaratsBullet;
