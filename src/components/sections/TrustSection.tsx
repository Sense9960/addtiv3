'use client';
import React from 'react';
import Image from 'next/image';
import { Flex, Typography } from 'antd';

const HardwareIcon = '/trusted_icon/Lightbulb.svg';
const RndIcon = '/trusted_icon/Board.svg';
const ManufacturerIcon = '/trusted_icon/Wrench.svg';
const StudentIcon = '/trusted_icon/Student.svg';
const ProblemSolverIcon = '/trusted_icon/Person.svg';

const { Title, Paragraph } = Typography;

const TrustSection: React.FC = () => {
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

                {/* LOGO GRID */}
                <Flex gap={24} style={{ width: '100%' }}>
                    {[
                        { icon: HardwareIcon, title: 'Hardware Startups' },
                        { icon: RndIcon, title: 'R&D Teams' },
                        { icon: ManufacturerIcon, title: 'Small Manufacturers' },
                        { icon: StudentIcon, title: 'Students' },
                        { icon: ProblemSolverIcon, title: 'Problem Solvers' },
                    ].map((item, index) => (
                        <div key={index} style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            padding: '32px 24px',
                            textAlign: 'left',
                            border: '1px solid #e0e0e0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '220px'
                        }}>
                            <div>
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={48}
                                    height={48}
                                    style={{ width: 'auto', height: '48px' }}
                                />
                            </div>
                            <Title level={4} style={{ fontSize: '1.25rem', margin: 0 }}>
                                {item.title}
                            </Title>
                        </div>
                    ))}
                </Flex>

            </div>
        </section>
    );
};

export default TrustSection;