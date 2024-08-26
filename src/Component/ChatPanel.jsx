import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { CircleFadingPlusIcon, MessageSquare, UserRoundIcon, Search, ToggleRight, ToggleLeft } from 'lucide-react';
import UserCard from './UserCard';
import Profile from "./Profile";
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from './DarkModeContext';

function ChatPanel() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const { userData } = useAuth();
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getDocs(collection(db, 'users'));
                const arrayOfUsers = data.docs.map((doc) => ({
                    userData: doc.data(),
                    id: doc.id,
                }));
                setUsers(arrayOfUsers);
                setFilteredUsers(arrayOfUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.userData.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const handleBackClick = () => setShowProfile(false);
    const handleUserClick = (user) => navigate(`/chat/${user.id}`);
    const handleProfileClick = () => setShowProfile(true);

    return (
        <div className={`w-[30vw] h-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} relative flex flex-col`}>
            {showProfile ? (
                <Profile onBack={handleBackClick} />
            ) : (
                <>
                    <div className={`py-2 px-4 border-r flex items-center gap-4 ${darkMode ? 'bg-green-800' : 'bg-green-400'}`}>
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                        >
                            <img
                                src={userData?.profile_pic || "/default-user.png"}
                                alt="profile picture"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </button>

                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                        >
                            {darkMode ? (
                                <ToggleLeft className="w-6 h-6 text-gray-300" />
                            ) : (
                                <ToggleRight className="w-6 h-6 text-gray-800" />
                            )}
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            <CircleFadingPlusIcon className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                            <MessageSquare className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                            <UserRoundIcon className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                        </div>
                    </div>

                    <div className={`p-4 border-b ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <div className="relative">
                            <Search className={`absolute top-3 left-3 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search users..."
                                className={`pl-10 p-2 border rounded w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        <div className="flex flex-col gap-3 p-4 overflow-y-auto">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(userObject => (
                                    <UserCard
                                        key={userObject.id}
                                        userObject={userObject}
                                        onClick={() => handleUserClick(userObject)}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-4">No users found</div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ChatPanel;
