import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InkParticles from './Particles';

/*
  Colour palette — shifted warmer per spec.
  Grey undertone removed from everything.
*/
const C = {
    bg: '#F4EFE6',   // warmer parchment (was #F3EFE7)
    envBase: '#E7DAC3',   // warmer envelope base (was #E8DDC8)
    flapTop: '#D9CBB3',   // flap top edge — lighter
    flapMid: '#CDBFA6',   // flap mid
    flapFold: '#C3B497',   // flap near fold — darkest
    flapIn: '#F0E8D6',   // inside face of flap
    sideLeft: '#DCCEB5',   // left fold — slightly cooler
    sideRight: '#E6D9C4',   // right fold — slightly lighter/warmer
    bottom: '#E1D4BD',   // front/bottom fold — slightly darker than base
    text: '#2F2A26',
    textGhost: '#9A8E82',
    wax: '#7A1E1E',
    waxDark: '#521212',
    waxMid: '#8C2424',
    gold: '#B79A6B',
    goldDim: '#9A7E52',
};

const W = 420;
const H = 260;

export default function EnvelopeScene({ letter, onOpen }) {
    const [pressed, setPressed] = useState(false);

    const handleClick = () => {
        if (pressed) return;
        setPressed(true);
        setTimeout(() => onOpen(), 320);
    };

    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden vignette"
            style={{ background: C.bg }}
        >
            <InkParticles count={8} />

            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${C.gold}33, transparent)`, zIndex: 2 }} />
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${C.gold}33, transparent)`, zIndex: 2 }} />

            {/* ── SENDER ROW ─────────────────────────────────── */}
            <motion.div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: W, marginBottom: 44, position: 'relative', zIndex: 5 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <div style={{ width: 44, height: 56, border: `1px solid ${C.gold}40`, background: `${C.envBase}70`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, opacity: 0.6 }}>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 9, color: C.goldDim, letterSpacing: 0.5, lineHeight: 1.4, textAlign: 'center' }}>Love<br />Post</p>
                    <div style={{ width: 18, height: 1, background: `${C.gold}50` }} />
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 8, color: C.textGhost, letterSpacing: 1 }}>03</p>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 10, color: C.textGhost, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 4 }}>From</p>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 500, fontSize: 24, color: C.wax, lineHeight: 1 }}>
                        {letter.from || 'Someone who cares'}
                    </p>
                </div>
            </motion.div>

            {/* ── ENVELOPE ───────────────────────────────────── */}
            <motion.div
                className="animate-float"
                style={{ position: 'relative', zIndex: 10 }}
                initial={{ opacity: 0, scale: 0.93, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {/*
          Shadow — point 5: layered, wider, softer.
          Two layers: wide soft + tight contact.
        */}
                <div style={{
                    position: 'absolute',
                    bottom: -36, left: '4%', right: '4%',
                    height: 36,
                    background: 'rgba(30,18,8,0.15)',
                    filter: 'blur(28px)',
                    borderRadius: '50%',
                    zIndex: 0,
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: -12, left: '14%', right: '14%',
                    height: 14,
                    background: 'rgba(30,18,8,0.08)',
                    filter: 'blur(10px)',
                    borderRadius: '50%',
                    zIndex: 0,
                }} />

                {/*
          Point 7: perspective on the wrapper div.
          1400px gives stronger 3D depth when flap opens.
        */}
                <div style={{ perspective: '1400px' }}>
                    {/*
            ENVELOPE BODY — W×H rectangle.
            All 4 fold triangles meet at exact (50%, 50%).
            box-shadow is on this element: layered (point 5).
          */}
                    <div style={{
                        width: W, height: H,
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: [
                            '0 20px 40px rgba(30,18,8,0.15)',
                            '0 4px 8px rgba(30,18,8,0.08)',
                        ].join(', '),
                    }}>

                        {/* BASE — inside of envelope, slightly lighter */}
                        <div style={{ position: 'absolute', inset: 0, background: '#F0EAD8' }} />

                        {/*
              LEFT SIDE FOLD — point 4: #DCCEB5 (slightly cooler)
              Gradient from edge toward center point
            */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `linear-gradient(to right, ${C.sideLeft} 0%, ${C.envBase} 100%)`,
                            clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                        }} />

                        {/*
              RIGHT SIDE FOLD — point 4: #E6D9C4 (slightly lighter/warmer)
              Subtle difference creates light falloff
            */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `linear-gradient(to left, ${C.sideRight} 0%, ${C.envBase} 100%)`,
                            clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                        }} />

                        {/*
              BOTTOM / FRONT FOLD — point 3: #E1D4BD
              Slightly darker than base — not pale cream
            */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `linear-gradient(to top, ${C.bottom} 0%, ${C.envBase} 55%)`,
                            clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
                        }} />

                        {/* Paper grain */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.04'/%3E%3C/svg%3E")`,
                        }} />

                        {/*
              Point 2: Centre fold crease — horizontal shadow line.
              rgba(0,0,0,0.08) — almost invisible, like real paper.
            */}
                        <div style={{
                            position: 'absolute',
                            top: '50%', left: 0, right: 0,
                            height: 1,
                            background: 'rgba(0,0,0,0.08)',
                            transform: 'translateY(-0.5px)',
                            pointerEvents: 'none',
                            zIndex: 3,
                        }} />
                        {/* Subtle vertical centre line */}
                        <div style={{
                            position: 'absolute',
                            top: 0, bottom: 0, left: '50%',
                            width: 1,
                            background: 'rgba(0,0,0,0.04)',
                            transform: 'translateX(-0.5px)',
                            pointerEvents: 'none',
                            zIndex: 3,
                        }} />


                    </div>
                </div>{/* end perspective wrapper */}

                {/*
          WAX SEAL — point 6:
          translateY(-4px) raises it slightly so it overlaps more naturally.
          Heavier box-shadow to feel pressed into the paper.
        */}
                <AnimatePresence>
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: 85,
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-4px)',
                            zIndex: 20,
                        }}
                    >
                        <motion.div
                            onClick={handleClick}
                            animate={pressed ? { scale: 0.88, y: 3 } : { scale: 1, y: 0 }}
                            whileHover={!pressed ? { scale: 1.04 } : {}}
                            whileTap={!pressed ? { scale: 0.87 } : {}}
                            transition={{ duration: 0.26, ease: 'easeOut' }}
                            style={{
                                width: 72, height: 72,
                                borderRadius: '50%',
                                background: `radial-gradient(circle at 40% 36%, ${C.waxMid} 0%, ${C.wax} 42%, ${C.waxDark} 100%)`,
                                boxShadow: [
                                    '0 12px 24px rgba(0,0,0,0.25)',
                                    '0 3px 6px rgba(0,0,0,0.18)',
                                    'inset 0 1px 2px rgba(255,190,160,0.07)',
                                    'inset 0 -2px 6px rgba(0,0,0,0.32)',
                                ].join(', '),
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: pressed ? 'default' : 'pointer',
                                position: 'relative',
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 9, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.09)', pointerEvents: 'none' }} />
                            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 500, color: 'rgba(250,232,215,0.88)', textShadow: '0 1px 2px rgba(0,0,0,0.32)', position: 'relative', zIndex: 2 }}>
                                W
                            </span>
                        </motion.div>

                        {!pressed && (
                            <motion.p
                                style={{ position: 'absolute', top: 82, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 12, color: C.textGhost, letterSpacing: 1.5 }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                break the seal to open
                            </motion.p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Branding */}
            <motion.div
                style={{ textAlign: 'center', marginTop: 108, position: 'relative', zIndex: 5 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
            >
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: C.gold, letterSpacing: 3 }}>WhisperMail</p>
                <div style={{ width: 28, height: 1, background: `${C.gold}55`, margin: '8px auto 0' }} />
            </motion.div>
        </div>
    );
}
