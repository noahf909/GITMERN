import './Register.css'; // Reuse the same CSS
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [userData, setUserData] = useState<any>(null); // User data from token
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const verifyEmailToken = async () => {
            if (isVerifying) return;
            setIsVerifying(true);

            try {
                const response = await fetch(`/api/auth/verify-email/${token}`, {
                    method: 'POST',
                });

                if (!response.ok) {
                    throw new Error('Email verification failed. Token may have expired.');
                }

                const data = await response.json();
                setMessage('Email verified successfully! Click the button below to complete registration.');
                setUserData(data.customer); // Set user data for registration
                setError('');
            } catch (err: any) {
                console.error('Error verifying email:', err.message);
                setMessage('');
            } finally {
                setIsVerifying(false);
            }
        };

        if (token) {
            verifyEmailToken();
        } else {
            setError('Invalid token.');
        }
    }, [token, isVerifying]);

    const handleSubmit = async () => {
        if (isSubmitting || !userData) return;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), // Pass decoded user data
            });

            if (!response.ok) {
                throw new Error('Account creation failed.');
            }

            setMessage('Account created successfully! Redirecting to login...');
            setError('');
            setTimeout(() => navigate('/SignIn'), 3000);
        } catch (err: any) {
            console.error('Error creating account:', err.message);
            setError('Failed to create account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Email Verification</h2>
                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}
                {userData && (
                    <button onClick={handleSubmit} disabled={isSubmitting} className="register-button">
                        {isSubmitting ? 'Registering...' : 'Complete Registration'}
                    </button>
                )}
                <p>
                    Redirecting to login... If not redirected, <a href="/SignIn" className="signin-link">click here</a>.
                </p>
            </div>
        </div>
    );
};


export default VerifyEmail;
