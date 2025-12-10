import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import BookDetailModal from "./BookDetailModal";
import { useStore } from '@nanostores/react';
import { lang, translations } from "../store";

export default function BookSearch({ books }) {
    const $lang = useStore(lang);
    const t = translations[$lang] || translations.es;

    const [search, setSearch] = useState("");
    const [suggestion, setSuggestion] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const filteredBooks = Array.isArray(books)
        ? books.filter((book) => {
            const { title, author, description } = book.data;
            const body = book.body || "";
            const query = search.toLowerCase();
            return (
                title.toLowerCase().includes(query) ||
                author.toLowerCase().includes(query) ||
                description.toLowerCase().includes(query) ||
                body.toLowerCase().includes(query)
            );
        })
        : [];

    useEffect(() => {
        function levenshtein(a, b) {
            if (a.length === 0) return b.length;
            if (b.length === 0) return a.length;

            const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
                Array(b.length + 1).fill(0)
            );
            for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
            for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
            for (let i = 1; i <= a.length; i++) {
                for (let j = 1; j <= b.length; j++) {
                    matrix[i][j] =
                        a[i - 1] === b[j - 1]
                            ? matrix[i - 1][j - 1]
                            : Math.min(
                                matrix[i - 1][j] + 1,
                                matrix[i][j - 1] + 1,
                                matrix[i - 1][j - 1] + 1
                            );
                }
            }
            return matrix[a.length][b.length];
        }

        if (filteredBooks.length === 0 && search.length > 2 && Array.isArray(books)) {
            const queryWords = search.toLowerCase().split(" ");
            let bestBook = null;
            let bestScore = -Infinity;

            books.forEach((book) => {
                const { title, author, description } = book.data;
                const body = book.body || "";
                const text = `${title} ${author} ${description} ${body}`.toLowerCase();

                let score = 0;

                queryWords.forEach((word) => {
                    if (title.toLowerCase() === word) score += 10;
                    else if (title.toLowerCase().includes(word)) score += 6;

                    if (author.toLowerCase() === word) score += 6;
                    else if (author.toLowerCase().includes(word)) score += 3;

                    if (description.toLowerCase() === word) score += 3;
                    else if (description.toLowerCase().includes(word)) score += 1;

                    if (body.toLowerCase() === word) score += 2;
                    else if (body.toLowerCase().includes(word)) score += 1;
                });

                score += Math.max(0, 8 - levenshtein(text, search.toLowerCase()));

                if (score > bestScore) {
                    bestScore = score;
                    bestBook = book;
                }
            });

            setSuggestion(bestScore > 0 ? bestBook : null);
        } else {
            setSuggestion(null);
        }
    }, [search, filteredBooks, books]);

    const handleToggleNotifications = async () => {
        if (!('Notification' in window)) {
            alert('Las notificaciones no son compatibles con este navegador.');
            return;
        }
        if (!notificationsEnabled) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotificationsEnabled(true);
                new Notification(t.notifications, { body: t.notificationBody });
            }
        } else {
            setNotificationsEnabled(false);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-10 w-full max-w-3xl mx-auto">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        className="block w-full pl-10 pr-10 py-4 border border-white/10 rounded-xl leading-5 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-800/80 transition-all shadow-lg backdrop-blur-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                            onClick={() => setSearch("")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    )}
                </div>

                <button
                    onClick={handleToggleNotifications}
                    className={`flex-shrink-0 p-4 rounded-xl transition-all shadow-lg border border-white/10 ${notificationsEnabled
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
                            : 'bg-slate-800/50 hover:bg-slate-700/80 text-gray-400 hover:text-white'
                        }`}
                    title={notificationsEnabled ? t.disableNotifications : t.enableNotifications}
                >
                    {notificationsEnabled ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 16" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.slug}
                        book={book}
                        onClick={setSelectedBook}
                    />
                ))}
            </div>

            {filteredBooks.length === 0 && (
                <div className="text-center py-20 animate-in fade-in duration-500">
                    {suggestion ? (
                        <div className="max-w-md mx-auto">
                            <p className="text-xl text-gray-400 mb-6">{t.suggestionText}</p>
                            <div className="transform transition hover:scale-105">
                                <BookCard book={suggestion} onClick={setSelectedBook} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <p className="text-xl font-medium">{t.noResults}</p>
                            <p className="text-sm">{t.tryAgain}</p>
                        </div>
                    )}
                </div>
            )}

            {selectedBook && (
                <BookDetailModal
                    book={selectedBook}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </>
    );
}
