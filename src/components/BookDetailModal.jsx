import React, { useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { useStore } from '@nanostores/react';
import { lang, translations } from "../store";

export default function BookDetailModal({ book, onClose }) {
    const $lang = useStore(lang);
    const t = translations[$lang] || translations.es;

    if (!book) return null;

    const { title, author, img, description, buy } = book.data;

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent scroll on body when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const isTrustedImage = (src) => typeof src === "string" && src.startsWith("/e-book/");

    const isTrustedUrl = (url) => {
        try {
            const trustedDomains = ["amazon.com", "mercadolibre.com", "mercadolibre.com.ar"];
            const parsed = new URL(url);
            return trustedDomains.some(domain => parsed.hostname.endsWith(domain));
        } catch {
            return false;
        }
    };

    const speakDescription = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utter = new window.SpeechSynthesisUtterance(description);
            utter.lang = $lang === 'es' ? 'es-ES' : 'en-US';
            window.speechSynthesis.speak(utter);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/80 rounded-full transition-colors"
                    title={t.close}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
                    {/* Imagen Lado Izquierdo */}
                    <div className="flex-shrink-0 mx-auto md:mx-0 w-64">
                        {isTrustedImage(img) && (
                            <img
                                src={img}
                                alt={title}
                                className="w-full h-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                            />
                        )}
                    </div>

                    {/* Información Lado Derecho */}
                    <div className="flex-grow text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
                        <h3 className="text-xl text-blue-400 font-medium mb-6">{author}</h3>

                        <div className="prose prose-invert prose-p:text-slate-300 max-w-none mb-6">
                            <p className="lead">{description}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <button
                                onClick={speakDescription}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg border border-white/10 transition-all hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                {t.listen}
                            </button>

                            {buy && isTrustedUrl(buy.usa) && (
                                <a href={buy.usa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1">
                                    {t.buyUSA}
                                </a>
                            )}
                            {buy && isTrustedUrl(buy.argentina) && (
                                <a href={buy.argentina} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1">
                                    {t.buyArg}
                                </a>
                            )}
                        </div>

                        {book.body && (
                            <div className="mt-8 pt-8 border-t border-white/10 prose prose-invert max-w-none">
                                {/* Note: Content is markdown, probably not translatable easily without separate files */}
                                <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{book.body}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
