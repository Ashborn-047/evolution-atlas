import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress as a normalized value (0-1)
 * 0 = top of page, 1 = bottom of page
 */
export const useScrollProgress = (): number => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
            setScrollProgress(scroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollProgress;
};
