import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

// Custom hook to use authentication context
export function useAuth() {
    return useContext(AuthContext);
}

function AuthWrapper({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    // Default user document if Firestore document does not exist
                    const userDoc = docSnap.exists() ? docSnap.data() : {};

                    const { uid, photoURL, displayName, email } = currentUser;

                    setUserData({
                        id: userDoc.uid || uid,
                        profile_pic: userDoc.profile_pic || photoURL || '', // Correctly set profile_pic
                        email: userDoc.email || email || '',
                        name: userDoc.name || displayName || ''
                    });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUserData(null); // Set userData to null if error occurs
                }
            } else {
                setUserData(null); // Set userData to null if no currentUser
            }
            setLoading(false); // Set loading to false once the user state is determined
        });

        // Cleanup function to unsubscribe from auth state changes
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUserData(null); // Clear userData on logout
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Loading indicator while user state is being determined
    }

    return (
        <AuthContext.Provider value={{ setUserData, userData, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthWrapper;
