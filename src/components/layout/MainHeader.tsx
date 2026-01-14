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
        { label: 'Services', onClick: () => handleMenuClick(onServicesClick) },
        { label: 'FAQ', onClick: () => handleMenuClick(onFAQClick) },
        { label: 'Contact us', onClick: () => handleMenuClick(onContactClick) },
        { label: 'Start your Project', onClick: () => handleMenuClick(onStartProjectClick), primary: true },
    ];

    const logoSrc = '/logo/avatarWB.png';

    return (
        <header style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: 'var(--background-color)', position: 'sticky', top: 0, zIndex: 1000, transition: 'background-color 0.3s ease' }}>
            <div style={{ maxWidth: 1280, height: '99px', margin: '0 auto', padding: '0 24px' }}>
                <Flex align="center" style={{ height: 80 }}>

                    {/* LOGO - Left aligned */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                <Image src={logoSrc} alt="Additiv3 Logo" width={32} height={32} />
                                <Typography.Text strong style={{ fontSize: 'clamp(14px, 4vw, 18px)', whiteSpace: 'nowrap', color: 'var(--color-text-primary)' }}>
                                    ADDITIV3
                                </Typography.Text>
                            </div>
                        </Link>
                    </div>

                    {/* MENU BUTTONS - Center aligned */}
                    {!isMobile && (
                        <Space size="middle">
                            <Button type='text' onClick={onServicesClick} style={{ fontSize: '16px' }}>Services</Button>
                            <Button type="text" onClick={onFAQClick} style={{ fontSize: '16px' }}>FAQ</Button>
                            <Button type='text' style={{ fontSize: '16px' }}>About Us</Button>
                            <Button type="text" onClick={onContactClick} style={{ fontSize: '16px' }}>Contact Us</Button>
                        </Space>
                    )}

                    {/* RIGHT ACTIONS - Right aligned */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        {isMobile ? (
                            <Space>
                                <Button type="text" icon={<MoonOutlined />} onClick={toggleTheme} />
                                <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
                            </Space>
                        ) : (
                            <Button type="primary" style={{ fontWeight: 500, height: '51px', width: '204px', borderRadius: '12px' }} onClick={onStartProjectClick}>
                                Start Your Project
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