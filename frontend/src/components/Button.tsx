import Image from "next/image";
import { ReactNode } from "react";

interface ButtonProps {
  src: string;
  text: string;
}

export const SocialButton = ({ src, text }: ButtonProps) => {
  return (
    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-2 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
      {src && (
        <Image
          className="bg-white p-2 rounded-full"
          src={src}
          alt={src}
          width={35}
          height={35}
          priority
        />
      )}
      <span className="ml-4">{text}</span>
    </button>
  );
};
