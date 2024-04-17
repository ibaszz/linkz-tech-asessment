import { Logo } from "@/components/Logo";
import { useRouterReady } from "@/hooks/useRouterReady";

export default function Signin() {
  const { router } = useRouterReady();

  console.log(router.query);

  return (
    <div className="min-h-screen w-full flex flex-row items-center bg-white">
      <div className=" w-full flex flex-col items-center">
        <div className="absolute -translate-y-1/2 -z-1">
          <Logo animate={true} />
        </div>
      </div>
    </div>
  );
}
