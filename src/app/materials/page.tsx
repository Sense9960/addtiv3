'use client';

import React, { useState, useMemo } from 'react';
import { Typography, Row, Col, Space, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import FinalCTASection from '@/components/sections/FinalCTASection';
import ContactModal from '@/components/sections/ContactSection';
import FAQModal from '@/components/sections/FAQSection';
import FilterSidebar from '@/components/materials/FilterSidebar';
import MaterialCard from '@/components/materials/MaterialCard';
import { materials } from '@/data/materials';

const { Title, Paragraph } = Typography;

export default function MaterialsPage() {
    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProcesses, setSelectedProcesses] = useState<string[]>(['FDM', 'SLA']);

    const openContact = () => setIsContactModalOpen(true);

    const filteredMaterials = useMemo(() => {
        return materials.filter(material => {
            const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesProcess = selectedProcesses.length === 0 || selectedProcesses.includes(material.process);
            return matchesSearch && matchesProcess;
        });
    }, [searchTerm, selectedProcesses]);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <MainHeader
                onFAQClick={() => setIsFAQModalOpen(true)}
                onContactClick={openContact}
                onStartProjectClick={openContact}
                onServicesClick={() => { }} // Should allow navigation if already on other page, but this prop might need refactor if it's strictly for scrolling. For now, we'll leave it.
            />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 100px' }}>
                <Title level={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 60, textAlign: 'center', fontWeight: 600 }}>
                    Compare Materials
                </Title>

                <Row gutter={[48, 48]}>
                    {/* Sidebar */}
                    <Col xs={24} md={6} lg={5}>
                        <FilterSidebar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            selectedProcesses={selectedProcesses}
                            onProcessChange={setSelectedProcesses}
                        />
                    </Col>

                    {/* Main Content */}
                    <Col xs={24} md={18} lg={19}>
                        {filteredMaterials.map(material => (
                            <MaterialCard key={material.id} material={material} />
                        ))}

                        {filteredMaterials.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <Paragraph type="secondary">No materials found matching your filters.</Paragraph>
                            </div>
                        )}

                        <div style={{ marginTop: 60 }}>
                            <Title level={4}>Don't see a material listed?</Title>
                            <Paragraph type="secondary" style={{ maxWidth: 800 }}>
                                If you do not see a material listed that fits your application, feel free to reach out. We regularly work with customers to identify the most appropriate material for their design and performance requirements.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </div>

            <FinalCTASection onContactClick={openContact} />
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
