'use client';
import React from 'react';
import Image from 'next/image';
import { Grid } from 'antd';

const trustCards = [
    { icon: '/trusted_icon/Lightbulb.svg', title: 'Hardware Startups' },
    { icon: '/trusted_icon/Board.svg', title: 'R&D Teams' },
    { icon: '/trusted_icon/Student.svg', title: 'Students' },
    { icon: '/trusted_icon/Person.svg', title: 'Problem Solvers' },
];

const TrustSection: React.FC = () => {
    const screens = Grid.useBreakpoint();
    const isMobile = !screens.md;

    return (
        <section style={{
            background: '#ffffff',
            borderBottom: '1px solid #f0f0f0',
            padding: isMobile ? '60px 24px 80px' : '120px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? 48 : 64,
        }}>
            {/* Centered header */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
            }}>
                <p style={{
                    fontSize: isMobile ? 36 : 64,
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: '0.64px',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                    width: '100%',
                }}>
                    Trusted by Builders,<br />Engineers, & Creators.
                </p>
                <p style={{
                    fontSize: 16,
                    lineHeight: 1.2,
                    letterSpacing: '0.16px',
                    color: '#898989',
                    margin: 0,
                    maxWidth: 700,
                }}>
                    We support hardware startups, R&D teams, students, and everyday
                    problem solvers who need reliable manufacturing partners.
                </p>
            </div>

            {/* Cards */}
            <div style={{
                display: 'flex',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                gap: 12,
                width: '100%',
                maxWidth: 1040,
            }}>
                {trustCards.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            flex: isMobile ? '0 0 calc(50% - 6px)' : '1 1 0',
                            minWidth: 0,
                            height: isMobile ? 'auto' : 240,
                            minHeight: isMobile ? 200 : 240,
                            background: '#ffffff',
                            border: '1px solid #d9d9d9',
                            borderRadius: 12,
                            padding: 24,
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Image
                            src={item.icon}
                            alt={item.title}
                            width={48}
                            height={48}
                            style={{ width: 48, height: 48 }}
                        />
                        <p style={{
                            fontSize: 20,
                            fontWeight: 400,
                            lineHeight: 1,
                            letterSpacing: '0.2px',
                            color: '#000',
                            margin: 0,
                        }}>
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustSection;
