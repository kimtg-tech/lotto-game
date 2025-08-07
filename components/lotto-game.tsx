"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FastForward } from 'lucide-react';
import { TypewriterText } from "./TypewriterText";

// Helper function to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

// Helper function to get a color based on the ball number
const getBallColor = (number: number) => {
  if (number <= 10) return "bg-yellow-400";
  if (number <= 20) return "bg-blue-500";
  if (number <= 30) return "bg-red-500";
  if (number <= 40) return "bg-gray-600";
  return "bg-green-500";
};

const encouragingMessages = [
  "✨ 당신은 꼭 1등이 될 거예요!\n행운이 함께합니다 ✨",
  "💫 이번주 당첨은 당신의 것입니다.\n행복한 미래가 기다려요 💫",
  "🎯 수고하셨어요!\n이제 로또를 구매하러 가볼까요? 🍀"
];



// Ball component (for inside the machine)
const Ball = ({ number, isTumbling, isDrawn }: { number: number; isTumbling?: boolean; isDrawn?: boolean; }) => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [animation, setAnimation] = useState({
    delay: '0s',
    duration: '3s'
  });

  useEffect(() => {
    setPosition({
      top: `${getRandom(15, 75)}%`,
      left: `${getRandom(15, 75)}%`
    });

    setAnimation({
      delay: `${getRandom(0, 2)}s`,
      duration: `${getRandom(2, 4)}s`
    });
  }, []);



  const ballClass = `absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg transition-opacity duration-500 ${getBallColor(number)}`;

  return (
      <div
          className={ballClass}
          style={{
            top: position.top,
            left: position.left,
            animationName: isTumbling ? 'tumble' : 'none',
            animationDuration: animation.duration,
            animationDelay: animation.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            opacity: isDrawn ? 0 : 1,
          }}
      >

      {number}
    </div>
  );
};

// Main Lotto Game Component
export default function LottoGame() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [shuffledBalls, setShuffledBalls] = useState<number[]>([]);
  const [isFastMode, setIsFastMode] = useState(false);

  const startSoundRef = useRef<HTMLAudioElement>(null);
  const tumblingSoundRef = useRef<HTMLAudioElement>(null);
  const landSoundRef = useRef<HTMLAudioElement>(null);
  const endSoundRef = useRef<HTMLAudioElement>(null);
  const [selectedMessage, setSelectedMessage] = useState("");

  const allBalls = useMemo(() => Array.from({ length: 45 }, (_, i) => i + 1), []);
  const drawInterval = isFastMode ? 500 : 1000;

  const resetGame = () => {
    setIsDrawing(false);
    setDrawnNumbers([]);
    const shuffled = [...allBalls].sort(() => Math.random() - 0.5);
    setShuffledBalls(shuffled);
    if (tumblingSoundRef.current) {
      tumblingSoundRef.current.pause();
      tumblingSoundRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    resetGame();
    // Preload audio
    startSoundRef.current = new Audio('/sounds/start.mp3');
    tumblingSoundRef.current = new Audio('/sounds/tumbling.mp3');
    tumblingSoundRef.current.loop = true;
    landSoundRef.current = new Audio('/sounds/land.mp3');
    endSoundRef.current = new Audio('/sounds/end.mp3');
  }, []);

  useEffect(() => {

    if (isDrawing && drawnNumbers.length < 6) {
      const timer = setTimeout(() => {
        setDrawnNumbers(prev => [...prev, shuffledBalls[prev.length]]);
        if (landSoundRef.current) {
          landSoundRef.current.currentTime = 0;
          landSoundRef.current.play().catch(error => console.error("Landing sound failed to play:", error));
        }
      }, drawInterval);

      return () => clearTimeout(timer);
    }
    if (drawnNumbers.length === 6) {
      if (tumblingSoundRef.current) {
        tumblingSoundRef.current.pause();
      }
      if (endSoundRef.current) {
        endSoundRef.current.play().catch(error => console.error("End sound failed to play:", error));
      }
      setTimeout(() => setIsDrawing(false), 2000);
    }
  }, [isDrawing, drawnNumbers, shuffledBalls, drawInterval]);

  useEffect(() => {
    if (drawnNumbers.length === 6) {
      const randomIndex = Math.floor(Math.random() * encouragingMessages.length);
      setSelectedMessage(encouragingMessages[randomIndex]);
    } else {
      setSelectedMessage("");
    }
  }, [drawnNumbers.length]);

  const handleDrawClick = () => {
    resetGame();
    setIsDrawing(true);
    if (startSoundRef.current) {
      startSoundRef.current.play().catch(error => console.error("Start sound failed to play:", error));
    }
    if (tumblingSoundRef.current) {
      tumblingSoundRef.current.play().catch(error => console.error("Tumbling sound failed to play:", error));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full max-w-2xl pb-32">
      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wider">🍀행운의 숫자 공장🎲</h1>
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
        <Button
          size="icon"
          variant={isFastMode ? "secondary" : "ghost"}
          className="absolute top-0 right-0 z-10"
          onClick={() => setIsFastMode(prev => !prev)}
        >
          <FastForward className="h-5 w-5" />
          <span className="sr-only">Toggle Fast Mode</span>
        </Button>

        {/* Rotating Container */}
        <div className={`w-full h-full relative ${isDrawing ? 'rotating-drum' : ''}`}>
          {/* Machine Structure */}
          <div className="absolute inset-0 border-[10px] border-gray-400/30 rounded-full shadow-inner" />
          <div className="absolute inset-5 border-[2px] border-white/50 rounded-full" />
          <div className="absolute inset-0 bg-black/20 rounded-full" />

          {/* Balls Container */}
          <div className="relative w-full h-full">
            {allBalls.map(num => (
              <Ball
                key={`in-machine-${num}`}
                number={num}
                isTumbling={isDrawing}
                isDrawn={drawnNumbers.includes(num)}
              />
            ))}
          </div>
        </div>

        {/* Start Button */}
        {!isDrawing && drawnNumbers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" onClick={handleDrawClick}
                    className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4),0_0_20px_rgba(59,130,246,0.7)]"

            >
              🎲 추첨하기
            </Button>
          </div>
        )}
      </div>

      {/* Results Display */}
      <div className="mt-8 h-24 w-full flex flex-col items-center">
        {
          drawnNumbers.length > 0 && (
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">당첨 번호</h2>
          )
        }
        <div className="relative flex justify-center gap-2 sm:gap-4">
          {/* Placeholders */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full " />
          ))}
          
          {/* Animated Balls flying into place */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-2 sm:gap-4">
            {drawnNumbers.map((num, index) => (
              <div
                key={index}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg animate-land ${getBallColor(num)}`}
                style={{ 
                  animationDelay: `${drawInterval}ms`,
                  animationDuration: `${isFastMode ? 500 : 1000}ms`
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
        {drawnNumbers.length === 6 && (
            <>
              <div className="w-full flex justify-center mt-8 mb-4">
                <TypewriterText text={selectedMessage} />
              </div>
              <Button
                  onClick={resetGame}
                  className="mt-4 px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl hover:animate-none"
              >
                다시하기
              </Button>
            </>

        )}
      </div>
    </div>
  );
}
