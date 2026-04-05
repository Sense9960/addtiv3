'use client';

import React, { useState } from 'react';
import { Card, Typography, Flex, Button, Row, Col } from 'antd';
import { PlusOutlined, DownOutlined, UpOutlined, SelectOutlined } from '@ant-design/icons';
import { Material } from '@/data/materials';

const { Title, Paragraph, Text } = Typography;

interface MaterialCardProps {
    material: Material;
}

export default function MaterialCard({ material }: MaterialCardProps) {
    const [isExpanded, setIsExpanded] = useState(true); // Default expanded as per screenshot

    return (
        <Card style={{ width: '100%', marginBottom: 24, border: '1px solid #e6e6e6', borderRadius: 8 }}>
            <Flex gap="large" align="start" vertical={false} wrap="wrap">
                {/* Placeholder Image - Gray Box in design */}
                <img
                    src={material.image}
                    alt={material.name}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 8,
                        objectFit: 'cover',
                        flexShrink: 0
                    }}
                />

                <div style={{ flex: 1 }}>
                    <Flex justify="space-between" align="start" wrap="wrap">
                        <Title level={3} style={{ marginTop: 0, marginBottom: 8, fontSize: '1.5rem' }}>{material.name}</Title>
                    </Flex>

                    <Paragraph type="secondary" style={{ fontSize: '1rem', marginBottom: 16 }}>
                        {material.description}
                    </Paragraph>

                    <Flex justify="flex-end" gap="middle" style={{ marginBottom: 16 }}>
                        {material.dataSheetUrl && (
                            <Button
                                type="link"
                                href={material.dataSheetUrl}
                                target="_blank"
                                icon={<SelectOutlined />}
                                style={{ color: '#0013DE', fontWeight: 500, padding: 0 }}
                            >
                                View Data Sheet
                            </Button>
                        )}
                        <Button
                            type="link"
                            onClick={() => setIsExpanded(!isExpanded)}
                            icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                            style={{ color: '#0013DE', fontWeight: 500, padding: 0 }}
                        >
                            {isExpanded ? 'Less Details' : 'More Details'}
                        </Button>
                    </Flex>

                    {isExpanded && (
                        <Row gutter={[24, 24]} style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
                            <Col xs={24} md={12}>
                                <Title level={5} style={{ fontSize: '0.9rem', marginBottom: 16 }}>Key Advantages</Title>
                                <Flex vertical gap="small">
                                    {material.keyAdvantages.map((advantage, index) => (
                                        <Flex key={index} gap="small" align="start">
                                            <PlusOutlined style={{ color: '#0013DE', marginTop: 4, flexShrink: 0 }} />
                                            <Text style={{ fontSize: '1rem', lineHeight: '1.5', color: '#666' }}>{advantage}</Text>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Col>
                            <Col xs={24} md={12}>
                                <Title level={5} style={{ fontSize: '0.9rem', marginBottom: 16 }}>Typical applications</Title>
                                <Paragraph style={{ fontSize: '1rem', lineHeight: '1.5', color: '#666' }}>
                                    {material.typicalApplications}
                                </Paragraph>
                            </Col>
                        </Row>
                    )}
                </div>
            </Flex>
        </Card>
    );
}
