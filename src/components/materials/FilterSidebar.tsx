'use client';

import React from 'react';
import { Input, Checkbox, Typography, Flex, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface FilterSidebarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedProcesses: string[];
    onProcessChange: (values: string[]) => void;
}

export default function FilterSidebar({
    searchTerm,
    onSearchChange,
    selectedProcesses,
    onProcessChange,
}: FilterSidebarProps) {
    const processOptions = [
        { label: 'FDM', value: 'FDM' },
        { label: 'SLA', value: 'SLA' },
    ];

    return (
        <Card style={{ width: '100%', border: '1px solid #e6e6e6', borderRadius: 8 }}>
            <Flex vertical gap="large">
                <Input
                    placeholder="Search"
                    prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{ borderRadius: 6, padding: '8px 12px' }}
                />

                <div>
                    <Title level={5} style={{ marginBottom: 12, fontSize: '1rem' }}>Process</Title>
                    <Checkbox.Group
                        options={processOptions}
                        value={selectedProcesses}
                        onChange={(checkedValues) => onProcessChange(checkedValues as string[])}
                        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                    />
                </div>
            </Flex>
        </Card>
    );
}
