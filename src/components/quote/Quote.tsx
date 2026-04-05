'use client';

import React, { useState } from 'react';
import { Typography, Form, Input, Select, InputNumber, Checkbox, Button, Upload, Grid, Divider, App } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;
const { useBreakpoint } = Grid;

const QuoteForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const { message } = App.useApp();

    const onFinish = async (values: Record<string, unknown>) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name as string);
            formData.append('email', values.email as string);
            if (values.phone) formData.append('phone', values.phone as string);
            if (values.website) formData.append('website', values.website as string);
            formData.append('project', values.project as string);
            if (values.material) formData.append('material', values.material as string);
            if (values.quantity) formData.append('quantity', String(values.quantity));
            if (values.postProcessing) formData.append('postProcessing', (values.postProcessing as string[]).join(', '));
            if (values.referral) formData.append('referral', (values.referral as string[]).join(', '));

            const fileList = values.files as { originFileObj?: File }[] | undefined;
            if (fileList) {
                for (const file of fileList) {
                    if (file.originFileObj) {
                        formData.append('files', file.originFileObj);
                    }
                }
            }

            const res = await fetch('/api/quote', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                message.success('Your quote request has been submitted!');
                form.resetFields();
            } else {
                message.error('Something went wrong. Please try again.');
            }
        } catch {
            message.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const labelStyle = { fontWeight: 600, fontSize: 14 };

    return (
        <section style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? '40px 24px 80px' : '60px 24px 120px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <Title level={1} style={{ fontSize: isMobile ? 32 : 48, marginBottom: 8 }}>
                    Get a Quote
                </Title>
                <Paragraph type="secondary" style={{ fontSize: 16, margin: 0 }}>
                    Fill out the form below to get started.
                </Paragraph>
            </div>

            {/* Form */}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={(label, { required }) => (
                    <>{label}{required && <span style={{ color: '#000' }}> *</span>}</>
                )}
            >
                {/* Name */}
                <Form.Item
                    label={<Text style={labelStyle}>Name</Text>}
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="Enter your full name" size="large" />
                </Form.Item>

                {/* Email + Phone */}
                <div style={{ display: 'flex', gap: 16, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                    <Form.Item
                        label={<Text style={labelStyle}>Email</Text>}
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                        style={{ flex: 1, minWidth: 0 }}
                    >
                        <Input placeholder="Enter your email address" size="large" />
                    </Form.Item>
                    <Form.Item
                        label={<Text style={labelStyle}>Phone Number (Optional)</Text>}
                        name="phone"
                        style={{ flex: 1, minWidth: 0 }}
                    >
                        <Input placeholder="Enter your phone number" size="large" />
                    </Form.Item>
                </div>

                {/* Website/Portfolio URL */}
                <Form.Item
                    label={<Text style={labelStyle}>Website/Portfolio URL</Text>}
                    name="website"
                >
                    <Input placeholder="https://yourwebsite.com" size="large" />
                </Form.Item>

                {/* Tell us about your project */}
                <Form.Item
                    label={<Text style={labelStyle}>Tell us about Your Project</Text>}
                    name="project"
                    rules={[{ required: true, message: 'Please describe your project' }]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Describe your project, requirements, and any specific details..."
                        size="large"
                    />
                </Form.Item>

                {/* Material/Technology Preferred */}
                <Form.Item
                    label={<Text style={labelStyle}>Material/Technology Preferred</Text>}
                    name="material"
                >
                    <Select placeholder="Select a material or process" size="large">
                        <Select.Option value="fdm-pla">FDM - PLA</Select.Option>
                        <Select.Option value="fdm-abs">FDM - ABS</Select.Option>
                        <Select.Option value="fdm-petg">FDM - PETG</Select.Option>
                        <Select.Option value="fdm-nylon">FDM - Nylon</Select.Option>
                        <Select.Option value="fdm-tpu">FDM - TPU</Select.Option>
                        <Select.Option value="sla-standard">SLA - Standard Resin</Select.Option>
                        <Select.Option value="sla-tough">SLA - Tough Resin</Select.Option>
                        <Select.Option value="sla-flexible">SLA - Flexible Resin</Select.Option>
                        <Select.Option value="not-sure">Not sure - Need guidance</Select.Option>
                    </Select>
                </Form.Item>

                {/* Quantity */}
                <Form.Item
                    label={<Text style={labelStyle}>Quantity</Text>}
                    name="quantity"
                >
                    <InputNumber
                        placeholder="Enter quantity amount"
                        size="large"
                        min={1}
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                {/* Post Processing */}
                <Form.Item
                    label={<Text style={labelStyle}>Post Processing</Text>}
                    name="postProcessing"
                >
                    <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Checkbox value="sanding">Sanding</Checkbox>
                        <Checkbox value="heat-set">Heat Set Inserts Installation</Checkbox>
                    </Checkbox.Group>
                </Form.Item>

                {/* File Upload */}
                <Form.Item
                    label={<Text style={labelStyle}>File Upload</Text>}
                    name="files"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    rules={[{
                        validator: (_, fileList) => {
                            if (!fileList || fileList.length === 0) return Promise.resolve();
                            const totalSize = fileList.reduce((sum: number, f: { size?: number }) => sum + (f.size || 0), 0);
                            if (totalSize > 25 * 1024 * 1024) {
                                return Promise.reject('Total file size must not exceed 25MB');
                            }
                            return Promise.resolve();
                        }
                    }]}
                >
                    <Dragger
                        multiple
                        beforeUpload={() => false}
                        accept=".stl,.step,.stp,.obj,.3mf,.iges,.igs,.pdf"
                        showUploadList={{ showRemoveIcon: true }}
                        itemRender={(originNode, file) => {
                            const size = file.size || 0;
                            const sizeStr = size < 1024 * 1024
                                ? `${(size / 1024).toFixed(1)} KB`
                                : `${(size / (1024 * 1024)).toFixed(1)} MB`;
                            return (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '8px 12px',
                                    border: '1px solid #f0f0f0',
                                    borderRadius: 8,
                                    marginTop: 8,
                                }}>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 500 }}>{file.name}</div>
                                        <div style={{ fontSize: 12, color: '#898989' }}>{sizeStr}</div>
                                    </div>
                                    {originNode}
                                </div>
                            );
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined style={{ color: '#0013DE', fontSize: 40 }} />
                        </p>
                        <p style={{ fontSize: 14, color: '#000' }}>
                            Drag and drop files here or browse
                        </p>
                        <p style={{ fontSize: 12, color: '#898989' }}>
                            Accepted: STL, STEP, OBJ, 3MF, IGES, PDF (Max 25MB total)
                        </p>
                    </Dragger>
                </Form.Item>

                <Divider />

                {/* How did you hear about us */}
                <Form.Item
                    label={<Text style={labelStyle}>How did you hear about us?</Text>}
                    name="referral"
                >
                    <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Checkbox value="google">Google</Checkbox>
                        <Checkbox value="linkedin">LinkedIn</Checkbox>
                        <Checkbox value="instagram">Instagram</Checkbox>
                        <Checkbox value="tiktok">TikTok</Checkbox>
                        <Checkbox value="referral">Referral</Checkbox>
                    </Checkbox.Group>
                </Form.Item>

                {/* Note */}
                <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 24 }}>
                    Max 60 pcs. Max 4 SKU (3D files)
                </Paragraph>

                {/* Submit */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                        block
                        style={{
                            backgroundColor: '#0013DE',
                            border: 'none',
                            height: 48,
                            fontWeight: 600,
                            fontSize: 16,
                            borderRadius: 8,
                        }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
};

const Quote: React.FC = () => (
    <App>
        <QuoteForm />
    </App>
);

export default Quote;
