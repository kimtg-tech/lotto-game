import { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
}

export function TypewriterText({ text }: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 100); // 타자 속도 조절

            return () => clearTimeout(timer);
        }
    }, [currentIndex, text]);

    return (
        <div className="min-h-[4rem] w-full max-w-md p-6 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur shadow-lg text-center">
            <p className="text-white text-lg sm:text-xl font-semibold leading-relaxed tracking-wide whitespace-pre-line">
                {displayText}
                <span className="animate-pulse ml-1 text-blue-400">▎</span>
            </p>
        </div>
    );
}