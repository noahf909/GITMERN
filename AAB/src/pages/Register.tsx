import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Register.css';

// Interface to type the form data (the object containing the fields)
interface FormData {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const Register: React.FC = () => {
    // State for form data, initialized with empty strings
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    // State for error messages and success status
    const [error, setError] = useState<string>(''); // error will be a string
    const [success, setSuccess] = useState<boolean>(false); // success will be a boolean

    // Handle input field changes and update corresponding state
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault(); // Prevent form from refreshing the page

        try {
            // Sending POST request with form data to the server
            const response = await fetch('/api/customers'/*'/api/login'*/, { // Correct API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`); // Throw error if response is not okay (e.g., 400 or 500)
            }

            const data = await response.json(); // Parse the JSON response
            console.log('Account created successfully:', data);
            setSuccess(true); // Set success state to true if the account is created
            setError('');
        } catch (err) {
            console.error('Error creating account:', err);
            setError('Error creating account. Please try again.'); // Set error state if there's a problem
            setSuccess(false);
        }
    };

    return (
        <div className="register-form">
            <h2>Create an Account</h2>
            
            {/* Conditionally render the error message */}
            {error && <p className="error">{error}</p>}

            {/* Conditionally render the success message */}
            {success && <p className="success">Account created successfully!</p>}

            {/* Form for user registration */}
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
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;
