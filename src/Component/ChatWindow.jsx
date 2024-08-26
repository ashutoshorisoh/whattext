import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase.config';
import { collection, query, onSnapshot, addDoc, orderBy, doc, getDoc } from 'firebase/firestore';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import { useDarkMode } from './DarkModeContext';

function ChatWindow() {
    const { chatid } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const scrollRef = useRef(null);
    const { darkMode } = useDarkMode();

    useEffect(() => {
        if (!chatid) return;

        const messagesRef = collection(db, 'chats', chatid, 'messages');
        const q = query(messagesRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [chatid]);

    useEffect(() => {
        if (!chatid) return;

        const fetchUser = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', chatid));
                if (userDoc.exists()) {
                    setSelectedUser(userDoc.data());
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [chatid]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const messagesRef = collection(db, 'chats', chatid, 'messages');
            await addDoc(messagesRef, {
                text: newMessage,
                timestamp: new Date(),
                senderId: 'currentUserId' // Replace with actual user ID
            });
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default Enter key behavior
            handleSendMessage();
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={`flex flex-col flex-1 h-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <header className={`p-4 border-b ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <h1 className="text-lg font-semibold">{selectedUser?.name || 'Chat'}</h1>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`p-2 ${msg.senderId === 'currentUserId' ? 'text-right' : 'text-left'}`}>
                        <div className={`p-2 rounded max-w-max inline-block ${
                            msg.senderId === 'currentUserId' 
                                ? 'bg-blue-500 text-white' 
                                : darkMode 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-300'
                        }`}>
                            {msg.text}
                        </div>
                        <div className="text-xs text-gray-500">{format(new Date(msg.timestamp.toDate()), 'hh:mm a')}</div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>
            <div className={`p-4 border-t ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className={`flex-1 p-2 border rounded-md ${darkMode ? 'bg-blue-500 text-black' : 'bg-white text-black'}`}
                    />
                    <button
                        onClick={handleSendMessage}
                        className={`ml-2 p-2 rounded-md bg-blue-500 text-white ${darkMode ? 'hover:bg-blue-600' : 'hover:bg-blue-700'}`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
