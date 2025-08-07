import LottoGame from "@/components/lotto-game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
        <div className="flex-1 flex items-center justify-center p-4 mb-28">
            <LottoGame />
        </div>
        <footer className="w-full mt-auto py-4 px-6 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-center text-gray-400 text-sm">
                <span>© 2025 로또 번호 추첨기 | tete SideProject 🍀</span>
            </div>
        </footer>
    </main>
  );
}
