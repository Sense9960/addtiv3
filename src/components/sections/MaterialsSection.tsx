'use client';
import React from 'react';
import { Col, Row, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const materials = [
    'PLA for quick and clean prototyping', // [cite: 42]
    'ABS for durable and heat resistant parts', // [cite: 43]
    'ASA for outdoor and UV exposed applications', // [cite: 44]
    'Nylon for high strength engineering parts', // [cite: 45]
    'PC for rigid and impact resistant components', // [cite: 47]
];

const capabilities = [
    'Heat set insert installation for secure fastening', // [cite: 48]
    'Parallel production across multiple machines', // [cite: 49]
    'Dimensional tuning and tolerance optimization', // [cite: 50]
];

const MaterialsSection: React.FC = () => {
    return (
        <section style={{ padding: '80px 24px', background: '#f9f9f9', color: '#fff' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <Row gutter={[64, 48]} align="middle">
                    {/* Cột trái: Text */}
                    <Col xs={24} md={12}>
                        <Title level={2} style={{ color: '#000', fontSize: '2.5rem' }}>
                            Materials That Deliver Dependable Results {/*  */}
                        </Title>
                        <Paragraph style={{ color: '#8c8c8c', fontSize: '1.1rem', marginBottom: 40 }}>
                            We work with materials chosen for real performance in real applications. {/* [cite: 40] */}
                        </Paragraph>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[...materials, ...capabilities].map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleFilled style={{ color: '#000', marginRight: 12, fontSize: 16 }} />
                                    <Text style={{ color: '#000', fontSize: 16 }}>
                                        {item}
                                    </Text>
                                </div>
                            ))}
                        </div>

                        <Paragraph style={{ marginTop: 40, color: '#8c8c8c', fontStyle: 'italic' }}>
                            Reliable materials with reliable outcomes {/* [cite: 52] */}
                        </Paragraph>
                    </Col>

                    {/* Cột phải: Ảnh minh họa vật liệu (Placeholder) */}
                    <Col xs={24} md={12}>
                        <div style={{
                            height: 500,
                            background: '#e0e0e0',
                            borderRadius: 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#8c8c8c'
                        }}>
                            Material Image Placeholder
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default MaterialsSection;