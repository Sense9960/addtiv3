'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, InputNumber, Checkbox, Button, Upload, Grid, App } from 'antd';
import type { UploadFile } from 'antd';
import { CloudUploadOutlined, DeleteOutlined, CloseOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;
const { Dragger } = Upload;
const { useBreakpoint } = Grid;

// ── Material options per process ─────────────────────────────────────────────
const FDM_MATERIALS = ['PLA', 'ABS', 'ASA', 'PC', 'PA (Nylon)', 'PPS-GF'];
const SLA_MATERIALS = ['General Purpose'];

// ── Post-processing options per process ──────────────────────────────────────
interface PostOption { value: string; label: string; disabled?: boolean }

const FDM_POST: PostOption[] = [
    { value: 'support-removal', label: 'Support Removal' },
    { value: 'heat-set', label: 'Heat Set Installation' },
];
const SLA_POST: PostOption[] = [
    { value: 'support-removal', label: 'Support Removal' },
    { value: 'sla-handling', label: 'SLA Handling Fee', disabled: true },
];

// ── Custom Select matching Figma inline-expansion design ─────────────────────
interface SelectOption { value: string; label: string }

interface CustomSelectProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    options: SelectOption[];
    disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, placeholder = 'Select', options, disabled }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const selectedLabel = options.find(o => o.value === value)?.label;

    return (
        <div ref={ref} style={{ position: 'relative', width: '100%' }}>
            {/* Trigger row */}
            <div
                onClick={() => !disabled && setOpen(!open)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                    border: '1px solid #d9d9d9',
                    borderRadius: open ? '8px 8px 0 0' : 8,
                    borderBottom: open ? '1px solid #d9d9d9' : '1px solid #d9d9d9',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    background: disabled ? '#fafafa' : '#fff',
                    fontSize: 16,
                    lineHeight: 1.2,
                    letterSpacing: '0.16px',
                    userSelect: 'none',
                    color: selectedLabel ? '#000' : '#898989',
                }}
            >
                <span style={{ whiteSpace: 'nowrap' }}>{selectedLabel || placeholder}</span>
                <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ flexShrink: 0, transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}
                >
                    <path d="M3 10L8 5L13 10" stroke="#898989" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Options list — expands inline below trigger */}
            {open && !disabled && (
                <div style={{ position: 'absolute', left: 0, right: 0, zIndex: 100, background: '#fff' }}>
                    {options.map((opt, i) => {
                        const isLast = i === options.length - 1;
                        return (
                            <div
                                key={opt.value}
                                onClick={() => { onChange?.(opt.value); setOpen(false); }}
                                style={{
                                    padding: '16px 24px',
                                    borderLeft: '1px solid #d9d9d9',
                                    borderRight: '1px solid #d9d9d9',
                                    borderBottom: isLast ? '1px solid #d9d9d9' : 'none',
                                    borderTop: 'none',
                                    borderRadius: isLast ? '0 0 8px 8px' : 0,
                                    fontSize: 16,
                                    lineHeight: 1.2,
                                    letterSpacing: '0.16px',
                                    color: '#000',
                                    cursor: 'pointer',
                                    background: value === opt.value ? '#f5f5f5' : '#fff',
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={e => { if (value !== opt.value) e.currentTarget.style.background = '#fafafa'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = value === opt.value ? '#f5f5f5' : '#fff'; }}
                            >
                                {opt.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const inputStyle: React.CSSProperties = {
    borderRadius: 8,
    padding: '16px 24px',
    fontSize: 16,
    height: 'auto',
    lineHeight: 1.2,
};

const labelStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 400,
    color: '#000',
    letterSpacing: '0.16px',
};

interface FileProgress { status: 'uploading' | 'done'; pct: number }

// ── Quote form ────────────────────────────────────────────────────────────────
const QuoteForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [process, setProcess] = useState<string | undefined>(undefined);
    const [fileProgress, setFileProgress] = useState<Record<string, FileProgress>>({});
    const router = useRouter();
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const { message } = App.useApp();

    const handleProcessChange = (value: string) => {
        setProcess(value);
        // Reset material when process changes
        form.setFieldValue('material', undefined);
        // Manage post-processing: SLA auto-adds Handling Fee, FDM removes it
        const current: string[] = form.getFieldValue('postProcessing') || [];
        if (value === 'sla') {
            const filtered = current.filter((v) => v !== 'heat-set');
            if (!filtered.includes('sla-handling')) filtered.push('sla-handling');
            form.setFieldValue('postProcessing', filtered);
        } else {
            form.setFieldValue('postProcessing', current.filter((v) => v !== 'sla-handling'));
        }
    };

    const onFinish = async (values: Record<string, unknown>) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name as string);
            formData.append('email', values.email as string);
            if (values.phone) formData.append('phone', values.phone as string);
            if (values.companyName) formData.append('companyName', values.companyName as string);
            formData.append('project', values.project as string);
            if (values.manufacturingProcess) formData.append('manufacturingProcess', values.manufacturingProcess as string);
            if (values.material) formData.append('material', values.material as string);
            if (values.quantity) formData.append('quantity', values.quantity as string);
            if (values.postProcessing) formData.append('postProcessing', (values.postProcessing as string[]).join(', '));
            if (values.referral) formData.append('referral', (values.referral as string[]).join(', '));

            const fileList = values.files as { originFileObj?: File }[] | undefined;
            if (fileList) {
                for (const file of fileList) {
                    if (file.originFileObj) formData.append('files', file.originFileObj);
                }
            }

            const res = await fetch('/api/quote', { method: 'POST', body: formData });
            if (res.ok) {
                router.push('/quote/success');
            } else {
                message.error('Something went wrong. Please try again.');
            }
        } catch {
            message.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const materialOptions = process === 'fdm' ? FDM_MATERIALS : process === 'sla' ? SLA_MATERIALS : [];
    const postOptions: PostOption[] = process === 'sla' ? SLA_POST : FDM_POST;

    return (
        <section style={{
            background: '#ffffff',
            borderBottom: '1px solid #f0f0f0',
            padding: isMobile ? '60px 24px 80px' : '120px 24px',
            boxSizing: 'border-box',
        }}>
            <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64 }}>

                {/* Header */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', textAlign: 'center' }}>
                    <p style={{ fontSize: isMobile ? 28 : 40, fontWeight: 400, lineHeight: 1, letterSpacing: '0.4px', color: '#000', margin: 0 }}>
                        Get a Quote
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.2, letterSpacing: '0.16px', color: '#898989', margin: 0 }}>
                        After submission, your files are reviewed for manufacturability, material
                        compatibility, and production requirements. A detailed quote with pricing
                        and estimated lead time will be provided within 1 to 2 business days.
                    </p>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={(label, { required }) => (
                        <span style={labelStyle}>
                            {label}{required && <span style={{ color: '#eb4242' }}> *</span>}
                        </span>
                    )}
                    style={{ display: 'flex', flexDirection: 'column', gap: 36 }}
                >
                    {/* Name */}
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]} style={{ margin: 0 }}>
                        <Input placeholder="Enter your full name" style={inputStyle} />
                    </Form.Item>

                    {/* Email + Phone */}
                    <div style={{ display: 'flex', gap: 12, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                        <Form.Item
                            label="Email" name="email"
                            rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}
                            style={{ flex: 1, minWidth: 0, margin: 0 }}
                        >
                            <Input placeholder="Enter your email address" style={inputStyle} />
                        </Form.Item>
                        <Form.Item label="Phone Number (Optional)" name="phone" style={{ flex: 1, minWidth: 0, margin: 0 }}>
                            <Input placeholder="Enter your phone number" style={inputStyle} />
                        </Form.Item>
                    </div>

                    {/* Company Name */}
                    <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: 'Please enter your company name' }]} style={{ margin: 0 }}>
                        <Input placeholder="Enter company name" style={inputStyle} />
                    </Form.Item>

                    {/* Project description */}
                    <Form.Item label="Tell Us About Your Project" name="project" rules={[{ required: true, message: 'Please describe your project' }]} style={{ margin: 0 }}>
                        <TextArea placeholder="Describe your project, requirements, and any specific details..." style={{ ...inputStyle, height: 120, resize: 'none' }} />
                    </Form.Item>

                    {/* Manufacturing Process */}
                    <Form.Item label="Manufacturing Process" name="manufacturingProcess" rules={[{ required: true, message: 'Please select a manufacturing process' }]} style={{ margin: 0 }}>
                        <CustomSelect
                            placeholder="Select a process"
                            options={[{ value: 'fdm', label: 'FDM' }, { value: 'sla', label: 'SLA' }]}
                            onChange={handleProcessChange}
                        />
                    </Form.Item>

                    {/* Material — options depend on process */}
                    <Form.Item label="Material" name="material" rules={[{ required: true, message: 'Please select a material' }]} style={{ margin: 0 }}>
                        <CustomSelect
                            placeholder={process ? 'Select a material' : 'Select a process first'}
                            options={materialOptions.map((mat) => ({ value: mat, label: mat }))}
                            disabled={!process}
                        />
                    </Form.Item>

                    {/* Quantity */}
                    <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please enter a quantity' }]} style={{ margin: 0 }}>
                        <InputNumber
                            min={1}
                            placeholder="Enter quantity"
                            style={{ ...inputStyle, width: '100%' }}
                        />
                    </Form.Item>

                    {/* Post Processing — options depend on process */}
                    <Form.Item label="Post Processing" name="postProcessing" rules={[{ required: true, message: 'Please select at least one option' }]} style={{ margin: 0 }}>
                        <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '10px' }}>
                            {postOptions.map((opt) => (
                                <Checkbox key={opt.value} value={opt.value} disabled={opt.disabled}>
                                    <span style={{ fontSize: 16, color: '#000', letterSpacing: '-0.45px' }}>{opt.label}</span>
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>

                    {/* File Upload */}
                    <Form.Item
                        label="File Upload"
                        name="files"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                        rules={[{ required: true, message: 'Please upload at least one file' }]}
                        style={{ margin: 0 }}
                    >
                        <Dragger
                            multiple
                            beforeUpload={(file) => {
                                const uid = file.uid;
                                setFileProgress(prev => ({ ...prev, [uid]: { status: 'uploading', pct: 0 } }));
                                setTimeout(() => setFileProgress(prev => ({ ...prev, [uid]: { status: 'uploading', pct: 60 } })), 50);
                                setTimeout(() => setFileProgress(prev => ({ ...prev, [uid]: { status: 'uploading', pct: 90 } })), 700);
                                setTimeout(() => setFileProgress(prev => ({ ...prev, [uid]: { status: 'done', pct: 100 } })), 1400);
                                return false;
                            }}
                            style={{ borderRadius: 12, borderColor: '#d9d9d9' }}
                            itemRender={(_, file: UploadFile, __, { remove }) => {
                                const prog = fileProgress[file.uid] ?? { status: 'done', pct: 100 };
                                const isDone = prog.status === 'done';
                                const bytes = file.size ?? 0;
                                const sizeLabel = bytes < 1024 * 1024
                                    ? `${(bytes / 1024).toFixed(1)} KB of ${(bytes / 1024).toFixed(1)} KB`
                                    : `${(bytes / (1024 * 1024)).toFixed(2)} MB of ${(bytes / (1024 * 1024)).toFixed(2)} MB`;

                                return (
                                    <div style={{
                                        marginTop: 8,
                                        padding: '12px 16px',
                                        borderRadius: 8,
                                        border: '1px solid #f0f0f0',
                                        background: '#fff',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 12,
                                    }}>
                                        {/* Text block */}
                                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <span style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                color: '#111',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {file.name}
                                            </span>
                                            <span style={{ fontSize: 12, color: '#898989' }}>
                                                {sizeLabel}
                                            </span>
                                            {isDone ? (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#52c41a' }}>
                                                    <CheckCircleFilled />
                                                    Completed
                                                </span>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                                    <span style={{ fontSize: 12, color: '#898989' }}>Uploading...</span>
                                                    <div style={{
                                                        height: 4,
                                                        borderRadius: 2,
                                                        background: '#f0f0f0',
                                                        overflow: 'hidden',
                                                    }}>
                                                        <div style={{
                                                            height: '100%',
                                                            borderRadius: 2,
                                                            background: '#0014e6',
                                                            width: `${prog.pct}%`,
                                                            transition: 'width 0.6s ease',
                                                        }} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {/* Action icon */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFileProgress(prev => {
                                                    const next = { ...prev };
                                                    delete next[file.uid];
                                                    return next;
                                                });
                                                remove();
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: 2,
                                                color: '#898989',
                                                fontSize: 16,
                                                flexShrink: 0,
                                                lineHeight: 1,
                                                marginTop: 2,
                                            }}
                                            aria-label="Remove file"
                                        >
                                            {isDone ? <DeleteOutlined /> : <CloseOutlined />}
                                        </button>
                                    </div>
                                );
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, padding: '16px 0' }}>
                                <CloudUploadOutlined style={{ fontSize: 32, color: '#000' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'center' }}>
                                    <p style={{ fontSize: 16, color: '#000', letterSpacing: '0.16px', margin: 0 }}>
                                        Drag and drop files here or browse
                                    </p>
                                    <p style={{ fontSize: 14, color: '#898989', letterSpacing: '0.14px', margin: 0 }}>
                                        STL, STP, STEP, OBJ, and 3MF formats up to 50MB.
                                    </p>
                                </div>
                                <span style={{
                                    background: '#0014e6',
                                    color: '#fff',
                                    borderRadius: 8,
                                    padding: '8px 12px',
                                    fontSize: 14,
                                    letterSpacing: '0.14px',
                                    lineHeight: 1.2,
                                }}>
                                    Browse File
                                </span>
                            </div>
                        </Dragger>
                    </Form.Item>

                    {/* How did you hear about us */}
                    <Form.Item label="How did you hear about us?" name="referral" rules={[{ required: true, message: 'Please select at least one option' }]} style={{ margin: 0 }}>
                        <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '10px' }}>
                            {['Google', 'LinkedIn', 'Instagram', 'Tiktok', 'Referral', 'Other'].map((label) => (
                                <Checkbox key={label} value={label.toLowerCase()}>
                                    <span style={{ fontSize: 16, color: '#111', letterSpacing: '-0.45px' }}>{label}</span>
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>

                    {/* Submit */}
                    <Form.Item style={{ margin: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{
                                background: '#0014e6',
                                border: 'none',
                                borderRadius: 12,
                                height: 'auto',
                                padding: '16px 32px',
                                fontSize: 16,
                                fontWeight: 400,
                                letterSpacing: '0.16px',
                                lineHeight: 1.2,
                                boxShadow: 'none',
                            }}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
};

const Quote: React.FC = () => (
    <App>
        <QuoteForm />
    </App>
);

export default Quote;
