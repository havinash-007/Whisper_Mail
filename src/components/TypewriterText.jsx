import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TYPED_CURSOR = <span className="animate-cursor" style={{ opacity: 1 }}>|</span>;

export default function TypewriterText({ text, delay = 0, speed = 38, onComplete }) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        if (!text) return;

        let i = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayed(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                    setDone(true);
                    onComplete?.();
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay, speed]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: delay / 1000 }}
            style={{ whiteSpace: 'pre-wrap' }}
        >
            {displayed}
            {!done && TYPED_CURSOR}
        </motion.span>
    );
}
