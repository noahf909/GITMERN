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
    // Function to format the phone number
    const formatPhoneNumber = (phone: string): string => {
        // Remove non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Check if the cleaned number has 10 digits
        if (cleaned.length === 10) {
        // Format as xxx-xxx-xxxx
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        
        // If not 10 digits, return the cleaned number (or handle the error)
        return phone;
    };
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
        const formattedPhone = formatPhoneNumber(formData.phone);
        // Create a new object without confirmPassword
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...dataToSend } = formData;

        // Make sure to include the formatted phone number in the dataToSend object
        dataToSend.phone = formattedPhone;

        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend) // Send form data excluding confirmPassword
            });

            if (!response.ok) {
                // If the response is not successful, throw an error
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Account created successfully:', data);
            setSuccess(true);
            setError(''); // Clear any previous error

        } catch (err) {
            console.error('Error creating account:', err);
            setError('Error creating account. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Create an Account</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">Account created successfully!</p>}
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
                            pattern="^(\+?\d{1,4}[\s\-]?)?(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$"
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
