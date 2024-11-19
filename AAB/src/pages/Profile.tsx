import './Profile.css'; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import the useUser hook

const Profile: React.FC = () => {
    const { user, setUser } = useUser(); // Access user and setUser from UserContext
    const navigate = useNavigate(); 

    const handleSignOut = () => {
        setUser(null); 
        navigate('/'); 
        localStorage.removeItem('user'); 
    };

    return (
        <div>
            <h1>PROFILE PAGE</h1>
            <button onClick={handleSignOut}>Sign Out</button>  
        </div>
    );
};

export default Profile;
