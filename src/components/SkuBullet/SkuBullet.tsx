import React from "react";
import { cn } from "@/lib/utils";

interface SkuBulletProps {
  sku: string;
  className?: string;
}

const SkuBullet = ({ sku, className }: SkuBulletProps) => {
  return (
    <div
      className={cn(
        "border rounded-md border-violent-80 text-xs font-medium text-gray-70 px-3 py-0.5",
        className,
      )}
    >
      {sku}
    </div>
  );
};

export default SkuBullet;
