'use client';
import React from 'react';
import Image from 'next/image';
import { Typography, Grid, Row, Col } from 'antd';

const HardwareIcon = '/trusted_icon/Lightbulb.svg';
const RndIcon = '/trusted_icon/Board.svg';
const ManufacturerIcon = '/trusted_icon/Wrench.svg';
const StudentIcon = '/trusted_icon/Student.svg';
const ProblemSolverIcon = '/trusted_icon/Person.svg';

const { Title, Paragraph } = Typography;

const TrustSection: React.FC = () => {
    const screens = Grid.useBreakpoint();

    return (
        <section style={{ backgroundColor: '#f9f9f9', padding: '100px 24px' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>

                <Title level={2} style={{ fontSize: '4rem', marginBottom: 16 }}>
                    Trusted by builders, <br className="mobile-break" /> engineers, & creators.
                </Title>

                <Paragraph type="secondary" style={{ fontSize: '1.2rem', marginBottom: 60, maxWidth: 700, marginInline: 'auto' }}>
                    We support hardware startups, R&D teams, small manufacturers, students,
                    and everyday problem solvers who need reliable manufacturing partners.
                </Paragraph>

                <Row gutter={[24, 24]}>
                    {[
                        { icon: HardwareIcon, title: 'Hardware Startups' },
                        { icon: RndIcon, title: 'R&D Teams' },
                        { icon: ManufacturerIcon, title: 'Small Manufacturers' },
                        { icon: StudentIcon, title: 'Students' },
                        { icon: ProblemSolverIcon, title: 'Problem Solvers' },
                    ].map((item, index) => {
                        return (
                            <Col key={index} flex={screens.xl ? '20%' : screens.md ? '33.33%' : '100%'} style={{ display: 'flex' }}>
                                <div style={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    textAlign: 'left',
                                    border: '1px solid #e6e6e6',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: !screens.md ? 'auto' : '220px',
                                    gap: !screens.md ? '24px' : '0'
                                }}>
                                    <div>
                                        <Image
                                            src={item.icon}
                                            alt={item.title}
                                            width={48}
                                            height={48}
                                            style={{ width: 'auto', height: !screens.md ? '40px' : '48px' }}
                                        />
                                    </div>
                                    <Title level={4} style={{ fontSize: !screens.md ? '1.25rem' : '1.25rem', margin: 0 }}>
                                        {item.title}
                                    </Title>
                                </div>
                            </Col>
                        );
                    })}
                </Row>

            </div>
        </section>
    );
};

export default TrustSection;