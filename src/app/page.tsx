'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainHeader from '@/components/layout/MainHeader';
import HeroSection from '@/components/sections/HeroSection';
import TrustSection from '@/components/sections/TrustSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import MaterialsSection from '@/components/sections/MaterialsSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import ContactModal from '@/components/sections/ContactSection';
import MainFooter from '@/components/layout/MainFooter';
import FAQModal from '@/components/sections/FAQSection'; // Import from the renamed modal file

export default function Home() {
  const router = useRouter();
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <MainHeader
        onFAQClick={() => setIsFAQModalOpen(true)}
        onContactClick={() => setIsContactModalOpen(true)}
        onStartProjectClick={() => router.push('/quote')}
        onServicesClick={() => scrollToSection('services')}
      />

      <div id="hero">
        <HeroSection
          onStartProjectClick={() => router.push('/quote')}
        />
      </div>

      <div id="trust">
        <TrustSection />
      </div>

      <div id="services">
        <ServicesSection />
      </div>

      <div id="process">
        <ProcessSection />
      </div>

      <div id="cta">
        <FinalCTASection />
      </div>

      <MainFooter />

      <FAQModal
        isOpen={isFAQModalOpen}
        onClose={() => setIsFAQModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}