import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { lang, theme } from '../store';

export default function Navbar() {
    const $lang = useStore(lang);
    const $theme = useStore(theme);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            theme.set(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        const savedLang = localStorage.getItem('site_lang');
        if (savedLang) lang.set(savedLang);
    }, []);

    const toggleLang = () => {
        const newLang = $lang === 'es' ? 'en' : 'es';
        lang.set(newLang);
        localStorage.setItem('site_lang', newLang);
    };

    const toggleTheme = () => {
        const newTheme = $theme === 'dark' ? 'light' : 'dark';
        theme.set(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 px-6 py-4 transition-all duration-300">
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <a href="/e-book/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                            e
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-all hidden sm:block">
                            e-Books
                        </span>
                    </a>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    {/* Lang Toggle */}
                    <button
                        onClick={toggleLang}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/80 text-sm font-medium text-slate-300 hover:text-white transition-all border border-white/5"
                        aria-label="Toggle Language"
                        title={$lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                    >
                        <span>{$lang === 'es' ? '🇪🇸' : '🇺🇸'}</span>
                        <span className="uppercase">{$lang}</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/80 text-slate-300 hover:text-yellow-400 transition-all border border-white/5"
                        aria-label="Toggle Theme"
                        title={$theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    >
                        {$theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
