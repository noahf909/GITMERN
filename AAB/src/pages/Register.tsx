import './Register.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define an interface for the form data
interface FormData {
    name: string;
    email: string;
    //address: string;
    phone: string;
    password: string;
    confirmPassword: string; // New field for confirming password
}

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        //address: '',
        phone: '',
        password: '',
        confirmPassword: '' // Initialize confirmPassword
    });

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    // Handle form input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setSuccess(false);
            return;
        }
        // Create a new object without confirmPassword
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...dataToSend } = formData;
        dataToSend.email.trim();
        dataToSend.email.toLowerCase();

        try {
            //send verification email
            const emailVerificationResponse = await fetch('/api/auth/email-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            }); 

            if (emailVerificationResponse.status === 409) {
                // User already exists
                setError('');
                setSuccess(false);
                setError('User already exists. Please log in.');
                return;
            }

            if (!emailVerificationResponse.ok) {
                throw new Error(`Email verification failed: ${emailVerificationResponse.status}`); 
            }

            const emailData = await emailVerificationResponse.json(); 
            console.log('Verification email sent:', emailData); 
            

            setError(''); // Clear any previous error
            setSuccess(true);

            setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
            });

        } catch (err) {
            console.error('Error sending verification email:', err);
            setError('Error creating account. Please try again.');
            setSuccess(false);
        }
    };
      
    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Create an Account</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Email Verification sent! Please check your email to verify.</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div> 
                    {/* 
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    */}
                    <div>
                    <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            pattern="^\d{3}-\d{3}-\d{4}$" // Matching format xxx-xxx-xxxx
                            title="Please enter a valid phone number (xxx-xxx-xxxx)."
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                    <div>
                        <p>
                        Already have an account?{' '}
                        <a href="/SignIn" className="signin-link">Sign in</a>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
