interface AvatarProps {
  src: string;
  width: number;
  height: number;
}

export const Avatar = ({ src, width, height }: AvatarProps) => {
  return (
    <div className="rounded-full hover:cursor-pointer border-2 border-neutral-200 shadow-lg hover:-translate-y-2 max-w-20 items-center align-middle justify-center">
      <img
        className="rounded-full hover:cursor-pointer"
        src={src}
        width={width}
        height={height}
      ></img>
    </div>
  );
};
