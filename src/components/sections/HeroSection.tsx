'use client';

import Image from 'next/image';

import React, { useRef } from 'react';
import { Button, Col, Row, Typography, Space, Grid } from 'antd';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText, ScrollTrigger } from 'gsap/all';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

gsap.registerPlugin(SplitText, ScrollTrigger);

interface HeroSectionProps {
    onStartProjectClick?: () => void;
    onViewCapabilitiesClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartProjectClick, onViewCapabilitiesClick }) => {
    const screens = useBreakpoint();
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // --- SETUP INTRO ---
        const childSplitChars = new SplitText(".anim-chars", { type: "chars" });
        const childSplitLines = new SplitText(".anim-lines", { type: "lines" });
        const tl = gsap.timeline();

        tl.from(childSplitChars.chars, { x: 100, opacity: 0, duration: 1, ease: "power4.out", stagger: 0.03 });
        tl.from(".anim-dash", { opacity: 0, duration: 0.5 }, "-=0.8");
        tl.from(childSplitLines.lines, { rotationX: -90, opacity: 0, transformOrigin: "50% 50% -50px", duration: 1, ease: "power3.out", stagger: 0.15 }, "-=0.6");
        tl.from(".hero-content-fade", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.8");


        // --- 2. SCROLL EXIT ANIMATION (DÙNG MATCH MEDIA) ---
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.to(contentRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                },
                y: -150,
                opacity: 0,
                scale: 0.95,
                filter: "blur(10px)",
                ease: "none"
            });
        });

        // B.MOBILE (Màn hình <= 767px)
        mm.add("(max-width: 767px)", () => {
            gsap.to(contentRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "40% top",
                    end: "bottom center",
                    scrub: true,
                },
                y: -50,
                opacity: 0,
                scale: 0.98,
                filter: "blur(3px)",
                ease: "none"
            });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px', position: 'relative' }}>
            {/* Bao bọc toàn bộ nội dung trong div này để áp dụng hiệu ứng Fade khi scroll */}
            <div ref={contentRef}>
                <Row gutter={[64, 48]} align="middle">

                    {/* TEXT COLUMN */}
                    <Col xs={24} md={12} style={{ textAlign: 'left' }}>

                        {/* H1 Semantic SEO */}
                        <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                            Additiv3 — Where Ideas Become Real Things.
                        </h1>

                        <div
                            style={{
                                margin: 0,
                                lineHeight: 1.1,
                                fontSize: 'clamp(2rem, 5vw, 4rem)',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-inter)',
                                marginBottom: 24
                            }}
                            aria-hidden="true"
                        >
                            <span style={{ fontSize: '1.3em', display: 'block', marginBottom: 8 }}>
                            </span>
                            <div style={{ perspective: '500px' }}>
                                <div className="anim-lines">
                                    Where Ideas Become <br /> <span style={{ color: '#0013DE' }}>Real Things.</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-content-fade">
                            <Paragraph style={{ fontSize: '1.1rem', color: '#898989', marginTop: 24, maxWidth: 480, marginInline: '0' }}>
                                High quality 3D manufacturing for teams that need functional parts,
                                fast turnaround, and engineering grade materials with consistency they can trust.
                            </Paragraph>

                            <Space size="middle" wrap style={{ marginTop: 24, justifyContent: 'start', width: '100%' }}>
                                <Button size="large" onClick={onViewCapabilitiesClick}>
                                    View Capabilities
                                </Button>
                                <Button type="primary" size="large" onClick={onStartProjectClick}>
                                    Start your Project
                                </Button>
                            </Space>
                        </div>
                    </Col>


                    {/* IMAGE COLUMN */}
                    <Col xs={24} md={12}>
                        <div className="hero-content-fade" style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image
                                src="/cover/LinkedIn cover.png"
                                alt="Additiv3 Hero Cover"
                                width={800}
                                height={450}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 4,
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </Col>

                </Row>
            </div>
        </section>
    );
};

export default HeroSection;