'use client';

import React, { useState } from 'react';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import Quote from '@/components/quote/Quote';
import FAQModal from '@/components/sections/FAQSection';
import ContactModal from '@/components/sections/ContactSection';

export default function QuotePage() {
    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <MainHeader
                onFAQClick={() => setIsFAQModalOpen(true)}
                onContactClick={() => setIsContactModalOpen(true)}
                onStartProjectClick={() => { }}
                onServicesClick={() => { }}
            />

            <Quote />

            <MainFooter />

            <FAQModal isOpen={isFAQModalOpen} onClose={() => setIsFAQModalOpen(false)} />
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </main>
    );
}
