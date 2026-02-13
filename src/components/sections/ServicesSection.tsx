'use client';

import React, { useRef } from 'react';
import { Card, Typography, Grid } from 'antd';
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

const { Title, Paragraph } = Typography;

const services = [
    {
        icon: RapidIcon,
        title: 'Rapid Prototyping',
        desc: 'Fast turnaround for functional testing and iterative development.',
    },
    {
        icon: SmallBatchIcon,
        title: 'Small Batch Manufacturing',
        desc: 'Scaled production with repeatable quality across PLA, ABS, ASA, Nylon, PC, and more.',
    },
    {
        icon: EngineeringGradeIcon,
        title: 'Engineering Grade Materials',
        desc: 'Strength, durability, thermal resistance, and surface quality tuned for performance.',
    },
    {
        icon: InstallationAndFinishingIcon,
        title: 'Insert Installation and Finishing',
        desc: 'Heat-set insert placement with careful preparation for overall assembly process',
    },
    {
        icon: DesignSupportIcon,
        title: 'Design Support',
        desc: 'Light design services for manufacturability and part readiness.',
    },
];

const { useBreakpoint } = Grid;

const ServicesSection: React.FC = () => {
    const screens = useBreakpoint();
    const isTablet = screens.md && !screens.xl; // 768px - 1199px
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const sliderContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // --- 1. ANIMATION HEADER ---
        gsap.fromTo('.service-header-anim',
            {
                y: 50,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            }
        );

        // --- 2. ANIMATION HEADER EXIT ---
        gsap.to(headerRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                scrub: true,
                end: "+=200",
            },
            opacity: 0,
            y: -100,
            scale: 0.9,
            pointerEvents: 'none',
        });

        // --- 3. ANIMATION SLIDER ---
        const slider = sliderContainerRef.current;

        if (slider && headerRef.current) {
            const getScrollAmount = () => {
                let sliderWidth = slider.scrollWidth;
                let viewportWidth = window.innerWidth;

                return -(sliderWidth - viewportWidth);
            };

            gsap.to(slider, {
                x: () => getScrollAmount(),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: `+=${Math.abs(getScrollAmount())}`,
                    invalidateOnRefresh: true,
                }
            })
        };


    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} style={{ padding: '40px 0 40px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>

            {/* CONTAINER HEADER */}
            <div ref={headerRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', width: '100%', marginBottom: 60 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40 }}>

                    {/* TITLE */}
                    <div style={{ flex: '2 1 600px', opacity: 0 }} className="service-header-anim">
                        <Title level={2} className="text-black-force" style={{
                            fontSize: 'clamp(2rem, 4vw, 4rem)',
                            margin: 0,
                            lineHeight: 1.1,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            whiteSpace: 'pre-wrap'
                        }}>
                            {isTablet
                                ? <>Manufacturing Built for Real<br />World Use.</>
                                : <>Manufacturing <br />Built for <br />Real World Use.</>
                            }
                        </Title>
                    </div>

                    {/* PARAGRAPH */}
                    <div style={{ flex: '1 1 300px', opacity: 0 }} className="service-header-anim">
                        <Paragraph style={{
                            fontSize: '1.1rem',
                            color: '#595959',
                            margin: 0,
                            paddingBottom: 0
                        }}>
                            We support hardware startups, R and D teams,
                            small manufacturers, students, and everyday problem solvers who need reliable manufacturing partners.
                        </Paragraph>
                    </div>
                </div>
            </div>

            {/* CONTAINER CARDS */}
            <div
                ref={sliderContainerRef}
                style={{
                    display: 'flex',
                    gap: 24,
                    paddingLeft: 'max(24px, (100vw - 1280px) / 2)',
                    paddingRight: 48,
                    width: 'max-content',
                }}
            >
                {services.map((item, index) => (
                    <div key={index} style={{ width: 'min(400px, 85vw)', flexShrink: 0 }}>
                        <Card
                            variant="borderless"
                            style={{
                                height: '100%',
                                background: '#fafafa',
                                borderRadius: 16,
                                padding: '24px',
                                minHeight: '320px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                <div style={{ marginBottom: 32 }}>
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={64}
                                        height={64}
                                        style={{ width: 'auto', height: '64px' }}
                                    />
                                </div>
                                <Title level={4} style={{ marginBottom: 16, fontSize: '1.5rem' }}>{item.title}</Title>
                                <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                                    {item.desc}
                                </Paragraph>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;