import LottoGame from "@/components/lotto-game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 overflow-hidden">
        <LottoGame />
    </main>
  );
}
