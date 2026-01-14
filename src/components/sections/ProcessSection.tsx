'use client';
import React from 'react';
import { Card, Col, Row, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

interface Step {
    step: string;
    title: string;
    desc: string;
}

const steps: Step[] = [
    {
        step: '01',
        title: 'Discover',
        desc: 'We learn your requirements, materials, quantities, and performance needs.',
    },
    {
        step: '02',
        title: 'Prepare',
        desc: 'We optimize orientation, tolerances, and print conditions for the best outcome.',
    },
    {
        step: '03',
        title: 'Manufacture',
        desc: 'Parts are produced using controlled and repeatable processes.',
    },
    {
        step: '04',
        title: 'Deliver',
        desc: 'Parts are shipped quickly with ongoing support for future iterations or production runs.',
    },
];

const ProcessSection: React.FC = () => {
    return (
        <section style={{ padding: '100px 24px', backgroundColor: '#fff' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <Row justify="space-between" style={{ marginBottom: 80 }}>
                    <Col xs={24} md={8}>
                        <Paragraph style={{ fontSize: '1.1rem', color: '#595959', marginTop: 8 }}>
                            A simple and efficient process designed to move projects from concept to delivered parts with clarity and speed.
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                        <Title level={2} style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', margin: 0, lineHeight: 1.1 }}>
                            How We Bring<br />Ideas to Life.
                        </Title>
                    </Col>
                </Row>

                <Row gutter={[32, 32]}>
                    {steps.map((item, index) => (
                        <Col xs={24} md={6} key={index}>
                            <Card variant="borderless" style={{ height: '100%', boxShadow: 'none', textAlign: 'left', borderRadius: 16, border: '1px solid #e6e6e6', padding: '12px 0' }}>
                                <Text strong style={{ fontSize: '4rem', color: '#000', display: 'block', lineHeight: 1, marginBottom: 24, fontFamily: 'var(--font-inter)' }}>
                                    {item.step}
                                </Text>
                                <Title level={4} style={{ marginTop: 0, borderBottom: '1px solid #e6e6e6', paddingBottom: 24, marginBottom: 24, fontSize: '1.5rem' }}>{item.title}</Title>
                                <Paragraph type="secondary" style={{ fontSize: '1rem' }}>{item.desc}</Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default ProcessSection;