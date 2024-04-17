import { useRouter } from "next/router";

export default function NotMember() {
  const router = useRouter();
  setTimeout(() => {
    router.replace("/login");
  }, 1500);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="flex min-h-screen flex-col items-center">
        <h1 className={`text-3xl text-white`}>Not A Member, Redirecting...</h1>
      </div>
    </main>
  );
}
