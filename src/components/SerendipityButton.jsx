import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from './BookCard';
import { useStore } from '@nanostores/react';
import { lang, translations } from "../store";

export default function SerendipityButton({ books, onSelect }) {
    const $lang = useStore(lang);
    const t = translations[$lang] || translations.es;
    const [isSpinning, setIsSpinning] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSurprise = () => {
        if (isSpinning || books.length === 0) return;

        setIsSpinning(true);
        setShowConfetti(false);

        // Spin animation logic
        let duration = 3000; // 3 seconds spin
        let interval = 100;
        let elapsed = 0;

        const spin = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * books.length);
            onSelect(books[randomIndex]); // Show random book temporarily

            elapsed += interval;
            if (elapsed >= duration) {
                clearInterval(spin);
                setIsSpinning(false);
                setShowConfetti(true);
                // Final selection
                const finalIndex = Math.floor(Math.random() * books.length);
                onSelect(books[finalIndex]);
                setTimeout(() => setShowConfetti(false), 3000);
            }
        }, interval);
    };

    return (
        <div className="relative inline-block">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSurprise}
                disabled={isSpinning}
                className="relative overflow-hidden group px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/30 border border-white/10"
            >
                <span className="relative z-10 flex items-center gap-2">
                    <svg className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    {isSpinning ? t.spinning : t.surpriseMe}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </motion.button>

            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl pointer-events-none"
                    >
                        🎉✨
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
