'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
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
    onViewServicesClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartProjectClick, onViewServicesClick }) => {
    const router = useRouter();
    const screens = useBreakpoint();
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // --- SETUP INTRO ---
        // const childSplitChars = new SplitText(".anim-chars", { type: "chars" });
        // const childSplitLines = new SplitText(".anim-lines", { type: "lines" });
        const tl = gsap.timeline();

        // tl.from(childSplitChars.chars, { x: 100, opacity: 0, duration: 1, ease: "power4.out", stagger: 0.03 });
        tl.from(".anim-dash", { opacity: 0, duration: 0.5 }, "-=0.8");
        tl.from(".anim-lines .line", { rotationX: -90, opacity: 0, transformOrigin: "50% 50% -50px", duration: 1, ease: "power3.out", stagger: 0.15 }, "-=0.6");
        tl.from(".hero-content-fade", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.8");




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
                                fontSize: !screens.md ? '2.5rem' : 'clamp(3rem, 5vw, 5rem)',
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
                                    <div className="line">Where</div>
                                    <div className="line">Ideas</div>
                                    <div className="line">Become</div>
                                    <div className="line"><span style={{ color: '#0013DE' }}>Real Parts.</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-content-fade">
                            <Paragraph style={{ fontSize: '1.1rem', color: '#898989', marginTop: 24, maxWidth: 480, marginInline: '0' }}>
                                Fast, reliable additive manufacturing from prototype to production
                            </Paragraph>

                            <Space size="middle" wrap style={{ marginTop: 24, justifyContent: 'start', width: '100%' }}>
                                <Button size="large" onClick={() => router.push('/services')}>
                                    View Services
                                </Button>
                                <Button type="primary" size="large" onClick={onStartProjectClick} style={{ backgroundColor: '#0013DE', border: 'none', boxShadow: 'none' }}>
                                    Get a Quote!
                                </Button>
                            </Space>
                        </div>
                    </Col>


                    {/* ANIMATED TEXT COLUMN */}
                    <Col xs={24} md={12} style={{ alignSelf: screens.md ? 'flex-start' : 'auto', paddingTop: screens.md ? '120px' : '0' }}>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: !screens.md ? '12px' : '20px' }}>
                                <motion.div
                                    initial={{ opacity: 0, x: -14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.2 }}
                                >
                                    <Image
                                        src="/logo/avatarWB.png"
                                        alt="Additiv3 Logo"
                                        width={80}
                                        height={80}
                                        style={{ width: !screens.md ? '48px' : 'clamp(56px, 5vw, 80px)', height: 'auto' }}
                                    />
                                </motion.div>

                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    fontSize: !screens.md ? '2.5rem' : 'clamp(3rem, 5vw, 5rem)',
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    color: '#111',
                                    fontFamily: 'var(--font-inter)',
                                }}>
                                    {'Additiv3'.split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, x: -14 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + i * 0.08, duration: 0.13 }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>
            </div>
        </section>
    );
};

export default HeroSection;