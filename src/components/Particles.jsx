import { useEffect, useRef } from 'react';

// Tiny ink dots. That's all. No emojis. No characters.
// They drift upward slowly and fade — like breath.
export default function InkParticles({ count = 14 }) {
    const ref = useRef(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;
        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            const size = 1.5 + Math.random() * 2.5;
            el.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        bottom: ${10 + Math.random() * 40}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(184, 150, 74, ${0.15 + Math.random() * 0.25});
        animation: inkDrift ${5 + Math.random() * 7}s ease-in ${Math.random() * 6}s infinite;
        pointer-events: none;
      `;
            container.appendChild(el);
        }

        return () => { container.innerHTML = ''; };
    }, [count]);

    return (
        <div
            ref={ref}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
