"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CloseOutlined } from "@ant-design/icons";

interface MotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: number | string;
}

const MotionModal: React.FC<MotionModalProps> = ({ isOpen, onClose, children, width = 500 }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            zIndex: 1000,
                            willChange: "opacity",
                            transform: "translateZ(0)", // Force GPU layer
                        }}
                    />
                    {/* Modal Container Wrapper for alignment */}
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            pointerEvents: "none", // Let clicks pass through to overlay
                            zIndex: 1001,
                            padding: "24px",
                            boxSizing: "border-box",
                        }}
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                                duration: 0.4,
                                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                            }}
                            style={{
                                width: width,
                                maxWidth: "100%",
                                maxHeight: "100%",
                                backgroundColor: "#fff",
                                borderRadius: "12px",
                                padding: "24px",
                                position: "relative",
                                pointerEvents: "auto",
                                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)",
                                overflow: "auto",
                                willChange: "transform, opacity",
                            }}
                        >
                            {/* Close Button (Optional, similar to AntD) */}
                            <button
                                onClick={onClose}
                                style={{
                                    position: "absolute",
                                    top: "16px",
                                    right: "16px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    color: "#999",
                                    padding: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    outline: "none",
                                }}
                            >
                                <CloseOutlined />
                            </button>

                            {children}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MotionModal;
