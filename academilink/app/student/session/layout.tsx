export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}
