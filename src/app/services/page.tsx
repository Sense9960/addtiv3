'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
                <section id="fdm" style={{ marginBottom: 120, scrollMarginTop: '100px' }}>
                    <Title level={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40, textAlign: 'center', fontWeight: 600 }}>
                        FDM (Fused Deposition Modeling)
                    </Title>

                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Row gutter={[48, 48]}>
                            <Col xs={24} md={24}>
                                <Title level={4} style={{ fontSize: 20 }}>What it is</Title>
                                <Paragraph type="secondary" style={{ fontSize: 16 }}>
                                    FDM (Fused Deposition Modeling) is an additive manufacturing process where thermoplastic filament is melted and precisely deposited through a heated nozzle, forming parts layer by layer directly from a digital model.
                                </Paragraph>

                                <Title level={4} style={{ marginTop: 32, fontSize: 20 }}>What it is usually used for</Title>
                                <Paragraph type="secondary" style={{ fontSize: 16 }}>
                                    Functional prototyping, mechanical parts, enclosures, brackets, jigs and fixtures, housings, and low to mid volume production parts where strength, heat resistance, or chemical resistance are required.
                                </Paragraph>
                            </Col>

                            <Col xs={24} md={24}>
                                <div style={{ borderTop: '2px solid #e6e6e6', paddingTop: 16 }}>
                                    <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                                        <Title level={4} style={{ margin: 0, fontSize: 20 }}>Available materials</Title>
                                        <div style={{ width: 20, height: 2, background: '#0013DE' }}></div>
                                    </Flex>
                                    <Paragraph type="secondary" style={{ fontSize: 16 }}>
                                        We offer a range of engineering and general purpose materials for FDM printing.
                                    </Paragraph>
                                    <Paragraph type="secondary" style={{ fontSize: 16 }}>
                                        For detailed material properties, advantages, and technical specifications, please visit our <Link href="/materials" style={{ color: '#0013DE', textDecoration: 'underline' }}>Materials</Link> page. If you do not see a material listed that fits your application, feel free to inquire about specific materials.
                                    </Paragraph>
                                </div>

                                <div style={{ borderTop: '1px solid #e6e6e6', paddingTop: 16, marginTop: 32 }}>
                                    <Title level={4} style={{ fontSize: 20 }}>Maximum print volume</Title>
                                    <Text type="secondary" style={{ fontSize: 16 }}>Up to 258 x 258 x 240 mm per part.</Text>
                                </div>
                                <div style={{ borderTop: '1px solid #e6e6e6', paddingTop: 16, marginTop: 32 }}></div>
                            </Col>
                        </Row>
                    </div>
                </section>


                {/* --- SLA SECTION --- */}
                <section id="sla" style={{ marginBottom: 120, scrollMarginTop: '100px' }}>
                    <Title level={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40, textAlign: 'center', fontWeight: 600 }}>
                        SLA (Stereolithography)
                    </Title>

                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Row gutter={[48, 48]}>
                            <Col xs={24} md={24}>
                                <Title level={4} style={{ fontSize: 20 }}>What it is</Title>
                                <Paragraph type="secondary" style={{ fontSize: 16 }}>
                                    SLA (Stereolithography) is an additive manufacturing process that uses a controlled light source to selectively cure liquid photopolymer resin into solid geometry, building parts layer by layer with high dimensional accuracy.
                                </Paragraph>

                                <Title level={4} style={{ marginTop: 32, fontSize: 20 }}>What it is usually used for</Title>
                                <Paragraph type="secondary" style={{ fontSize: 16 }}>
                                    High detail prototypes, cosmetic models, snap fit testing, small enclosures, fluidic components, and parts requiring fine features, thin walls, or smooth surface finishes.
                                </Paragraph>
                            </Col>

                            <Col xs={24} md={24}>
                                <div style={{ borderTop: '2px solid #e6e6e6', paddingTop: 16 }}>
                                    <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                                        <Title level={4} style={{ margin: 0, fontSize: 20 }}>Available materials</Title>
                                        <div style={{ width: 20, height: 2, background: '#0013DE' }}></div>
                                    </Flex>
                                    <Paragraph type="secondary" style={{ fontSize: 16 }}>
                                        We currently offer <Text underline style={{ color: '#0013DE' }}>Formlabs general purpose resins</Text> , selected for their reliability, surface quality, and dimensional accuracy.
                                        <br /><br />
                                        For applications requiring specific mechanical, thermal, or chemical properties, customers may inquire about additional Formlabs resins that are more suitable for their needs. We are happy to help evaluate material options based on your application requirements.
                                    </Paragraph>
                                </div>

                                <div style={{ borderTop: '1px solid #e6e6e6', paddingTop: 16, marginTop: 32 }}>
                                    <Title level={4} style={{ fontSize: 20 }}>Maximum print volume</Title>
                                    <Text type="secondary" style={{ fontSize: 16 }}>Up to 200 x 125 x 210 mm per part.</Text>
                                </div>
                                <div style={{ borderTop: '1px solid #e6e6e6', paddingTop: 16, marginTop: 32 }}></div>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* --- HEAT SET SECTION --- */}
                <section id="heat-set" style={{ marginBottom: 120, scrollMarginTop: '100px' }}>
                    <Title level={1} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 40, textAlign: 'center', fontWeight: 600 }}>
                        Heat Set Inserts Installation
                    </Title>

                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Row gutter={[48, 48]}>
                            <Col xs={24} md={24}>
                                <Title level={4}>What it is</Title>
                                <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
                                    Heat set inserts provide strong, reliable metal threads in 3D printed plastic parts. Inserts are installed using controlled heat, allowing the plastic to flow around the insert for a secure bond.
                                </Paragraph>

                                <Title level={4} style={{ marginTop: 32, fontSize: 20 }}>Why use heat set inserts?</Title>
                                <Flex vertical gap="middle">
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary" style={{ fontSize: 16 }}>Increased convenience for assembly and disassembly</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary" style={{ fontSize: 16 }}>Reusable threads without reducing mounting strength</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary" style={{ fontSize: 16 }}>Clean, professional, and repeatable assemblies</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary" style={{ fontSize: 16 }}>Improved load capacity compared to printed threads</Text>
                                    </Flex>
                                </Flex>
                            </Col>
                            <Col xs={24} md={24}>
                                <Title level={4} style={{ fontSize: 20, fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.45px' }}>
                                    We install inserts during post processing to ensure proper alignment, consistency, and long term durability.
                                </Title>
                            </Col>
                        </Row>
                    </div>
                </section>


                {/* --- DESIGN SECTION --- */}
                <section id="design" style={{ scrollMarginTop: '100px' }}>
                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Title level={1} style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', marginBottom: 20, textAlign: 'left', fontWeight: 600 }}>
                            Design
                        </Title>
                        <Paragraph type="secondary" style={{ fontSize: 16, maxWidth: 600, marginBottom: 40 }}>
                            Our design services help turn ideas into manufacturable, reliable parts.
                            We support projects from early concept through production ready designs,
                            with a focus on additive manufacturing best practices.
                        </Paragraph>

                        <Row gutter={[48, 48]}>
                            <Col xs={24} md={24}>
                                <Title level={4} style={{ marginBottom: 24, fontSize: 20 }}>Design capabilities</Title>
                                <Flex vertical gap="middle">
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary" style={{ fontSize: 16 }}>Design for additive manufacturing (DFAM)</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary" style={{ fontSize: 16 }}>Part optimization for strength, printability, and cost</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary" style={{ fontSize: 16 }}>Iterative prototyping and refinement</Text>
                                    </Flex>
                                    <Flex gap="middle">
                                        <PlusOutlined style={{ color: '#0013DE' }} />
                                        <Text type="secondary" style={{ fontSize: 16 }}>Design validation for production and assembly</Text>
                                    </Flex>
                                </Flex>
                            </Col>

                            <Col xs={24} md={24}>
                                <Title level={4} style={{ fontSize: '20px', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.45px' }}>
                                    Whether you need a concept refined, an existing part improved,
                                    or a design optimized for FDM or SLA production, we work closely with you to deliver
                                    functional and manufacturable results.
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
