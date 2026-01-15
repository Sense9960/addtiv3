'use client';
import React from 'react';
import { Button, Typography, Flex, Grid } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface FinalCTASectionProps {
    onContactClick?: () => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onContactClick }) => {
    const screens = Grid.useBreakpoint();
    const isMobile = !screens.md;

    return (
        <section style={{
            padding: isMobile ? '60px 20px' : '100px 24px',
            backgroundColor: '#000',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <Title level={2} style={{
                    fontSize: isMobile ? '2.5rem' : '4rem',
                    marginBottom: 16,
                    color: '#fff',
                    lineHeight: 1.2
                }}>
                    Ready to Manufacture <br /> Your Next Part?
                </Title>

                <Paragraph style={{
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    color: '#fff',
                    marginBottom: 40,
                    padding: isMobile ? '0 10px' : '0'
                }}>
                    From prototypes to production, Additiv3 is your partner for fast and dependable manufacturing.
                </Paragraph>

                <Flex justify="center" gap="middle">
                    <Button
                        style={{
                            width: '255px',
                            height: '64px',
                            fontSize: '18px',
                            fontWeight: 600,
                            borderRadius: '12px',
                            color: '#000', backgroundColor: '#fff',
                            border: 'none', display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                        onClick={onContactClick}
                    >
                        Get a Quote <ArrowRightOutlined />
                    </Button>
                </Flex>
            </div>
        </section>
    );
};

export default FinalCTASection;