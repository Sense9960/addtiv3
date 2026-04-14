'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useEffect, useCallback } from 'react';
import { Button, Grid, Space } from 'antd';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, ScrollTrigger } from 'gsap/all';

const { useBreakpoint } = Grid;

gsap.registerPlugin(SplitText, ScrollTrigger);

// NOTE: Figma asset URLs expire in 7 days.
// Replace with local files under /public/hero/ for production.
const heroImages = [
    {
        src: 'https://www.figma.com/api/mcp/asset/ed01feb0-e893-40f4-9ae2-4bfa2da86c1e',
        alt: '3D printed metal component',
    },
    {
        src: 'https://www.figma.com/api/mcp/asset/a08a2301-ce48-45fa-add2-c3127e10b5e3',
        alt: '3D printed orange FDM part',
    },
    {
        src: 'https://www.figma.com/api/mcp/asset/bf948dbd-c89a-4ce6-8759-2829f2a02418',
        alt: '3D printed resin model',
    },
    {
        src: 'https://www.figma.com/api/mcp/asset/335fbd5e-6b6e-4647-bf25-6432e0ed5757',
        alt: '3D printer in operation',
    },
    {
        src: 'https://www.figma.com/api/mcp/asset/e41101c0-5c08-4fa2-b6f9-7d606f495b58',
        alt: '3D printed dark finish part',
    },
    {
        src: 'https://www.figma.com/api/mcp/asset/586799ce-e4d0-4761-94d1-9c980fa118f0',
        alt: '3D printed structural part',
    },
];

// Duplicate for seamless infinite loop
const carouselImages = [...heroImages, ...heroImages];

const CARD_WIDTH = 264;
const CARD_GAP = 12;
const CARD_STEP = CARD_WIDTH + CARD_GAP; // 276px per card slot
const TOTAL_ORIG_WIDTH = heroImages.length * CARD_STEP; // 1656px (full original set)
const SCROLL_SPEED = 80; // px per second — continuous auto-scroll speed

interface HeroSectionProps {
    onStartProjectClick?: () => void;
    onViewServicesClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = () => {
    const router = useRouter();
    const screens = useBreakpoint();
    const containerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const xRef = useRef(0);

    // Entrance animations (badge, heading, buttons)
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.6, ease: 'power3.out' });
        tl.from(
            '.anim-lines .line',
            { rotationX: -90, opacity: 0, transformOrigin: '50% 50% -50px', duration: 1, ease: 'power3.out', stagger: 0.15 },
            '-=0.4',
        );
        tl.from('.hero-content-fade', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.6');
        tl.from('.hero-images-strip', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    }, { scope: containerRef });

    // Continuous auto-scroll via GSAP ticker (no scroll-hijacking)
    useEffect(() => {
        const tick = (_time: number, deltaTime: number) => {
            xRef.current -= SCROLL_SPEED * (deltaTime / 1000);
            // Seamless loop: when first set is scrolled fully out, jump back
            if (xRef.current <= -TOTAL_ORIG_WIDTH) {
                xRef.current += TOTAL_ORIG_WIDTH;
            }
            if (trackRef.current) {
                gsap.set(trackRef.current, { x: xRef.current });
            }
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, []);

    // Prev / Next: instantly offset by one card slot (ticker keeps running)
    const handlePrev = useCallback(() => {
        xRef.current += CARD_STEP;
        if (xRef.current > 0) xRef.current -= TOTAL_ORIG_WIDTH;
    }, []);

    const handleNext = useCallback(() => {
        xRef.current -= CARD_STEP;
        if (xRef.current <= -TOTAL_ORIG_WIDTH) xRef.current += TOTAL_ORIG_WIDTH;
    }, []);

    const isMobile = !screens.md;

    return (
        <section
            ref={containerRef}
            style={{
                background: '#ffffff',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? 64 : 120,
                padding: isMobile ? '60px 24px 80px' : '80px 120px 120px',
                width: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            {/* Hidden H1 for SEO */}
            <h1
                style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0,0,0,0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                }}
            >
                Additiv3 — Where Ideas Become Real Parts.
            </h1>

            {/* ── Hero content ─────────────────────────────── */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 32,
                    maxWidth: 960,
                    width: '100%',
                }}
            >
                {/* Badge */}
                <div
                    className="hero-badge"
                    style={{
                        border: '1px solid #0014e6',
                        borderRadius: 100,
                        padding: '12px 16px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span
                        style={{
                            color: '#0014e6',
                            fontSize: 12,
                            letterSpacing: '0.12px',
                            whiteSpace: 'nowrap',
                            lineHeight: 1.2,
                        }}
                    >
                        For engineers, startups, and more
                    </span>
                </div>

                {/* Heading */}
                <div
                    aria-hidden="true"
                    style={{
                        textAlign: 'center',
                        fontSize: isMobile ? 40 : 64,
                        fontWeight: 600,
                        lineHeight: 1.05,
                        letterSpacing: '0.64px',
                        perspective: 500,
                        width: '100%',
                    }}
                >
                    <div className="anim-lines">
                        <div className="line" style={{ color: 'var(--color-text-primary)' }}>
                            Where Ideas Become
                        </div>
                        <div className="line" style={{ color: '#0014e6' }}>
                            Real Parts.
                        </div>
                    </div>
                </div>

                {/* Subtitle */}
                <p
                    className="hero-content-fade"
                    style={{
                        color: '#898989',
                        fontSize: 16,
                        letterSpacing: '0.16px',
                        textAlign: 'center',
                        margin: 0,
                        lineHeight: 1.2,
                    }}
                >
                    Fast, reliable additive manufacturing from prototype to production.
                </p>

                {/* CTA Buttons */}
                <Space
                    size={16}
                    wrap
                    className="hero-content-fade"
                    style={{ justifyContent: 'center' }}
                >
                    <Button
                        size="large"
                        onClick={() => router.push('/services')}
                        style={{
                            padding: '16px 32px',
                            height: 'auto',
                            borderRadius: 12,
                            fontSize: 16,
                            letterSpacing: '0.16px',
                            border: '1px solid #d9d9d9',
                            background: '#ffffff',
                            color: '#000000',
                            boxShadow: 'none',
                        }}
                    >
                        View Services
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => router.push('/quote')}
                        style={{
                            padding: '16px 32px',
                            height: 'auto',
                            borderRadius: 12,
                            fontSize: 16,
                            letterSpacing: '0.16px',
                            backgroundColor: '#0014e6',
                            border: 'none',
                            boxShadow: 'none',
                        }}
                    >
                        Get a Quote!
                    </Button>
                </Space>
            </div>

            {/* ── Image carousel ───────────────────────────── */}
            <div
                className="hero-images-strip"
                style={{ position: 'relative', width: '100%' }}
            >
                {/* Prev button */}
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous"
                    style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.92)',
                        border: '1px solid #d9d9d9',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        fontSize: 16,
                        color: '#111',
                        transition: 'background 0.15s',
                    }}
                >
                    ‹
                </button>

                {/* Track (overflow hidden = no sticky, no scroll-hijack) */}
                <div style={{ overflow: 'hidden', width: '100%' }}>
                    <div
                        ref={trackRef}
                        style={{
                            display: 'flex',
                            gap: CARD_GAP,
                            width: 'max-content',
                            willChange: 'transform',
                        }}
                    >
                        {carouselImages.map((img, index) => (
                            <div
                                key={index}
                                style={{
                                    width: CARD_WIDTH,
                                    height: 200,
                                    borderRadius: 8,
                                    border: '1px solid #626262',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    position: 'relative',
                                }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                        pointerEvents: 'none',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next button */}
                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next"
                    style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.92)',
                        border: '1px solid #d9d9d9',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        fontSize: 16,
                        color: '#111',
                        transition: 'background 0.15s',
                    }}
                >
                    ›
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
