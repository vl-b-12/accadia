import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(productPrice: number): {
  currencySymbol: string;
  price: string;
} {
  const formattedPrice = productPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const splitPrice = formattedPrice.split("");
  const currencySymbol = splitPrice[0];
  const price = splitPrice.slice(1).join("");

  return { currencySymbol, price };
}
