"use client";

import React from "react";
import { Button, Flex, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "motion/react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: {
        label: string;
        onClick?: () => void;
        primary?: boolean;
    }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, menuItems }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 2000,
                        display: "flex", // Ensure it takes space for children positioning
                        pointerEvents: "none", // Allow clicks to pass if needed, but overlay handles it
                    }}
                >
                    {/* Overlay Background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.98)",
                            pointerEvents: "auto",
                            willChange: "opacity",
                            transform: "translateZ(0)", // Force GPU layer
                        }}
                    />

                    {/* Menu Content Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                            duration: 0.4,
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                        }}
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 24,
                            boxSizing: "border-box",
                            pointerEvents: "auto",
                            willChange: "transform, opacity",
                        }}
                    >
                        {/* Close Button */}
                        <Button
                            type="text"
                            icon={<CloseOutlined style={{ fontSize: 24 }} />}
                            onClick={onClose}
                            style={{
                                position: "absolute",
                                top: 24,
                                right: 24,
                            }}
                        />

                        <Typography.Title level={2} style={{ marginBottom: 40, marginTop: 0, textAlign: 'center' }}>
                            Additiv3
                        </Typography.Title>

                        <Flex vertical gap="large" align="center" style={{ width: "100%", maxWidth: 300 }}>
                            {menuItems.map((item, index) => (
                                <Button
                                    key={index}
                                    type={item.primary ? "primary" : "text"}
                                    size="large"
                                    block
                                    onClick={item.onClick}
                                    style={{
                                        fontSize: "1.2rem",
                                        height: 50,
                                        fontWeight: item.primary ? 600 : 400,
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Flex>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
