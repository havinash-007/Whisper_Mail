import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from './TypewriterText';

// ── THEME PALETTE — each mood changes paper, bg, and text colours
const THEME_PALETTE = {
    cream: {
        bg: '#F4EFE6',
        paper: '#FDFAF4',
        paperEnd: '#FAF6EE',
        text: '#2F2A26',
        textMid: '#5A5048',
        textGhost: '#9A8E82',
        border: 'rgba(140,110,70,0.17)',
        rule: 'rgba(183,154,107,0.11)',
        margin: 'rgba(183,154,107,0.14)',
    },
    rose: {
        bg: '#F5EDEC',
        paper: '#FDF6F5',
        paperEnd: '#F8EFEE',
        text: '#2E2224',
        textMid: '#5A4446',
        textGhost: '#9A8284',
        border: 'rgba(150,100,100,0.17)',
        rule: 'rgba(180,130,130,0.11)',
        margin: 'rgba(180,130,130,0.14)',
    },
    parchment: {
        bg: '#EDE3CC',
        paper: '#F5EDD8',
        paperEnd: '#EFEAD0',
        text: '#2A2418',
        textMid: '#504530',
        textGhost: '#8A7E62',
        border: 'rgba(130,100,50,0.22)',
        rule: 'rgba(160,130,70,0.13)',
        margin: 'rgba(160,130,70,0.16)',
    },
    night: {
        bg: '#141008',
        paper: '#1E1810',
        paperEnd: '#181410',
        text: '#E8DCC8',
        textMid: '#C8B89A',
        textGhost: '#7A6E58',
        border: 'rgba(183,154,107,0.22)',
        rule: 'rgba(183,154,107,0.08)',
        margin: 'rgba(183,154,107,0.10)',
    },
};

const BASE = {
    wax: '#7A1E1E',
    gold: '#B79A6B',
    goldDim: '#9A7E52',
};

// ── LINE GRID CONSTANTS ──────────────────────────────────
// Must match background-image in .letter-ruled (index.css)
const LINE_H = 40;   // px — single grid unit
// Padding: start text exactly on line 1 of the grid.
// Top = 4 lines (48*4 = 192) for header block + date.
// We'll set paddingTop so that first text line (the "To" line)
// aligns perfectly with a rule.
const PAD_TOP = 192;  // px
const PAD_SIDE = 90;   // px
const PAD_BOTTOM = 80;   // px

// Text style for body — takes C so colour shifts with theme
const bodyStyle = (C) => ({
    fontFamily: 'Dancing Script, cursive',
    fontSize: 18,
    lineHeight: `${LINE_H}px`,
    color: C.textMid,
    fontWeight: 500,
    margin: 0,
    transform: 'translateY(2px)',
    display: 'block',
});

/* ── SHARE MODAL ─────────────────────────────────────── */
function ShareModal({ link, onClose, C }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <motion.div
            style={{ position: 'fixed', inset: 0, background: 'rgba(28,18,8,0.55)', backdropFilter: 'blur(6px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                style={{ background: C.paper, border: `1px solid rgba(140,110,70,0.22)`, borderRadius: 3, padding: '44px 48px', maxWidth: 440, width: '100%', boxShadow: '0 24px 80px rgba(28,18,8,0.14)' }}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                onClick={e => e.stopPropagation()}
            >
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 11, color: C.goldDim, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>WhisperMail</p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 28, color: C.text, marginBottom: 8, lineHeight: 1.2 }}>Your letter is sealed</h2>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: C.textGhost, marginBottom: 28 }}>Anyone with this link can open it</p>

                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                    <div style={{ flex: 1, padding: '10px 14px', background: C.bg, border: `1px solid rgba(140,110,70,0.22)`, borderRadius: 2, fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.textMid, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {link}
                    </div>
                    <motion.button
                        onClick={copy}
                        style={{ padding: '10px 20px', background: copied ? `${C.gold}22` : 'transparent', border: `1px solid ${copied ? C.gold : 'rgba(140,110,70,0.35)'}`, borderRadius: 2, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: copied ? C.goldDim : C.textGhost, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
                        whileHover={{ borderColor: C.gold, color: C.goldDim }}
                        whileTap={{ scale: 0.96 }}
                    >
                        {copied ? 'copied ✦' : 'copy link'}
                    </motion.button>
                </div>

                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 12, color: C.textGhost, lineHeight: 1.7 }}>
                    The receiver will see the sealed envelope first, then break the wax to read your words.
                </p>
                <button onClick={onClose} style={{ marginTop: 24, background: 'none', border: 'none', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: C.textGhost, cursor: 'pointer' }}>
                    close
                </button>
            </motion.div>
        </motion.div>
    );
}

/* ── LETTER VIEW ─────────────────────────────────────── */
export default function LetterView({ letter, theme = 'cream', stickers, onReplay }) {
    const T = THEME_PALETTE[theme] || THEME_PALETTE.cream;
    const C = { ...T, ...BASE };
    const [phase, setPhase] = useState(0);
    const [sharing, setSharing] = useState(false);
    const [shareLink, setShareLink] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const advance = useCallback(() => setPhase(p => Math.min(p + 1, 4)), []);

    const handleShare = async () => {
        if (shareLink) { setShowModal(true); return; }
        setSharing(true);
        try {
            const res = await fetch('/api/letters', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ letter, theme, stickers }) });
            const { id } = await res.json();
            const link = `${window.location.origin}?l=${id}`;
            setShareLink(link);
            setShowModal(true);
        } catch { alert('Could not create share link. Is the server running?'); }
        finally { setSharing(false); }
    };

    const dateStr = letter.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const paragraphs = (letter.body || '').split('\n').filter(Boolean);
    const isDone = phase >= 4;

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-start py-12 px-4 vignette"
            style={{ background: C.bg, transition: 'background 0.6s ease' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.65 }}
        >
            <motion.p
                style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 11, color: C.gold, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 36, position: 'relative', zIndex: 5 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            >
                WhisperMail
            </motion.p>

            {/* PAPER */}
            <motion.div
                style={{ position: 'relative', width: '100%', maxWidth: 540, zIndex: 5 }}
                initial={{ opacity: 0, y: 48, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Cast shadow */}
                <div style={{ position: 'absolute', bottom: -24, left: '6%', right: '6%', height: 28, background: 'rgba(28,18,8,0.08)', filter: 'blur(20px)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: -8, left: '14%', right: '14%', height: 10, background: 'rgba(28,18,8,0.06)', filter: 'blur(7px)', borderRadius: '50%' }} />

                {/* Corner curl */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: 32, height: 32, background: `conic-gradient(from 225deg at 100% 0%, #EDE5D2 0deg, ${C.paper} 55deg, transparent 55deg)`, filter: 'drop-shadow(-2px 2px 3px rgba(0,0,0,0.07))', zIndex: 10, pointerEvents: 'none', borderRadius: '0 3px 0 0' }} />

                {/*
          PAPER — padding designed around 48px line grid
          PAD_TOP = 192px (4 grid lines) — header block lives here
          Text body starts at grid line 5 → baseline aligns with rules
        */}
                <div
                    className="letter-ruled paper-grain"
                    style={{
                        background: `linear-gradient(175deg, ${C.paper} 0%, ${C.paperEnd} 100%)`,
                        borderRadius: 3,
                        border: `1px solid ${C.border}`,
                        boxShadow: '0 20px 70px rgba(28,18,8,0.07)',
                        padding: `${PAD_TOP}px ${PAD_SIDE}px ${PAD_BOTTOM}px`,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'background 0.6s ease',
                    }}
                >
                    {/* Left margin rule */}
                    <div style={{ position: 'absolute', left: 72, top: 0, bottom: 0, width: 1, background: C.margin, pointerEvents: 'none' }} />

                    {/* ── HEADER (lives in the PAD_TOP space) ── */}
                    <motion.div
                        // Positioned absolutely so it doesn't push the grid-aligned text down
                        style={{ position: 'absolute', top: 0, left: PAD_SIDE, right: PAD_SIDE, paddingTop: 40, textAlign: 'center' }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        onAnimationComplete={() => phase === 0 && setTimeout(advance, 500)}
                    >
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 10, color: C.goldDim, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 10 }}>Love Letters</p>
                        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(22px, 4vw, 32px)', color: C.text, lineHeight: 1.2, letterSpacing: 0.3, margin: 0 }}>
                            {letter.title || 'My Heart Writes to You'}
                        </h1>
                        {/* Gold rule */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12 }}>
                            <div style={{ height: 1, width: 34, background: `linear-gradient(to right, transparent, ${C.gold})` }} />
                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold, opacity: 0.65 }} />
                            <div style={{ height: 1, width: 34, background: `linear-gradient(to left, transparent, ${C.gold})` }} />
                        </div>
                    </motion.div>

                    {/* ── DATE — sits near top of text area, right-aligned ── */}
                    <motion.p
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: C.textGhost, textAlign: 'right', marginBottom: LINE_H, lineHeight: `${LINE_H}px` }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                    >
                        {dateStr}
                    </motion.p>

                    {/* ── TO ── */}
                    <AnimatePresence>
                        {phase >= 1 && (
                            <motion.div style={{ marginBottom: LINE_H }} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65 }}>
                                <p style={{ ...bodyStyle(C), fontSize: 20, color: C.text, fontWeight: 600 }}>
                                    <TypewriterText text={`To ${letter.to || 'you'},`} delay={60} speed={42} onComplete={advance} />
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── BODY ── */}
                    <AnimatePresence>
                        {phase >= 2 && (
                            <motion.div style={{ marginBottom: LINE_H }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }}>
                                {paragraphs.length > 0 ? (
                                    <div>
                                        {paragraphs.map((p, i) => (
                                            <motion.p
                                                key={i}
                                                // Each paragraph: min 1 grid line of space before next
                                                style={{ ...bodyStyle(C), marginBottom: p.trim() === '' ? 0 : LINE_H }}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.25, duration: 0.7 }}
                                                onAnimationComplete={i === paragraphs.length - 1 ? advance : undefined}
                                            >
                                                {p}
                                            </motion.p>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={bodyStyle(C)}>
                                        <TypewriterText
                                            text={"There are things I've been carrying in the space between heartbeats.\n\nYou make ordinary moments feel like a second language. I find you in the quiet — in songs that end too soon, in mornings too soft for routine.\n\nI wanted to write this before time blurs it."}
                                            delay={200} speed={24} onComplete={advance}
                                        />
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── SIGNATURE ── */}
                    <AnimatePresence>
                        {phase >= 3 && (
                            <motion.div
                                style={{ textAlign: 'right', paddingTop: LINE_H / 2 }}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                onAnimationComplete={() => phase === 3 && advance()}
                            >
                                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: C.textGhost, marginBottom: 4, lineHeight: `${LINE_H}px` }}>
                                    With everything I have,
                                </p>
                                <p style={{ fontFamily: 'Dancing Script, cursive', fontSize: 32, color: C.text, lineHeight: `${LINE_H * 1.4}px`, fontWeight: 700, transform: 'translateY(2px)' }}>
                                    {letter.from || 'Yours truly'}
                                </p>
                                {letter.signature && (
                                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, color: C.goldDim, marginTop: 4, lineHeight: `${LINE_H}px` }}>
                                        {letter.signature}
                                    </p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── CLOSING GOLD RULE ── */}
                    <AnimatePresence>
                        {phase >= 4 && (
                            <motion.div
                                style={{ marginTop: LINE_H, display: 'flex', alignItems: 'center', gap: 12 }}
                                initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9 }}
                            >
                                <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${C.gold}80)` }} />
                                <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold, opacity: 0.5 }} />
                                <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${C.gold}80)` }} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Wax watermark */}
                    <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', width: 40, height: 40, borderRadius: '50%', border: `1px solid ${C.wax}0E`, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 13, color: `${C.wax}10` }}>W</span>
                    </div>
                </div>
            </motion.div>

            {/* ── ACTIONS ── */}
            <AnimatePresence>
                {isDone && (
                    <motion.div
                        style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 36, position: 'relative', zIndex: 5 }}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    >
                        <motion.button
                            onClick={handleShare}
                            disabled={sharing}
                            style={{ padding: '13px 36px', background: `linear-gradient(135deg, #521212, #7A1E1E)`, color: '#F5EAD8', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 15, letterSpacing: 1.5, border: 'none', cursor: sharing ? 'wait' : 'pointer', boxShadow: '0 6px 22px rgba(82,18,18,0.28)', borderRadius: 2, opacity: sharing ? 0.7 : 1, position: 'relative', overflow: 'hidden' }}
                            whileHover={{ scale: 1.03, boxShadow: '0 10px 32px rgba(82,18,18,0.38)' }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {sharing ? 'sealing…' : shareLink ? 'share again ✦' : 'create share link'}
                        </motion.button>
                        {onReplay && (
                            <motion.button
                                onClick={onReplay}
                                style={{ background: 'none', border: 'none', borderBottom: `1px solid ${C.gold}44`, color: C.textGhost, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, letterSpacing: 1, cursor: 'pointer', padding: '2px 0' }}
                                whileHover={{ color: C.goldDim, borderBottomColor: `${C.gold}88` }}
                            >
                                open again
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.p
                style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', marginTop: 28, paddingBottom: 32, position: 'relative', zIndex: 5 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            >
                whispermail · made with love
            </motion.p>

            <AnimatePresence>
                {showModal && shareLink && <ShareModal link={shareLink} onClose={() => setShowModal(false)} C={C} />}
            </AnimatePresence>
        </motion.div>
    );
}
