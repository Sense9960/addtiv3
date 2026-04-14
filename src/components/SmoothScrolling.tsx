'use client';

import { useEffect, useRef, createContext, useContext, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname, useSearchParams } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<React.RefObject<Lenis | null>>({ current: null });

export const useLenis = () => useContext(LenisContext).current;

function SmoothScrollingContent({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            syncTouch: true,
        });

        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        const lenisUpdate = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisUpdate);
        gsap.ticker.lagSmoothing(0);

        // Refresh ScrollTrigger sau khi Lenis + DOM đã sẵn sàng
        ScrollTrigger.refresh();
        const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        if (window.location.hash) {
            window.scrollTo(0, 0);
            setTimeout(() => {
                const target = document.querySelector(window.location.hash) as HTMLElement;
                if (target) {
                    lenis.scrollTo(target, {
                        offset: -100,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    });
                }
            }, 100);
        }

        return () => {
            cancelAnimationFrame(rafId);
            gsap.ticker.remove(lenisUpdate);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        const lenis = lenisRef.current;
        if (!lenis || !window.location.hash) return;

        const target = document.querySelector(window.location.hash) as HTMLElement;
        if (!target) return;

        setTimeout(() => {
            lenis.scrollTo(target, {
                offset: -100,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                immediate: false,
            });
        }, 100);
    }, [pathname, searchParams]);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
}

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<>{children}</>}>
            <SmoothScrollingContent>{children}</SmoothScrollingContent>
        </Suspense>
    );
}