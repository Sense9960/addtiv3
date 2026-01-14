'use client';

import React from 'react';
import { Row, Col, Typography, Flex, Grid } from 'antd'; // 1. Import Flex thay vì Space
import { LinkedinFilled, FacebookFilled, InstagramFilled, TikTokOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';
import Image from 'next/image';
const { useBreakpoint } = Grid;

const { Text, Link } = Typography;

const MainFooter: React.FC = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const footerLinks = {
        home: [
            { label: 'About Us', href: '#' },
            { label: 'Contact Us', href: '#' },
            { label: 'FAQ', href: '#' },
        ],
        services: [
            { label: 'Materials', href: '#' },
            { label: 'Process', href: '#' },
            { label: 'Get a Quote', href: '#' },
        ],
        followUs: [
            { label: 'Materials', href: '#' },
            { label: 'Process', href: '#' },
            { label: 'Get a Quote', href: '#' },
        ]
    };

    const linkStyle = { color: '#888', fontSize: '16px', display: 'block', marginBottom: '8px' };
    const titleStyle = { fontSize: '18px', fontWeight: 600, marginBottom: '24px' };

    return (
        <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #f0f0f0', padding: '80px 24px 24px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <Row justify="space-between" gutter={[32, 48]}>

                    {/* Left Column: Brand */}
                    <Col xs={24} md={8} lg={6}>
                        <div style={{ marginBottom: 24 }}>
                            {/* Assuming the image contains both logo and text or just logo. Adjust as needed. */}
                            <Image src="/logo/avatarWB.png" alt="Additiv3" width={48} height={48} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 12 }} />
                            <span style={{ fontSize: '32px', fontWeight: 600, verticalAlign: 'middle', fontFamily: 'var(--font-inter)' }}>Additiv3</span>
                        </div>
                        <Text style={{ fontSize: '18px', color: '#888', maxWidth: '300px', display: 'block', lineHeight: 1.5 }}>
                            Bringing your ideas to life<br />with precision 3D<br />manufacturing.
                        </Text>
                    </Col>

                    {/* Links Columns */}
                    <Col xs={24} md={16} lg={10}>
                        <Row gutter={[8, 8]}>
                            <Col xs={12} sm={8}>
                                <div style={titleStyle}>Home</div>
                                <Flex vertical gap={8}>
                                    {footerLinks.home.map((link, index) => (
                                        <Link key={index} href={link.href} style={linkStyle}>{link.label}</Link>
                                    ))}
                                </Flex>
                            </Col>
                            <Col xs={12} sm={8}>
                                <div style={titleStyle}>Services</div>
                                <Flex vertical gap={8}>
                                    {footerLinks.services.map((link, index) => (
                                        <Link key={index} href={link.href} style={linkStyle}>{link.label}</Link>
                                    ))}
                                </Flex>
                            </Col>
                            <Col xs={12} sm={8}>
                                <div style={titleStyle}>Follow Us</div>
                                <Flex gap={16}>
                                    <Link href="https://www.linkedin.com/company/additiv3" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '24px' }}><LinkedinOutlined /></Link>
                                    <Link href="https://www.tiktok.com/@additiv3usa" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '24px' }}><TikTokOutlined /></Link>
                                    <Link href="https://www.instagram.com/additiv3usa/" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '24px' }}><InstagramOutlined /></Link>
                                </Flex>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Bottom Bar */}
                <div style={{ marginTop: 80, borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
                    <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            © {new Date().getFullYear()} Additiv3 Inc. All rights reserved.
                        </Text>
                        <Flex gap={24}>
                            <Link href="#" style={{ color: '#888', fontSize: 14 }}>Terms & Conditions</Link>
                            <Link href="#" style={{ color: '#888', fontSize: 14 }}>Privacy Policy</Link>
                        </Flex>
                    </Flex>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;