import { useEffect, useRef } from 'react';

// Tiny rose petals — translucent and slow.
// Only triggered on letter open. Sparse.
export default function PetalRain({ active }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = '';
        if (!active) return;

        const count = 7;
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.style.cssText = `
        position: fixed;
        left: ${10 + Math.random() * 80}%;
        top: -20px;
        width: ${4 + Math.random() * 5}px;
        height: ${4 + Math.random() * 5}px;
        border-radius: 50% 0 50% 0;
        background: rgba(175, 100, 100, ${0.12 + Math.random() * 0.18});
        animation: petalFall ${4 + Math.random() * 5}s ease-in ${Math.random() * 1.5}s forwards;
        pointer-events: none;
        z-index: 200;
      `;
            container.appendChild(el);
        }

        return () => { container.innerHTML = ''; };
    }, [active]);

    return <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 200 }} />;
}
