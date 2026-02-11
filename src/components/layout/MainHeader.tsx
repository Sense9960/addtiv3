import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Flex, Space, Typography, Grid } from 'antd';
import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import MobileMenu from './MobileMenu';
import Link from 'next/link';

const { useBreakpoint } = Grid;

interface MainHeaderProps {
    onFAQClick?: () => void;
    onContactClick?: () => void;
    onStartProjectClick?: () => void;
    onServicesClick?: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ onFAQClick, onContactClick, onStartProjectClick, onServicesClick }) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const showDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const handleMenuClick = (action?: () => void) => {
        closeDrawer();
        if (action) action();
    };

    const menuItems = [
        { label: 'Services', onClick: () => handleMenuClick(() => window.location.href = '/services') },
        { label: 'Materials', onClick: () => handleMenuClick(() => window.location.href = '/materials') },
        { label: 'FAQ', onClick: () => handleMenuClick(onFAQClick) },
        { label: 'About Us', onClick: () => handleMenuClick() },
        { label: 'Contact us', onClick: () => handleMenuClick(onContactClick) },
        { label: 'Start your Project', onClick: () => handleMenuClick(onStartProjectClick), primary: true },
    ];

    const logoSrc = '/logo/avatarWB.png';

    return (
        <header style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: 'var(--background-color)', position: 'sticky', top: 0, zIndex: 1000, transition: 'background-color 0.3s ease' }}>
            <div style={{ maxWidth: 1280, height: '80px', margin: '0 auto', padding: '0 24px' }}>
                <Flex align="center" justify="space-between" style={{ height: '100%' }}>

                    {/* LEFT GROUP: Logo + Services + Materials + FAQ */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <Image src={logoSrc} alt="Additiv3 Logo" width={32} height={32} />
                                <Typography.Text strong style={{ fontSize: 'clamp(18px, 4vw, 22px)', whiteSpace: 'nowrap', color: 'var(--color-text-primary)', fontFamily: 'var(--font-svn-gilroy)' }}>
                                    Additiv3
                                </Typography.Text>
                            </div>
                        </Link>

                        {!isMobile && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link href="/services" style={{ textDecoration: 'none' }}>
                                    <Button type='text' style={{ fontSize: '16px', fontWeight: 500 }}>Services</Button>
                                </Link>
                                <Link href="/materials" style={{ textDecoration: 'none' }}>
                                    <Button type='text' style={{ fontSize: '16px', fontWeight: 500 }}>Materials</Button>
                                </Link>
                                <Button type="text" onClick={onFAQClick} style={{ fontSize: '16px', fontWeight: 500 }}>FAQ</Button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT GROUP: About Us + Contact + CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        {!isMobile && (
                            <>
                                <Button type='text' style={{ fontSize: '16px', fontWeight: 500 }}>About Us</Button>
                                <Button type="text" onClick={onContactClick} style={{ fontSize: '16px', fontWeight: 500 }}>Contact us</Button>
                            </>
                        )}

                        {isMobile ? (
                            <Space>
                                <Button type="text" icon={<MoonOutlined />} onClick={toggleTheme} />
                                <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
                            </Space>
                        ) : (
                            <Button type="primary" style={{
                                fontWeight: 600,
                                height: '44px',
                                padding: '0 24px',
                                borderRadius: '8px',
                                backgroundColor: '#0013DE',
                                border: 'none',
                                boxShadow: 'none',
                                fontSize: '16px'
                            }} onClick={onStartProjectClick}>
                                Start your Project
                            </Button>
                        )}
                    </div>

                </Flex>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <MobileMenu
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                menuItems={menuItems}
            />
        </header>
    );
};

export default MainHeader;