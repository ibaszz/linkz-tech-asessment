import Image from "next/image";

interface AvatarProps {
  src: string;
  width: number;
  height: number;
}

export const Avatar = ({ src, width, height }: AvatarProps) => {
  return (
    <div className="rounded-full border-2 border-neutral-200 shadow-lg items-center align-middle justify-center min-w-10 aspect-square overflow-hidden">
      <object data={src} className={"w-10"} type="image/jpeg">
        <img
          src="/common/user.png"
          width={width}
          height={height}
          alt="user.png"
          className="aspect-square"
        />
      </object>
    </div>
  );
};
