import './SignIn.css'; 
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import useUser

interface SignInData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<SignInData>({
        email: '',
        password: ''
    });

    const [error, setError] = useState<string>('');
    const navigate = useNavigate(); // Hook to navigate to different pages
    const { setUser } = useUser(); // Access setUser from context

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        console.log("Form data:", formData);
        try {
            const response = await fetch('/api/customers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Sign-in successful:', data);
            setError(''); // Clear any previous error
            setUser({ email: data.email }); // Set user data in context
            navigate('/'); // Redirect to home page

        } catch (err) {
            console.error('Error during sign-in:', err);
            setError('Invalid email or password. Please try again.');
        }
    };


    return (
        <div className="signin-container">
            <div className="signin-form">
                <h2>Sign In</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Sign In</button>
                    <div>
                        <p>
                            Don't have an account?{' '}
                            <a href="/Register" className="signup-link">Sign up</a>.
                        </p>
                        <p>
                            Forgot your password?{' '}
                            <a href="/forgotPassword" className="signup-link">Forgot Password</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
