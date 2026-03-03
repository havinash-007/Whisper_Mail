import { motion } from 'framer-motion';

const STICKER_SETS = {
    romantic: ['🌹', '💌', '💕', '🎀', '✨', '🌷', '💝', '🫶'],
    fun: ['🍒', '⭐', '🌸', '🦋', '🌙', '☀️', '🌻', '🍓'],
    whimsy: ['✦', '♡', '◇', '✿', '❋', '⁕', '❃', '✾'],
};

export default function StickerPicker({ onAdd }) {
    return (
        <div className="space-y-3">
            {Object.entries(STICKER_SETS).map(([category, stickers]) => (
                <div key={category}>
                    <p className="text-xs font-inter capitalize mb-1.5" style={{ color: 'var(--text-muted, #7A6A6A)' }}>
                        {category}
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                        {stickers.map((s, i) => (
                            <motion.button
                                key={i}
                                onClick={() => onAdd(s)}
                                whileHover={{ scale: 1.3, rotate: 10 }}
                                whileTap={{ scale: 0.85 }}
                                className="w-9 h-9 flex items-center justify-center rounded-xl text-xl hover:bg-white/50 transition-colors"
                                style={{ background: 'rgba(255,248,242,0.5)' }}
                                title={`Add ${s}`}
                            >
                                {s}
                            </motion.button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
