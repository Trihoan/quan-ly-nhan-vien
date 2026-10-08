"use client";

import { useEffect } from "react";

type ToastType = "success" | "error";

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function Toast({
    message,
    type,
    onClose,
}: ToastProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`
                fixed
                bottom-6
                left-1/2
                -translate-x-1/2
                z-[9999]
                px-5
                py-3
                rounded-lg
                shadow-lg
                text-sm
                font-medium
                text-white
                flex
                items-center
                gap-3
                min-w-[280px]
                justify-between
                animate-[fadeIn_0.2s_ease-out]
                ${type === "success"
                    ? "bg-[#1f1f1f]"
                    : "bg-red-500"
                }
            `}
        >
            <span>{message}</span>

            <button
                type="button"
                onClick={onClose}
                className="text-white/80 hover:text-white text-lg leading-none"
            >
                ×
            </button>
        </div>
    );
}