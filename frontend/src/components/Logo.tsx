export const Logo = (
  { animate }: { animate: boolean } | undefined = { animate: false }
) => {
  return (
    <>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjaXaX0pN9NcoND671_oHpoBfJXcb1Be0V_fUvMYrEcQ&s"
        className={`w-32 mx-auto ${animate && "animate-pulse"}`}
      />
      <h1 className="-mt-10 items-center text-center font-light">
        Test Assesment
      </h1>
    </>
  );
};
