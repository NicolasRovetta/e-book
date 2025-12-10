import React from 'react';
import { motion } from 'framer-motion';

const vibes = [
    { id: 'all', emoji: '📚', label: 'Todos' },
    { id: 'mindblown', emoji: '🤯', label: 'Explota cabezas', keywords: ['ciencia', 'sapiens', 'cosmos', 'futuro', 'negocios', 'dinero'] },
    { id: 'deep', emoji: '🧘‍♂️', label: 'Profundo / Zen', keywords: ['filosofía', 'estoicismo', 'alma', 'meditación', 'espiritual', 'sentido'] },
    { id: 'classic', emoji: '🏛️', label: 'Clásicos', keywords: ['soledad', 'orgullo', 'crimen', 'odisea', 'quijote', 'gatsby'] },
    { id: 'fantasy', emoji: '🐉', label: 'Fantasía / Sci-Fi', keywords: ['anillos', 'dune', 'viento', 'harry', 'fuego', 'trono', 'ficción'] },
    { id: 'dark', emoji: '🌑', label: 'Oscuro / Misterio', keywords: ['terror', 'miedo', 'drácula', 'frankenstein', 'sombra', 'suspenso'] }
];

export default function VibeFilters({ selectedVibe, onSelectVibe }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 mt-4">
            {vibes.map((vibe) => {
                const isSelected = selectedVibe === vibe.id;
                return (
                    <motion.button
                        key={vibe.id}
                        onClick={() => onSelectVibe(vibe.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                            border cursor-pointer flex items-center gap-2
                            ${isSelected
                                ? 'bg-white text-slate-900 border-white shadow-lg shadow-white/20'
                                : 'bg-slate-800/50 text-gray-300 border-white/10 hover:bg-slate-700/50 hover:border-white/30'
                            }
                        `}
                    >
                        <span className="text-lg">{vibe.emoji}</span>
                        <span>{vibe.label}</span>
                    </motion.button>
                );
            })}
        </div>
    );
}

export const getVibeKeywords = (vibeId) => {
    const vibe = vibes.find(v => v.id === vibeId);
    return vibe ? vibe.keywords || [] : [];
};
