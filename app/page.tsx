import LottoGame from "@/components/lotto-game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-4">

            <LottoGame />
        </div>
        <footer className="w-full py-4 px-6 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-center text-gray-400 text-sm">
                <span>© 2025 로또 번호 추첨기 | 행운을 담아 제작된 프로젝트 🍀</span>
            </div>
        </footer>
    </main>
  );
}
