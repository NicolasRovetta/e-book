import React from 'react';
import { useStore } from '@nanostores/react';
import { lang, translations } from '../store';

export default function Hero() {
    const $lang = useStore(lang);
    const t = translations[$lang] || translations.es;

    return (
        <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative inline-block group">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                    {t.heroTitle}
                </span>
                <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-700 delay-150">
                {t.heroSubtitle} <span className="text-white font-semibold">{t.heroSubtitleHighlight}</span> <br />
                <span className="text-lg md:text-xl text-slate-400 mt-2 block">
                    {t.heroDescription}
                </span>
            </p>
        </div>
    );
}
