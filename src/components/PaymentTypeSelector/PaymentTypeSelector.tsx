import React from "react";
import { PaymentType } from "@/types/types";

interface PaymentTypeSelectorProps {
  type: PaymentType;
  text: string;
  onClick?: () => void;
}

const PaymentTypeSelector = ({
  type,
  text,
  onClick,
}: PaymentTypeSelectorProps) => {
  return (
    <div
      className="group rounded-md w-[452px] h-[190px] gap-6 border border-violent-20 cursor-pointer flex flex-col items-center justify-center hover:bg-violent-20 hover:scale-105 hover:border-none duration-300"
      onClick={onClick}
    >
      <div className="size-11 rounded-md border border-violent-30 flex justify-center items-center group-hover:bg-violent-40 group-hover:border-none">
        {type === "split" ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white group-hover:fill-violent-40 duration-0"
          >
            <g clip-path="url(#clip0_4562_1621)">
              <path
                d="M9.99995 17.0595C10.8845 17.8513 12.0527 18.3327 13.3333 18.3327C16.0947 18.3327 18.3333 16.0941 18.3333 13.3327C18.3333 11.0269 16.7725 9.08567 14.6498 8.50783M5.35011 8.50782C3.22741 9.08566 1.66663 11.0269 1.66663 13.3327C1.66663 16.0941 3.9052 18.3327 6.66663 18.3327C9.42805 18.3327 11.6666 16.0941 11.6666 13.3327C11.6666 12.6823 11.5424 12.0609 11.3165 11.4909M15 6.66602C15 9.42744 12.7614 11.666 9.99996 11.666C7.23854 11.666 4.99996 9.42744 4.99996 6.66602C4.99996 3.90459 7.23854 1.66602 9.99996 1.66602C12.7614 1.66602 15 3.90459 15 6.66602Z"
                stroke="#D6B1E2"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_4562_1621">
                <rect width="20" height="20" fill="currentColor" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="text-violent-40 group-hover:text-white duration-0"
          >
            <g clip-path="url(#clip0_4570_931)">
              <path
                d="M4.58301 14.166C5.27336 14.166 5.83301 13.6064 5.83301 12.916C5.83301 12.2257 5.27336 11.666 4.58301 11.666C3.89265 11.666 3.33301 12.2257 3.33301 12.916C3.33301 13.6064 3.89265 14.166 4.58301 14.166Z"
                fill="currentColor"
              />
              <path
                d="M15.8333 2.5H4.16667C3.062 2.50132 2.00296 2.94073 1.22185 3.72185C0.440735 4.50296 0.00132321 5.562 0 6.66667L0 13.3333C0.00132321 14.438 0.440735 15.497 1.22185 16.2782C2.00296 17.0593 3.062 17.4987 4.16667 17.5H15.8333C16.938 17.4987 17.997 17.0593 18.7782 16.2782C19.5593 15.497 19.9987 14.438 20 13.3333V6.66667C19.9987 5.562 19.5593 4.50296 18.7782 3.72185C17.997 2.94073 16.938 2.50132 15.8333 2.5ZM4.16667 4.16667H15.8333C16.4964 4.16667 17.1323 4.43006 17.6011 4.8989C18.0699 5.36774 18.3333 6.00363 18.3333 6.66667H1.66667C1.66667 6.00363 1.93006 5.36774 2.3989 4.8989C2.86774 4.43006 3.50363 4.16667 4.16667 4.16667ZM15.8333 15.8333H4.16667C3.50363 15.8333 2.86774 15.5699 2.3989 15.1011C1.93006 14.6323 1.66667 13.9964 1.66667 13.3333V8.33333H18.3333V13.3333C18.3333 13.9964 18.0699 14.6323 17.6011 15.1011C17.1323 15.5699 16.4964 15.8333 15.8333 15.8333Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_4570_931">
                <rect width="20" height="20" fill="currentColor" />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>
      <div className="font-semibold opacity-60 text-lg group-hover:opacity-100 duration-300">
        {text}
      </div>
    </div>
  );
};

export default PaymentTypeSelector;
