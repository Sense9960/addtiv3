'use client';

import { useEffect, useState, createContext, useContext, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname, useSearchParams } from 'next/navigation';

// Register plugin outside of useEffect
gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

function SmoothScrollingContent({ children }: { children: React.ReactNode }) {
    const [lenisRef, setLenisRef] = useState<Lenis | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // 1. Init Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing mượt mà
        });

        setLenisRef(lenis);

        // 2. Đồng bộ Lenis với GSAP ScrollTrigger
        // Mỗi khi Lenis cuộn, báo cho ScrollTrigger cập nhật vị trí
        lenis.on('scroll', ScrollTrigger.update);

        // 3. Thêm Lenis vào vòng lặp ticker của GSAP
        // Giúp animation chạy đồng bộ với tốc độ cuộn của Lenis
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // 4. Tắt lag smoothing của GSAP để tránh xung đột với Lenis
        gsap.ticker.lagSmoothing(0);

        // 5. Disable native scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // 6. Check hash on load and scroll to it
        if (window.location.hash) {
            // Scroll to top immediately to prevent browser jump
            window.scrollTo(0, 0);

            // Use a slight delay to ensure content is ready, then smooth scroll
            setTimeout(() => {
                const hash = window.location.hash;
                const target = document.querySelector(hash) as HTMLElement;
                if (target) {
                    lenis.scrollTo(target, {
                        offset: 0,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    });
                }
            }, 100);
        }

        // Cleanup khi component bị hủy (chuyển trang...)
        return () => {
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            lenis.destroy();
            setLenisRef(null);
        };
    }, []);

    useEffect(() => {
        if (lenisRef && window.location.hash) {
            // Scroll to top immediately to prevent browser jump
            // window.scrollTo(0, 0); // Keep this if necessary, but lenis.scrollTo usually handles it better if we intercept properly.

            const hash = window.location.hash;
            const target = document.querySelector(hash) as HTMLElement;

            if (target) {
                // Use a slight delay to ensure content is ready
                setTimeout(() => {
                    lenisRef.scrollTo(target, {
                        offset: 0,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        immediate: false, // Ensure it animates
                    });
                }, 100);
            }
        }
    }, [pathname, searchParams, lenisRef]);

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