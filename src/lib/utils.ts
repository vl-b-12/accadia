import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(productPrice: string = "0"): {
  currencySymbol: string;
  price: string;
} {
  const numericPrice = parseFloat(productPrice);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = formatter.format(numericPrice);

  const currencySymbol = formattedPrice[0];
  const price = formattedPrice.slice(1);

  return { currencySymbol, price };
}

export const cleanFilters = (filters: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => !!value),
  );
};

export const formatDecimalInput = (input: string): string => {
  let value = input.replace(/[^0-9.]/g, "");

  const parts = value.split(".");

  if (parts.length > 1 && parts[1].length > 2) {
    value = parts[0] + "." + parts[1].slice(0, 2);
  }

  return value;
};

export type FetchFunction = (
  parameter: string,
) => Promise<{ data: Blob & { filename: string } }>;

export const handlePdfUpload = async (
  fetchFunction: FetchFunction,
  parameter: string,
  filename = "",
) => {
  const res = await fetchFunction(parameter);

  const a = document.createElement("a");
  document.body.appendChild(a);
  const url = window.URL.createObjectURL(res.data);
  a.href = url;
  a.download = res.data.filename || filename;
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 0);
};
