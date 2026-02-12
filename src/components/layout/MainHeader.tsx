'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Flex, Space, Typography, Grid, Dropdown, MenuProps } from 'antd';
import { MenuOutlined, MoonOutlined, SunOutlined, DownOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import MobileMenu from './MobileMenu';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLenis } from '../SmoothScrolling';

const { useBreakpoint } = Grid;

interface MainHeaderProps {
    onFAQClick?: () => void;
    onContactClick?: () => void;
    onStartProjectClick?: () => void;
    onServicesClick?: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ onFAQClick, onContactClick, onStartProjectClick, onServicesClick }) => {
    const screens = useBreakpoint();
    // Desktop view is 1200px+ (xl)
    const isDesktop = !!screens.xl;
    // Show Hamburger for tablet/mobile (<1200px)
    const showHamburger = !isDesktop;
    // Show CTA only on Desktop (moved to Hamburger menu for others)
    const showCTA = isDesktop;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const lenis = useLenis();
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

    const handleServiceClick = (hash: string) => {
        if (pathname === '/services') {
            lenis?.scrollTo(`#${hash}`);
        } else {
            router.push(`/services#${hash}`);
        }
    };

    const handleMainServiceClick = () => {
        if (pathname === '/services') {
            lenis?.scrollTo(0);
        } else {
            router.push('/services');
        }
    };

    const serviceList = [
        { label: 'FDM (Fused Deposition Modeling)', onClick: () => handleServiceClick('fdm') },
        { label: 'SLA (Stereolithography)', onClick: () => handleServiceClick('sla') },
        { label: 'Heat Set Inserts Installation', onClick: () => handleServiceClick('heat-set') },
        { label: 'Design', onClick: () => handleServiceClick('design') },
    ];

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

                        {isDesktop && (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Dropdown
                                    popupRender={(menu) => (
                                        <div style={{
                                            width: 284,
                                            padding: 24,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 32,
                                            backgroundColor: 'var(--background-color)',
                                            borderRight: '1px solid #f0f0f0',
                                            borderBottom: '1px solid #f0f0f0',
                                            borderLeft: '1px solid #f0f0f0',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        }}>
                                            {serviceList.map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={item.onClick}
                                                    style={{
                                                        cursor: 'pointer',
                                                        fontSize: '16px',
                                                        fontWeight: 500,
                                                        color: 'var(--color-text-primary)',
                                                        transition: 'color 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.color = '#0013DE'}
                                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                                >
                                                    {item.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    placement="bottom"
                                    arrow={false}
                                >
                                    <Button
                                        type='text'
                                        style={{ fontSize: '16px', fontWeight: 500 }}
                                        onClick={handleMainServiceClick}
                                    >
                                        Services
                                    </Button>
                                </Dropdown>
                                <Button
                                    type='text'
                                    style={{ fontSize: '16px', fontWeight: 500 }}
                                    onClick={() => router.push('/materials')}
                                >
                                    Materials
                                </Button>
                                <Button type="text" onClick={onFAQClick} style={{ fontSize: '16px', fontWeight: 500 }}>FAQ</Button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT GROUP: About Us + Contact + CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        {isDesktop && (
                            <>
                                <Button type='text' style={{ fontSize: '16px', fontWeight: 500 }}>About Us</Button>
                                <Button type="text" onClick={onContactClick} style={{ fontSize: '16px', fontWeight: 500 }}>Contact us</Button>
                            </>
                        )}

                        {/* CTA Button - Visible on Desktop and Tablet (sm+) */}
                        {showCTA && (
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

                        {/* Hamburger Icon - Visible on Tablet/Mobile */}
                        {showHamburger && (
                            <Space>
                                {/* Theme Toggle Hidden as per request */}
                                {/* <Button type="text" icon={<MoonOutlined />} onClick={toggleTheme} /> */}
                                <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
                            </Space>
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