import { motion } from 'framer-motion';

const THEMES = [
    { id: 'romantic', label: 'Romantic', emoji: '🌹', bg: '#FFF0F5', accent: '#F8C8DC', border: '#E8A0BC' },
    { id: 'blush', label: 'Blush', emoji: '🌸', bg: '#FFE4EE', accent: '#FFB6C1', border: '#F4A0B5' },
    { id: 'parchment', label: 'Parchment', emoji: '📜', bg: '#F0E0B8', accent: '#D4A76A', border: '#C49A4A' },
    { id: 'dark-academia', label: 'Dark Academia', emoji: '🕯️', bg: '#2A2118', accent: '#8B7355', border: '#6B5535' },
];

export default function ThemeSelector({ current, onChange }) {
    return (
        <div className="flex gap-2 flex-wrap justify-center">
            {THEMES.map((t) => (
                <motion.button
                    key={t.id}
                    onClick={() => onChange(t.id)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-inter transition-all"
                    style={{
                        background: t.bg,
                        border: `1.5px solid ${current === t.id ? t.border : 'transparent'}`,
                        color: t.id === 'dark-academia' ? '#E8D5B7' : '#3B2F2F',
                        boxShadow: current === t.id ? `0 0 0 2px ${t.accent}44` : 'none',
                        fontWeight: current === t.id ? 600 : 400,
                    }}
                >
                    <span>{t.emoji}</span>
                    <span>{t.label}</span>
                </motion.button>
            ))}
        </div>
    );
}
