'use client';

import React, { useState } from 'react';
import { Grid } from 'antd';
import { useRouter } from 'next/navigation';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import FAQModal from '@/components/sections/FAQSection';
import ContactModal from '@/components/sections/ContactSection';

const { useBreakpoint } = Grid;

export default function QuoteSuccessPage() {
    const router = useRouter();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <MainHeader
                onFAQClick={() => setIsFAQModalOpen(true)}
                onContactClick={() => setIsContactModalOpen(true)}
                onStartProjectClick={() => router.push('/quote')}
                onServicesClick={() => router.push('/services')}
            />

            <section style={{
                background: '#ffffff',
                borderBottom: '1px solid #f0f0f0',
                padding: isMobile ? '80px 24px 80px' : '120px 24px',
                boxSizing: 'border-box',
            }}>
                <div style={{
                    maxWidth: 600,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 80,
                    alignItems: 'center',
                }}>
                    {/* Message */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%',
                    }}>
                        <p style={{
                            fontSize: isMobile ? 28 : 40,
                            fontWeight: 400,
                            lineHeight: 1,
                            letterSpacing: '0.4px',
                            color: '#000',
                            margin: 0,
                        }}>
                            Thanks! Your Quote Request Has Been Submitted
                        </p>
                        <p style={{
                            fontSize: 16,
                            lineHeight: 1.2,
                            letterSpacing: '0.16px',
                            color: '#898989',
                            margin: 0,
                        }}>
                            After submission, your files are reviewed for manufacturability, material
                            compatibility, and production requirements. A detailed quote with pricing
                            and estimated lead time will be provided within 1 to 2 business days.
                        </p>
                    </div>

                    {/* Back to Home button */}
                    <div style={{ width: '100%' }}>
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            style={{
                                width: '100%',
                                background: '#0014e6',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 12,
                                padding: '16px 32px',
                                fontSize: 16,
                                letterSpacing: '0.16px',
                                lineHeight: 1.2,
                                cursor: 'pointer',
                                textAlign: 'center',
                            }}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </section>

            <MainFooter />

            <FAQModal isOpen={isFAQModalOpen} onClose={() => setIsFAQModalOpen(false)} />
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </main>
    );
}
