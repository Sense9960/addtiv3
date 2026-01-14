'use client';
import React from 'react';
import { Button, Form, Input, Typography, Row, Col, message, Grid } from 'antd';
import MotionModal from '@/components/common/MotionModal';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const onFinish = (values: any) => {
        console.log('Success:', values);
        messageApi.success('Thank you for contacting us! We will get back to you shortly.');
        form.resetFields();
        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <MotionModal
            isOpen={isOpen}
            onClose={onClose}
            width={800}
        >
            {contextHolder}
            <div style={{ padding: isMobile ? '0' : '24px 0' }}>

                <div style={{ textAlign: 'center', marginBottom: isMobile ? 20 : 32 }}>
                    <Title level={2} style={{ fontSize: isMobile ? '1.5rem' : '2rem', margin: 0 }}>
                        Contact Us
                    </Title>
                    <Paragraph style={{ fontSize: isMobile ? '0.9rem' : '1rem', color: '#595959', marginBottom: 0 }}>
                        Have a project in mind? Fill out the form below.
                    </Paragraph>
                </div>

                <Form
                    form={form}
                    name="contact"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    size="large"
                >
                    <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                                style={{ marginBottom: 20 }}
                            >
                                <Input placeholder="Your Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                                style={{ marginBottom: 20 }}
                            >
                                <Input placeholder="your@email.com" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{ required: true, message: 'Please input the subject!' }]}
                        style={{ marginBottom: 20 }}
                    >
                        <Input placeholder="Project Inquiry" />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        label="Message"
                        rules={[{ required: true, message: 'Please input your message!' }]}
                        style={{ marginBottom: 0 }}
                    >
                        {/* Vẫn giữ logic giảm số dòng trên mobile để không bị che nút gửi */}
                        <TextArea
                            rows={isMobile ? 3 : 5}
                            placeholder="Tell us about your project..."
                        />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center', marginTop: 24, marginBottom: 0 }}>
                        <Button type="primary" htmlType="submit" size="large" style={{ padding: '0 40px', height: 48, width: isMobile ? '100%' : 'auto' }}>
                            Send Message
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </MotionModal>
    );
};

export default ContactModal;