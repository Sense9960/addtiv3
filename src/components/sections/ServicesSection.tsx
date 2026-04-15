'use client';

import React, { useRef } from 'react';
import { Grid } from 'antd';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import RapidIcon from '../../../public/icon/Rapid.svg';
import SmallBatchIcon from '../../../public/icon/SmallBatch.svg';
import EngineeringGradeIcon from '../../../public/icon/EngineeringGrade.svg';
import InstallationAndFinishingIcon from '../../../public/icon/InstallationAndFinishing.svg';
import DesignSupportIcon from '../../../public/icon/DesignSupport.svg';

gsap.registerPlugin(ScrollTrigger);

const { useBreakpoint } = Grid;

const HERO_IMAGE = '/logo/8.png';

const services = [
    {
        icon: RapidIcon,
        title: 'Rapid Prototyping',
        desc: 'Fast turnaround for functional testing and iterative development.',
    },
    {
        icon: SmallBatchIcon,
        title: 'Small Batch Manufacturing',
        desc: 'Low to moderate volume production with repeatable quality.',
    },
    {
        icon: EngineeringGradeIcon,
        title: 'Engineering Grade Materials',
        desc: 'Diverse material selection for a broad range of applications.',
    },
    {
        icon: InstallationAndFinishingIcon,
        title: 'Heat Set Insert Installation',
        desc: 'Heat set inserts installed for ease of assembly.',
    },
    {
        icon: DesignSupportIcon,
        title: 'Design Support',
        desc: 'Light design services for manufacturability and part readiness.',
    },
];

const ServiceCard: React.FC<{ item: typeof services[0]; isMobile: boolean }> = ({ item, isMobile }) => (
       <div
        style={{
            width: isMobile ? 'calc(80vw)' : 320,
            height: isMobile ? 'auto' : 320,
            minHeight: isMobile ? 260 : 320,
            flexShrink: 0,
            background: '#ffffff',
            border: '1px solid #d9d9d9',
            borderRadius: 12,
            padding: 24,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            scrollSnapAlign: 'start',
        }}
    >
        <div style={{ width: 48, height: 48, flexShrink: 0 }}>
            <Image
                src={item.icon}
                alt={item.title}
                width={48}
                height={48}
                style={{ width: 48, height: 48 }}
            />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ borderBottom: '1px solid #d9d9d9', paddingBottom: 16 }}>
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
                    {item.title}
                </span>
            </div>
            <p
                style={{
                    fontSize: 14,
                    lineHeight: 1.4,
                    letterSpacing: '0.16px',
                    color: '#898989',
                    margin: 0,
                }}
            >
                {item.desc}
            </p>
        </div>
    </div>
);

const ServicesSection: React.FC = () => {
    const screens = useBreakpoint();
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const sliderContainerRef = useRef<HTMLDivElement>(null);

    const isMobile = !screens.md;

    useGSAP(() => {
        // Header entrance animation
        gsap.from('.service-header-anim', {
            scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
        });

        // Horizontal pin scroll — desktop only
        const slider = sliderContainerRef.current;
        if (!slider || window.innerWidth < 768) return;

        const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

        gsap.to(slider, {
            x: () => getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 0.5,
                start: 'top top',
                end: '+=200',
                invalidateOnRefresh: true,
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            style={{
                padding: isMobile ? '48px 0 48px' : '40px 0 40px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* ── HEADER ───────────────────────────────────────────── */}
            <div
                ref={headerRef}
                style={{
                    maxWidth: 1280,
                    margin: '0 auto',
                    padding: '0 24px',
                    width: '100%',
                    marginBottom: isMobile ? 40 : 60,
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'flex-start',
                        gap: isMobile ? 24 : 64,
                    }}
                >
                    {/* Title + subtitle */}
                    <div
                        className="service-header-anim"
                        style={{
                            flex: isMobile ? '0 0 auto' : '0 0 485px',
                            maxWidth: isMobile ? '100%' : 485,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24,
                        }}
                    >
                        <p
                            style={{
                                fontSize: isMobile ? 32 : 64,
                                fontWeight: 600,
                                lineHeight: 1,
                                letterSpacing: '0.64px',
                                color: 'var(--color-text-primary)',
                                margin: 0,
                            }}
                        >
                            Manufacturing Built for Real World Use.
                        </p>
                        <p
                            style={{
                                fontSize: 16,
                                lineHeight: 1.4,
                                letterSpacing: '0.16px',
                                color: '#898989',
                                margin: 0,
                            }}
                        >
                            We support hardware startups, R&amp;D teams, students, and everyday
                            problem solvers who need reliable manufacturing partners.
                        </p>
                    </div>

                    {/* Photo */}
                    <div
                        className="service-header-anim"
                        style={{
                            width: isMobile ? '100%' : 411,
                            height: isMobile ? 200 : 264,
                            borderRadius: 8,
                            overflow: 'hidden',
                            flexShrink: 0,
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={HERO_IMAGE}
                            alt="Additiv3 manufacturing facility"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                </div>
            </div>

            {/* ── CARDS ────────────────────────────────────────────── */}
            <div
                ref={sliderContainerRef}
                style={{
                    display: 'flex',
                    gap: isMobile ? 12 : 20,
                    ...(isMobile ? {
                        paddingLeft: 24,
                        paddingRight: 24,
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                    } : {
                        paddingLeft: 'max(24px, (100vw - 1280px) / 2)',
                        paddingRight: 48,
                        width: 'max-content',
                        alignItems: 'stretch',
                    }),
                }}
            >
                {services.map((item, index) => (
                    <ServiceCard key={index} item={item} isMobile={isMobile} />
                ))}
                {isMobile && <div style={{ flexShrink: 0, width: 24 }} />}
            </div>
        </section>
    );
};

export default ServicesSection;