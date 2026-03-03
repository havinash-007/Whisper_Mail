import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const C = {
    bg: '#F3EFE7',
    text: '#2F2A26',
    textMid: '#5A5048',
    textGhost: '#9A8E82',
    wax: '#7A1E1E',
    gold: '#B79A6B',
    goldDim: '#9A7E52',
    card: 'rgba(253,250,244,0.97)',
    border: 'rgba(150,120,80,0.18)',
};

const THEMES = [
    { id: 'cream', label: 'Cream', desc: 'Warm, intimate', swatch: '#E8DDC8' },
    { id: 'rose', label: 'Rose parchment', desc: 'Tender, soft', swatch: '#E8D0CC' },
    { id: 'parchment', label: 'Aged parchment', desc: 'Nostalgic, literary', swatch: '#D8C89A' },
    { id: 'night', label: 'Inkwell night', desc: 'Moody, poetic', swatch: '#2A2018' },
];

const MARKS = {
    'Editorial': ['✦', '◇', '—', '·', '∘', '∗'],
    'Botanical': ['✿', '❋', '❃', '✾', '⁕'],
    'Warmth': ['♡', '◡', '◦', '⌒'],
};

const label = (text) => ({
    fontFamily: 'Cormorant Garamond, serif',
    fontStyle: 'italic',
    fontSize: 10,
    color: C.goldDim,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
    display: 'block',
});

const field = {
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${C.gold}33`,
    outline: 'none',
    width: '100%',
    color: C.text,
    padding: '8px 0',
    fontFamily: 'Dancing Script, cursive',
    fontSize: 17,
    resize: 'none',
};

export default function LetterEditor({ letter, theme, stickers, onChange, onThemeChange, onStickerAdd, onStickerRemove, onPreview }) {
    const [tab, setTab] = useState('write');
    const set = (f) => (e) => onChange({ ...letter, [f]: e.target.value });

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start py-12 px-4 vignette"
            style={{ background: C.bg }}
        >
            {/* Header */}
            <motion.div
                style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 5 }}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
            >
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 11, color: C.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 10 }}>
                    WhisperMail
                </p>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(30px, 5vw, 44px)', color: C.text, lineHeight: 1.2, letterSpacing: 0.3 }}>
                    Write your letter
                </h1>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: C.textGhost, marginTop: 8 }}>
                    every word becomes a memory
                </p>
            </motion.div>

            {/* Tabs — clean typographic, no icons */}
            <motion.div
                style={{
                    display: 'flex',
                    gap: 0,
                    marginBottom: 32,
                    border: C.border,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 5,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {[
                    { id: 'write', label: 'Write' },
                    { id: 'accents', label: 'Accents' },
                    { id: 'theme', label: 'Mood' },
                ].map((t, i) => (
                    <button
                        key={t.id}
                        id={`tab-${t.id}`}
                        onClick={() => setTab(t.id)}
                        style={{
                            padding: '10px 28px',
                            background: tab === t.id ? `${C.gold}14` : 'transparent',
                            color: tab === t.id ? C.goldDim : C.textGhost,
                            fontFamily: 'Cormorant Garamond, serif',
                            fontStyle: 'italic',
                            fontSize: 14,
                            letterSpacing: 0.5,
                            border: 'none',
                            borderRight: i < 2 ? `1px solid ${C.gold}22` : 'none',
                            cursor: 'pointer',
                            fontWeight: tab === t.id ? 600 : 400,
                            transition: 'all 0.2s',
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </motion.div>

            {/* Panel */}
            <motion.div style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 5 }} layout>
                <div style={{
                    background: C.card,
                    border: C.border,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 3,
                    boxShadow: '0 14px 50px rgba(30,20,10,0.08), 0 2px 8px rgba(30,20,10,0.05)',
                    overflow: 'hidden',
                }}>
                    <AnimatePresence mode="wait">
                        {/* ── WRITE ── */}
                        {tab === 'write' && (
                            <motion.div
                                key="write"
                                style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', gap: 28 }}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 6 }}
                                transition={{ duration: 0.22 }}
                            >
                                <div>
                                    <span style={label('Title')}>Title</span>
                                    <input
                                        id="input-title"
                                        type="text"
                                        value={letter.title}
                                        onChange={set('title')}
                                        placeholder="My Heart Writes to You"
                                        style={{ ...field, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 20 }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                    <div>
                                        <span style={label('To')}>To</span>
                                        <input id="input-to" type="text" value={letter.to} onChange={set('to')} placeholder="My dearest" style={field} />
                                    </div>
                                    <div>
                                        <span style={label('From')}>From</span>
                                        <input id="input-from" type="text" value={letter.from} onChange={set('from')} placeholder="Yours truly" style={field} />
                                    </div>
                                </div>

                                <div>
                                    <span style={label('Your words')}>Your words</span>
                                    <textarea
                                        id="input-body"
                                        rows={6}
                                        value={letter.body}
                                        onChange={set('body')}
                                        placeholder={"There are things I've been carrying in the space between heartbeats.\n\nYou matter. In the quietest, most certain way I know."}
                                        style={{
                                            ...field,
                                            resize: 'vertical',
                                            borderBottom: 'none',
                                            border: `1px solid ${C.gold}28`,
                                            padding: 14,
                                            borderRadius: 2,
                                            lineHeight: 1.9,
                                            fontSize: 17,
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                    <div>
                                        <span style={label('Closing')}>Closing</span>
                                        <input id="input-sig" type="text" value={letter.signature} onChange={set('signature')} placeholder="— always" style={field} />
                                    </div>
                                    <div>
                                        <span style={label('Date')}>Date</span>
                                        <input
                                            id="input-date"
                                            type="text"
                                            value={letter.date}
                                            onChange={set('date')}
                                            placeholder={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            style={{ ...field, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── ACCENTS ── */}
                        {tab === 'accents' && (
                            <motion.div
                                key="accents"
                                style={{ padding: '44px 48px' }}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 6 }}
                                transition={{ duration: 0.22 }}
                            >
                                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 20, color: C.text, marginBottom: 6 }}>
                                    Typographic marks
                                </p>
                                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: C.textGhost, marginBottom: 28 }}>
                                    Small marks that give the page character
                                </p>

                                {Object.entries(MARKS).map(([cat, marks]) => (
                                    <div key={cat} style={{ marginBottom: 24 }}>
                                        <span style={label(cat)}>{cat}</span>
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {marks.map((m, i) => (
                                                <motion.button
                                                    key={i}
                                                    onClick={() => onStickerAdd(m)}
                                                    whileHover={{ scale: 1.18 }}
                                                    whileTap={{ scale: 0.85 }}
                                                    style={{
                                                        width: 40, height: 40,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontFamily: 'Cormorant Garamond, serif',
                                                        fontSize: 18,
                                                        color: C.gold,
                                                        border: `1px solid ${C.gold}30`,
                                                        background: 'transparent',
                                                        cursor: 'pointer',
                                                        borderRadius: 2,
                                                    }}
                                                >
                                                    {m}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {stickers.length > 0 && (
                                    <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${C.gold}20` }}>
                                        <span style={label('Added · click to remove')}>Added · click to remove</span>
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {stickers.map((s, i) => (
                                                <motion.button
                                                    key={i}
                                                    onClick={() => onStickerRemove(i)}
                                                    whileHover={{ opacity: 0.4 }}
                                                    style={{ fontSize: 20, background: 'none', border: 'none', cursor: 'pointer', color: C.gold, padding: 4 }}
                                                >
                                                    {s.char}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* ── THEME / MOOD ── */}
                        {tab === 'theme' && (
                            <motion.div
                                key="theme"
                                style={{ padding: '44px 48px' }}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 6 }}
                                transition={{ duration: 0.22 }}
                            >
                                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 20, color: C.text, marginBottom: 6 }}>
                                    Choose your mood
                                </p>
                                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: C.textGhost, marginBottom: 28 }}>
                                    The paper changes — the feeling stays
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {THEMES.map((t) => (
                                        <motion.button
                                            key={t.id}
                                            onClick={() => onThemeChange(t.id)}
                                            whileHover={{ x: 3 }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 16,
                                                padding: '14px 16px',
                                                background: theme === t.id ? `${C.gold}0E` : 'transparent',
                                                border: `1px solid ${theme === t.id ? C.gold + '44' : 'transparent'}`,
                                                cursor: 'pointer',
                                                borderRadius: 2,
                                                textAlign: 'left',
                                            }}
                                        >
                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: t.swatch, border: `1px solid ${C.gold}44`, flexShrink: 0 }} />
                                            <div>
                                                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, color: C.text, fontWeight: theme === t.id ? 500 : 400 }}>
                                                    {t.label}
                                                </p>
                                                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 12, color: C.textGhost }}>
                                                    {t.desc}
                                                </p>
                                            </div>
                                            {theme === t.id && (
                                                <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: C.gold }} />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Seal & Send — muted wax, not modern red */}
            <motion.button
                id="seal-send-btn"
                onClick={onPreview}
                style={{
                    marginTop: 36,
                    padding: '15px 52px',
                    background: `linear-gradient(135deg, #521212, ${C.wax})`,
                    color: '#F5EAD8',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    fontSize: 16,
                    letterSpacing: 2,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(82,18,18,0.30), 0 2px 6px rgba(82,18,18,0.15)',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 5,
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ boxShadow: '0 10px 32px rgba(82,18,18,0.40)', scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
            >
                <span style={{ position: 'relative', zIndex: 2 }}>Seal & send</span>
                <motion.div
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,220,180,0.09), transparent)' }}
                    animate={{ x: ['-100%', '120%'] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                />
            </motion.button>

            <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 11,
                color: C.textGhost,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginTop: 18,
                paddingBottom: 32,
                position: 'relative',
                zIndex: 5,
            }}>
                some things are too soft for a text
            </p>
        </div>
    );
}
