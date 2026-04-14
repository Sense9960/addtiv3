'use client';

import React, { useRef } from 'react';
import { Grid } from 'antd';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { useBreakpoint } = Grid;

// NOTE: Figma asset URL — replace with /public/process/ image for production (expires 7 days)
const PROCESS_IMAGE = 'https://www.figma.com/api/mcp/asset/0020e230-e370-474b-ab6e-d2a79b17688f';

const steps = [
    {
        number: '01',
        title: 'Review',
        desc: 'We review your file, material requirements, quantities, and intended use.',
    },
    {
        number: '02',
        title: 'Prepare',
        desc: 'We prepare files and machine settings to ensure consistent results across production runs.',
    },
    {
        number: '03',
        title: 'Manufacture',
        desc: 'We send prepared files to machines and print parts using defined production settings.',
    },
    {
        number: '04',
        title: 'Deliver',
        desc: 'We ship your parts.',
    },
];

const ProcessSection: React.FC = () => {
    const screens = useBreakpoint();
    const sectionRef = useRef<HTMLElement>(null);
    const isMobile = !screens.md;

    useGSAP(() => {
        // Photo slides in from left
        gsap.from('.process-photo', {
            scrollTrigger: {
                trigger: '.process-header',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            x: -60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
        });

        // Text slides in from right
        gsap.from('.process-heading', {
            scrollTrigger: {
                trigger: '.process-header',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            x: 60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
        });

        // Step cards stagger up
        gsap.from('.process-step-card', {
            scrollTrigger: {
                trigger: '.process-steps',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            style={{
                background: '#ffffff',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isMobile ? 48 : 80,
                padding: isMobile ? '60px 24px 80px' : '120px',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* ── Header: photo + title ─────────────────────── */}
            <div
                className="process-header"
                style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 32 : 64,
                    alignItems: isMobile ? 'flex-start' : 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: 960,
                }}
            >
                {/* Photo */}
                <div
                    className="process-photo"
                    style={{
                        width: isMobile ? '100%' : 411,
                        height: 264,
                        borderRadius: 8,
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={PROCESS_IMAGE}
                        alt="Additiv3 manufacturing process"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </div>

                {/* Text */}
                <div
                    className="process-heading"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 32,
                        flex: 1,
                        textAlign: isMobile ? 'left' : 'right',
                    }}
                >
                    <p
                        style={{
                            fontSize: isMobile ? 36 : 64,
                            fontWeight: 600,
                            lineHeight: 1,
                            letterSpacing: '0.64px',
                            color: 'var(--color-text-primary)',
                            margin: 0,
                        }}
                    >
                        How We Bring Ideas to Life.
                    </p>
                    <p
                        style={{
                            fontSize: 16,
                            lineHeight: 1.2,
                            letterSpacing: '0.16px',
                            color: '#898989',
                            margin: 0,
                        }}
                    >
                        A simple and efficient process designed to move projects from concept to delivered parts with clarity and speed.
                    </p>
                </div>
            </div>

            {/* ── Step cards ───────────────────────────────── */}
            <div
                className="process-steps"
                style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile
                        ? '1fr'
                        : screens.lg
                            ? 'repeat(4, 1fr)'
                            : 'repeat(2, 1fr)',
                    gap: 12,
                    width: '100%',
                    maxWidth: 960,
                }}
            >
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="process-step-card"
                        style={{
                            background: '#ffffff',
                            border: '1px solid #d9d9d9',
                            borderRadius: 12,
                            padding: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24,
                        }}
                    >
                        {/* Step number */}
                        <span
                            style={{
                                fontSize: 64,
                                fontWeight: 600,
                                lineHeight: 1,
                                letterSpacing: '0.64px',
                                color: '#0014e6',
                                display: 'block',
                            }}
                        >
                            {step.number}
                        </span>

                        {/* Title + description */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div style={{ borderBottom: '1px solid #d9d9d9', paddingBottom: 24 }}>
                                <span
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 500,
                                        lineHeight: '28px',
                                        letterSpacing: '-0.45px',
                                        color: '#0f172b',
                                        display: 'block',
                                    }}
                                >
                                    {step.title}
                                </span>
                            </div>
                            <p
                                style={{
                                    fontSize: 16,
                                    lineHeight: 1.2,
                                    letterSpacing: '0.16px',
                                    color: '#898989',
                                    margin: 0,
                                }}
                            >
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProcessSection;
