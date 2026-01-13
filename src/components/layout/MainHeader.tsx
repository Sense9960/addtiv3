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
}

const MainHeader: React.FC<MainHeaderProps> = ({ onFAQClick, onContactClick, onStartProjectClick }) => {
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
        { label: 'FAQ', onClick: () => handleMenuClick(onFAQClick) },
        { label: 'Contact us', onClick: () => handleMenuClick(onContactClick) },
        { label: 'Start your Project', onClick: () => handleMenuClick(onStartProjectClick), primary: true },
    ];

    const logoSrc = mounted && resolvedTheme === 'dark' ? '/logo/avatar WB.png' : '/logo/avatar.png';

    return (
        <header style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: 'var(--background-color)', position: 'sticky', top: 0, zIndex: 1000, transition: 'background-color 0.3s ease' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                <Flex justify="space-between" align="center" style={{ height: 80 }}>

                    {/* LOGO */}
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <Image src={logoSrc} alt="Additiv3 Logo" width={32} height={32} />
                            <Typography.Text strong style={{ fontSize: 'clamp(14px, 4vw, 18px)', whiteSpace: 'nowrap', color: 'var(--color-text-primary)' }}>
                                ADDITIV3
                            </Typography.Text>
                        </div>
                    </Link>

                    {/* MENU BUTTONS */}
                    {isMobile ? (
                        <Space>
                            <Button type="text" icon={mounted && resolvedTheme === 'dark' ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} />
                            <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
                        </Space>
                    ) : (
                        <Space size="middle">
                            <Button type="text" onClick={onFAQClick}>FAQ</Button>
                            <Button type="text" onClick={onContactClick}>Contact us</Button>
                            <Button type="text" icon={mounted && resolvedTheme === 'dark' ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} />
                            <Button type="primary" style={{ fontWeight: 500 }} onClick={onStartProjectClick}>
                                Start your Project
                            </Button>
                        </Space>
                    )}
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