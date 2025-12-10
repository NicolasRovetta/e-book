import React from 'react';
import { useStore } from '@nanostores/react';
import { lang, translations } from '../store';

export default function LibraryHeader() {
    const $lang = useStore(lang);
    const t = translations[$lang] || translations.es;

    return (
        <div className="mb-12 text-center" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 relative inline-flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t.libraryTitle}</span>
            </h2>
            <p className="text-slate-400 text-lg mt-4 max-w-xl mx-auto">
                {t.libraryDesc}
            </p>
        </div>
    );
}
