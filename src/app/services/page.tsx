'use client';

import React, { useState } from 'react';
import { Typography, Row, Col, Space, Divider, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import FinalCTASection from '@/components/sections/FinalCTASection';
import ContactModal from '@/components/sections/ContactSection';
import FAQModal from '@/components/sections/FAQSection';

const { Title, Paragraph, Text } = Typography;

export default function ServicesPage() {
    const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const openContact = () => setIsContactModalOpen(true);

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <MainHeader
                onFAQClick={() => setIsFAQModalOpen(true)}
                onContactClick={openContact}
                onStartProjectClick={openContact}
                onServicesClick={() => { }} // Already on Services page
            />

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 100px' }}>

                {/* --- FDM SECTION --- */}
                <section style={{ marginBottom: 120 }}>
                    <Title level={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40, textAlign: 'center', fontWeight: 600 }}>
                        FDM (Fused Deposition Modeling)
                    </Title>

                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Row gutter={[48, 48]}>
                            <Col xs={24} md={24}>
                                <Title level={4}>What it is</Title>
                                <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                                    Fused Deposition Modeling is an additive manufacturing process where thermoplastic filament is melted and pushed through an extruder nozzle, building parts layer by layer according to a computer model.
                                </Paragraph>

                                <Title level={4} style={{ marginTop: 32 }}>What it is usually used for</Title>
                                <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                                    Functional prototyping, mechanical parts, enclosures, brackets, jigs and fixtures, housings, and low-mid volume production parts where strength, heat resistance, or chemical resistance are required.
                                </Paragraph>
                            </Col>

                            <Col xs={24} md={24}>
                                <div style={{ borderTop: '2px solid #0013DE', paddingTop: 16 }}>
                                    <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                                        <Title level={4} style={{ margin: 0 }}>Available materials</Title>
                                        <div style={{ width: 20, height: 2, background: '#0013DE' }}></div>
                                    </Flex>
                                    <Paragraph type="secondary">
                                        PLA, basic prototyping, aesthetic parts, architectural models. PETG, printing
                                        Functional, durable parts. Properties covering electrical specifications, specialized
                                        conductive, or high strength cosmetic applications. Nylon, reinforced
                                        nylon, and carbon fiber.
                                    </Paragraph>
                                </div>

                                <div style={{ borderTop: '1px solid #e6e6e6', paddingTop: 16, marginTop: 32 }}>
                                    <Title level={4} style={{ fontSize: '1.1rem' }}>Maximum print volume</Title>
                                    <Text type="secondary">Up to 300 x 300 x 300 mm per part</Text>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>


                {/* --- SLA SECTION --- */}
                <section style={{ marginBottom: 120 }}>
                    <Title level={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40, textAlign: 'center', fontWeight: 600 }}>
                        SLA (Stereolithography)
                    </Title>

                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Row gutter={[48, 48]}>
                            <Col xs={24} md={24}>
                                <Title level={4}>What it is</Title>
                                <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                                    SLA (Stereolithography) is an additive manufacturing process that uses a controlled light source to solidify liquid photopolymer resin into a hard plastic part, offering high detail, smooth surface finish, and tight tolerances.
                                </Paragraph>

                                <Title level={4} style={{ marginTop: 32 }}>What it is usually used for</Title>
                                <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                                    High detail prototyping, presentation models, casting masters, small intricate components,
                                    and parts requiring fine features and molds, dental or medical models.
                                </Paragraph>
                            </Col>

                            <Col xs={24} md={24}>
                                <div style={{ borderTop: '2px solid #0013DE', paddingTop: 16 }}>
                                    <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                                        <Title level={4} style={{ margin: 0 }}>Available materials</Title>
                                        <div style={{ width: 20, height: 2, background: '#0013DE' }}></div>
                                    </Flex>
                                    <Paragraph type="secondary">
                                        Wide variety of <Text strong style={{ color: '#0013DE' }}>standard</Text> resins for general purpose, tough resin for strength,
                                        and clear resin for transparency.
                                        <br /><br />
                                        We also offer resins requiring specific mechanical, thermal, or chemical properties. Custom or
                                        specialty resins are available upon request—just let us know your application and we can
                                        suggest appropriate materials or source specific resin for your application requirements.
                                    </Paragraph>
                                </div>

                                <div style={{ borderTop: '1px solid #e6e6e6', paddingTop: 16, marginTop: 32 }}>
                                    <Title level={4} style={{ fontSize: '1.1rem' }}>Maximum print volume</Title>
                                    <Text type="secondary">192 x 120 x 245 mm per part</Text>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* --- HEAT SET SECTION --- */}
                <section style={{ marginBottom: 120 }}>
                    <Title level={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40, textAlign: 'center', fontWeight: 600 }}>
                        Heat Set Inserts Installation
                    </Title>

                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Row gutter={[48, 48]}>
                            <Col xs={24} md={24}>
                                <Title level={4}>What it is</Title>
                                <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                                    Heat set inserts involve installing threaded brass inserts into printed parts using heat and pressure
                                    to melt local plastic and create a permanent bond, allowing for reliable threaded connections.
                                </Paragraph>

                                <Title level={4} style={{ marginTop: 32 }}>Why use heat set inserts?</Title>
                                <Flex vertical gap="middle">
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary">Increased convenience for assembly and disassembly</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary">Use of fasteners without damaging mounting strength</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary">Clean, professional, and repeatable assemblies</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary">Improved load capability compared to printed threads</Text>
                                    </Flex>
                                </Flex>
                            </Col>
                            <Col xs={24} md={24}>
                                <Title level={4} style={{ fontSize: '24px', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.45px' }}>
                                    We install inserts during post processing to ensure proper alignment, consistency, and long term durability.
                                </Title>
                            </Col>
                        </Row>
                    </div>
                </section>


                {/* --- DESIGN SECTION --- */}
                <section>
                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Title level={1} style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', marginBottom: 20, textAlign: 'left', fontWeight: 600 }}>
                            Design
                        </Title>
                        <Paragraph type="secondary" style={{ fontSize: '1.1rem', maxWidth: 600, marginBottom: 40 }}>
                            We design consumer products, industrial parts, and functional mechanisms ourselves.
                            We support projects from early concept through product already
                            designed, with a focus on DFM (Design For Manufacturing) practices.
                        </Paragraph>

                        <Row gutter={[48, 48]}>
                            <Col xs={24} md={24}>
                                <Title level={4} style={{ marginBottom: 24 }}>Design capabilities</Title>
                                <Flex vertical gap="middle">
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary">Dedicated additive manufacturing (DFM)</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary">Part optimization for strength, printability and cost</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary">Assembly planning and refinement</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary">3D modeling for production and aesthetic</Text>
                                    </Flex>
                                </Flex>
                            </Col>

                            <Col xs={24} md={24}>
                                <Title level={4} style={{ fontSize: '24px', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.45px' }}>
                                    Whether you need a conceptual mock up, existing part improved, or a design optimized for FDM or SLA production, we work closely with you to deliver functional and manufacturing ready files.
                                </Title>
                            </Col>
                        </Row>
                    </div>
                </section>
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
