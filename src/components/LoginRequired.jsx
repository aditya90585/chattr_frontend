import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRequired = ({ onClose }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        onClose?.();

        navigate("/login", {
        });
    };

    const handleSignup = () => {
        onClose?.();

        navigate("/signup", {
        });
    };

    return (
        <div className=" fixed inset-0 z-[999999]
                flex items-center justify-center
                w-full h-full
                p-5
                box-border
                bg-black/65
                backdrop-blur-[8px]
            "
        >
            <div
                className="
                    relative
                    flex flex-col items-center
                    w-full max-w-[440px]
                    px-9 pt-[42px] pb-[30px]
                    box-border
                    bg-white
                    border border-black/[0.06]
                    rounded-[20px]
                    shadow-[0_30px_80px_rgba(0,0,0,0.25),0_10px_30px_rgba(0,0,0,0.12)]
                    text-[#111]
                    font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]
                    overflow-visible
                "
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close login required dialog"
                    className="
                        absolute top-[14px] right-[14px]
                        flex items-center justify-center
                        w-[34px] h-[34px]
                        m-0 p-0
                        border-0
                        rounded-full
                        bg-[#f3f3f3]
                        text-[#555]
                        font-[Arial,sans-serif]
                        text-[24px]
                        font-normal
                        leading-none
                        cursor-pointer
                        appearance-none
                        transition-colors duration-200
                        hover:bg-[#e8e8e8]
                    "
                >
                    ×
                </button>

                {/* Lock Icon */}
                <div
                    className="
                        flex items-center justify-center
                        w-[68px] h-[68px]
                        mb-[22px]
                        rounded-full
                        bg-[#f3f4f6]
                        box-border
                        shrink-0
                    "
                >
                    <span
                        className="
                            block
                            m-0 p-0
                            font-['Apple_Color_Emoji','Segoe_UI_Emoji','Noto_Color_Emoji',sans-serif]
                            text-[29px]
                            leading-none
                            select-none
                        "
                    >
                        🔒
                    </span>
                </div>

                {/* Content */}
                <div
                    className="
                        flex flex-col items-center
                        w-full
                        m-0 p-0
                        box-border
                        text-center
                    "
                >
                    <h2
                        className="
                            block
                            w-full
                            m-0 mb-[10px]
                            p-0
                            text-[#171717]
                            font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]
                            text-[25px]
                            font-bold
                            leading-[1.3]
                            tracking-[-0.3px]
                            text-center
                            box-border
                        "
                    >
                        Login Required
                    </h2>

                    <p
                        className="
                            block
                            w-full max-w-[340px]
                            m-0 mb-7
                            p-0
                            text-[#6b6b6b]
                            font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]
                            text-[15px]
                            font-normal
                            leading-[1.6]
                            text-center
                            box-border
                        "
                    >
                        You need to be logged in to continue.
                        <br />
                        Please login to access this feature.
                    </p>
                </div>

                {/* Login Button */}
                <button
                    type="button"
                    onClick={handleLogin}
                    className="
                        flex items-center justify-center
                        w-full min-h-[48px]
                        m-0
                        px-5 py-[13px]
                        box-border
                        border-0
                        rounded-[10px]
                        bg-[#111]
                        text-white
                        font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]
                        text-[15px]
                        font-semibold
                        leading-[1.2]
                        text-center
                        cursor-pointer
                        appearance-none
                        transition-all duration-200
                        hover:bg-[#222]
                        active:scale-[0.98]
                    "
                >
                    Login
                </button>

                {/* Signup */}
                <div
                    className="
                        flex items-center justify-center
                        w-full
                        mt-[17px]
                        p-0
                        gap-1
                        box-border
                        text-center
                    "
                >
                    <span
                        className="
                            inline
                            m-0 p-0
                            text-[#777]
                            font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]
                            text-[14px]
                            font-normal
                            leading-[1.5]
                        "
                    >
                        Don't have an account?
                    </span>

                    <button
                        type="button"
                        onClick={handleSignup}
                        className="
                            inline-flex items-center justify-center
                            w-auto min-w-0 min-h-0
                            m-0 p-0
                            border-0
                            bg-transparent
                            text-[#111]
                            font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]
                            text-[14px]
                            font-semibold
                            leading-[1.5]
                            cursor-pointer
                            appearance-none
                            transition-opacity duration-200
                            hover:opacity-60
                        "
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRequired;