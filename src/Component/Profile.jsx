import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { storage, db } from '../../firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { ArrowLeft, Pencil } from 'lucide-react';

function Profile({ onBack }) {
    const { userData, logout, setUserData } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            // Ensure the profile picture URL is properly set
            setProfilePic(userData.profile_pic || '/default-profile-pic-url.png');  // Use local or default image
        }
    }, [userData]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && userData && userData.id) {
            const fileRef = ref(storage, `profile_pics/${userData.id}/${file.name}`);

            try {
                await uploadBytes(fileRef, file);
                const downloadURL = await getDownloadURL(fileRef);

                // Update profile picture in state and Firestore
                setProfilePic(downloadURL);
                const userDocRef = doc(db, 'users', userData.id);
                await updateDoc(userDocRef, { profile_pic: downloadURL });
                setUserData(prev => ({ ...prev, profile_pic: downloadURL }));
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
        }
    };

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-white w-[30vw]'>
            {/* Top-bar */}
            <div className="bg-gray-400 py-2 px-4 border-r flex justify-between items-center gap-2">
                <button onClick={onBack}>
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <div className="flex items-center gap-6 mx-4">
                    <div className="text-lg font-bold text-white">Profile</div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="p-4">
                <div className="flex flex-col items-center relative">
                    <div className="relative">
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="rounded-full h-24 w-24 object-cover mb-4"
                        />
                        <button
                            onClick={handleEditClick}
                            className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-300 shadow-md hover:bg-gray-100"
                            aria-label="Edit Profile Picture"
                        >
                            <Pencil className="h-6 w-6 text-gray-700" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            ref={fileInputRef}
                        />
                    </div>
                    <h2 className="text-xl font-semibold mt-2">{userData.name || 'No Name'}</h2>

                    <button
                        onClick={handleLogout}
                        className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
