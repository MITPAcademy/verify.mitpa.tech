import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
    const [email, setEmail] = useState("");
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [showVerification, setShowVerification] = useState(false);
    const [buttonText, setButtonText] = useState("Verify");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("id");
        if (userId) {
            setId(userId);
        } else {
            toast.error("ID is required");
        }
    }, []);

    useEffect(() => {
        setButtonText(email.trim() === "" ? "Verify" : "Send Verification Code");
    }, [email]);

    const sanitize = (value: string) => {
        return value.replace(/[^a-zA-Z0-9@._-]/g, "").trim();
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const closeWindow = () => window.close();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaValue) return toast.error("Please complete the CAPTCHA");
        if (!id) return toast.error("User ID is required");

        const cleanEmail = sanitize(email);

        if (cleanEmail && !isValidEmail(cleanEmail)) {
            return toast.error("Please enter a valid email address");
        }

        if (cleanEmail === "") {
            try {
                const response = await fetch(import.meta.env.VITE_API_VERIFY_USER_URL!, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id: id })
                });

                if (response.ok) {
                    toast.success("Verification successful!");
                    closeWindow();
                } else {
                    toast.error("Verification failed");
                }
            } catch {
                toast.error("An error occurred");
            }
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_GENERATE_CODE_URL!, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ to: cleanEmail, user_id: id })
            });

            if (response.ok) {
                setShowVerification(true);
                toast.success("Verification code sent!");
            } else {
                toast.error("Failed to send verification code");
            }
        } catch {
            toast.error("An error occurred");
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        const cleanCode = sanitize(verificationCode);

        try {
            const codeCheckResponse = await fetch(import.meta.env.VITE_API_VERIFY_CODE_URL!, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: id, code: cleanCode })
            });

            if (codeCheckResponse.ok) {
                const userVerificationResponse = await fetch(import.meta.env.VITE_API_VERIFY_USER_URL!, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_id: id, email: sanitize(email) })
                });

                if (userVerificationResponse.ok) {
                    toast.success("Verification successful!");
                    setTimeout(closeWindow, 1500);
                } else {
                    toast.error("Invalid code");
                }
            } else {
                toast.error("Invalid verification code");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    return (
        <div className="app-container">
            <ToastContainer />
            <img
                src="https://practa.tech/Logo.png"
                alt="PRACTA Logo"
                className="logo"
            />

            <form
                className="form"
                onSubmit={showVerification ? handleVerify : handleSubmit}
            >
                {!showVerification ? (
                    <>
                        <label className="label">Email (optional)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="input"
                        />
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
                            onChange={setCaptchaValue}
                        />
                        <button className="button">{buttonText}</button>
                    </>
                ) : (
                    <>
                        <label className="label">Enter Verification Code</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Enter code"
                            required
                            className="input"
                        />
                        <button className="button">Verify</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default App;
