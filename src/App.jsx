import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeScene from './components/EnvelopeScene';
import LetterView from './components/LetterView';
import LetterEditor from './components/LetterEditor';
import PetalRain from './components/PetalRain';

const C = {
  bg: '#F3EFE7',
  text: '#2F2A26',
  textMid: '#5A5048',
  textGhost: '#9A8E82',
  wax: '#7A1E1E',
  gold: '#B79A6B',
  goldDim: '#9A7E52',
};

const DEMO = {
  title: 'Between the lines of missing you',
  to: 'my future self',
  from: 'Your heart',
  body: "There are things I've been carrying in the space between heartbeats.\n\nYou make ordinary moments feel like a second language I'm still learning to speak. I find you in the quiet — in songs that end too soon, in mornings that feel too soft for routine.\n\nI wanted to write this down before time blurs it. Before I forget how purely I felt it.",
  signature: '— always & all ways',
  date: 'March 3, 2026',
};

const BLANK = { title: '', to: '', from: '', body: '', signature: '', date: '' };

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [letter, setLetter] = useState(BLANK);
  const [theme, setTheme] = useState('cream');
  const [stickers, setStickers] = useState([]);
  const [petals, setPetals] = useState(false);
  const [loading, setLoading] = useState(true);  // for shared link

  // On mount: check #l=<encoded> and load the shared letter
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#l=(.+)/);

    if (match) {
      try {
        const decoded = decodeURIComponent(escape(atob(match[1])));
        const data = JSON.parse(decoded);
        if (data?.letter) {
          setLetter(data.letter);
          setTheme(data.theme || 'cream');
          setStickers(data.stickers || []);
          setScreen('envelope');
        }
      } catch (e) {
        // malformed hash — just show landing
      }
    }
    setLoading(false);
  }, []);

  const addSticker = (char) => {
    const xs = ['8%', '78%', '5%', '82%', '42%', '68%'];
    const ys = ['12%', '10%', '58%', '52%', '6%', '78%'];
    const i = stickers.length % 6;
    setStickers(p => [...p, { char, x: xs[i], y: ys[i], size: 20, rotate: -12 + Math.random() * 24 }]);
  };

  const handleOpen = () => {
    setPetals(true);
    setTimeout(() => { setPetals(false); setScreen('letter'); }, 1200);
  };

  // Show nothing while resolving a shared letter link
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.p
          style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: C.textGhost, letterSpacing: 3 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          opening your letter…
        </motion.p>
      </div>
    );
  }

  return (
    <div>
      <PetalRain active={petals} />

      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div key="landing" {...fade}>
            <Landing
              onWrite={() => { setLetter(BLANK); setScreen('editor'); }}
              onDemo={() => { setLetter(DEMO); setTheme('cream'); setStickers([]); setScreen('envelope'); }}
            />
          </motion.div>
        )}

        {screen === 'editor' && (
          <motion.div key="editor" {...fade}>
            <LetterEditor
              letter={letter}
              theme={theme}
              stickers={stickers}
              onChange={setLetter}
              onThemeChange={setTheme}
              onStickerAdd={addSticker}
              onStickerRemove={(i) => setStickers(p => p.filter((_, j) => j !== i))}
              onPreview={() => setScreen('envelope')}
            />
          </motion.div>
        )}

        {screen === 'envelope' && (
          <motion.div key="envelope" {...fade}>
            <EnvelopeScene letter={letter} onOpen={handleOpen} />
          </motion.div>
        )}

        {screen === 'letter' && (
          <motion.div key="letter" {...fade}>
            <LetterView
              letter={letter}
              theme={theme}
              stickers={stickers}
              onReplay={() => setScreen('envelope')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit link — top left, only on envelope / letter */}
      {(screen === 'envelope' || screen === 'letter') && (
        <motion.button
          onClick={() => setScreen('editor')}
          style={{
            position: 'fixed', top: 20, left: 20,
            background: `${C.bg}CC`, backdropFilter: 'blur(10px)',
            border: `1px solid ${C.gold}28`,
            color: C.textGhost,
            fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
            fontSize: 13, letterSpacing: 0.5, padding: '7px 16px',
            cursor: 'pointer', zIndex: 50, borderRadius: 2,
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ color: C.goldDim }}
        >
          ← edit
        </motion.button>
      )}
    </div>
  );
}

/* ── LANDING ──────────────────────────────────────────── */
function Landing({ onWrite, onDemo }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden vignette"
      style={{ background: C.bg }}
    >
      {/* Soft ambient bloom */}
      <div style={{ position: 'fixed', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 480, height: 260, borderRadius: '50%', background: `radial-gradient(circle, ${C.gold}0A 0%, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />

      {/* Hairlines */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${C.gold}33, transparent)`, zIndex: 2 }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${C.gold}33, transparent)`, zIndex: 2 }} />

      <motion.div
        style={{ position: 'relative', zIndex: 5, maxWidth: 560 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 11, color: C.gold, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 28 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          WhisperMail
        </motion.p>

        <motion.h1
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(50px, 9vw, 80px)', color: C.text, lineHeight: 1.08, letterSpacing: -1 }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1 }}
        >
          Some things are<br />
          too soft to send<br />
          <em style={{ color: C.wax, fontStyle: 'italic' }}>as a text.</em>
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '28px auto' }}
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.75, duration: 0.7 }}
        >
          <div style={{ height: 1, width: 44, background: `linear-gradient(to right, transparent, ${C.gold})` }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold, opacity: 0.65 }} />
          <div style={{ height: 1, width: 44, background: `linear-gradient(to left, transparent, ${C.gold})` }} />
        </motion.div>

        <motion.p
          style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 19, color: C.textMid, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 44px' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 1 }}
        >
          Write an intimate letter. Seal it with wax.<br />
          Watch it open like something worth keeping.
        </motion.p>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9 }}
        >
          <motion.button
            id="btn-write" onClick={onWrite}
            style={{ padding: '16px 60px', background: `linear-gradient(135deg, #521212, ${C.wax})`, color: '#F5EAD8', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 17, letterSpacing: 2, border: 'none', cursor: 'pointer', boxShadow: '0 6px 22px rgba(82,18,18,0.28)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 36px rgba(82,18,18,0.40)' }}
            whileTap={{ scale: 0.97 }}
          >
            Write a letter
            <motion.div
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,220,180,0.09), transparent)' }}
              animate={{ x: ['-100%', '120%'] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.button>

          <motion.button
            id="btn-demo" onClick={onDemo}
            style={{ padding: '11px 36px', background: 'transparent', color: C.textGhost, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, letterSpacing: 1.5, border: `1px solid ${C.gold}33`, cursor: 'pointer', borderRadius: 2 }}
            whileHover={{ color: C.goldDim, borderColor: `${C.gold}66` }}
            whileTap={{ scale: 0.97 }}
          >
            see how it feels
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.p
        style={{ position: 'fixed', bottom: 18, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: 'uppercase', zIndex: 5 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
      >
        made with love · whispermail
      </motion.p>
    </div>
  );
}
