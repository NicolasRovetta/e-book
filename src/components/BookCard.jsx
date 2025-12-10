import React from 'react';

export default function BookCard({ book, onClick }) {
    const { title, author, img, description } = book.data;

    // Función para validar imágenes seguras localmente
    const isTrustedImage = (src) => {
        return typeof src === "string" && src.startsWith("/e-book/");
    };

    return (
        <article
            className="group relative flex flex-col h-full overflow-hidden rounded-2xl glass-panel border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
            onClick={() => onClick(book)}
        >
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-800">
                {isTrustedImage(img) ? (
                    <img
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={img}
                        alt={title}
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-500">
                        <span className="text-4xl">📚</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4 flex flex-col flex-grow relative z-10">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 leading-tight group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-blue-300 mb-2 font-medium">{author}</p>
                <p className="text-slate-400 text-sm line-clamp-2 mt-auto">
                    {description}
                </p>
            </div>
        </article>
    );
}
