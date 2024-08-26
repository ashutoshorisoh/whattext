import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';  
import { useAuth } from './AuthContext';
import Whattextlogo from './Assets/Whattextlogo.png';
import kitebanner from './Assets/kitebanner.jpg';
import { Ghost, LogIn as LogInIcon } from 'lucide-react';

async function createUser(authData) {
  const userObject = authData.user;
  const { uid, photoURL, displayName, email } = userObject;
  await setDoc(doc(db, "users", uid), {
      email,
      profile_pic: photoURL,
      name: displayName
  });
}

function Login() {
  const { setUserData, userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if userData is available
  if (userData) {
      navigate("/");
      return null; // Prevent rendering of the login page
  }

  const handleLogin = async () => {
      setIsLoading(true); // Set loading state to true
      try {
          const userData = await signInWithPopup(auth, new GoogleAuthProvider());
          await createUser(userData);
          const userObject = userData.user;
          const { uid, photoURL, displayName, email } = userObject;
          setUserData({
              id: uid,
              profile_pic: photoURL,
              email,
              name: displayName
          });
          navigate("/"); // Redirect after login
      } catch (error) {
          console.error("Login failed:", error);
      } finally {
          setIsLoading(false); // Set loading state to false
      }
  };

  return (
    <div className="h-screen flex flex-col justify-between relative bg-gray-500">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-500">
        <img 
          src={kitebanner} 
          alt="Site Banner" 
          className="object-cover w-full h-full"
          style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="w-full h-[20%] flex justify-center items-center"></div>

        <div className="flex-grow flex justify-center items-center">
          <div className="bg-slate-800 rounded-xl shadow-4xl p-10 w-[400px] h-[500px] flex flex-col justify-center items-center">
            <div className="text-center">
              <img src={Whattextlogo} alt="Icon" className="h-20 mx-auto" />
              <div className="flex justify-center items-center text-[#9c938e] text-center text-3xl font-bold mt-2">
                <Ghost style={{ height: '50px', width: '40px' }} />
              </div>
            </div>
            <div className="text-xl font-semibold mb-4"></div>
            <div className="text-[#f6a66d] text-center text-md from-neutral-400 mb-6">
              <i>Text the way you want :)</i>
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoading} // Disable button during loading
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
            >
              {isLoading ? "Loading..." : "Sign in with Google"}
              <LogInIcon className="ml-2 h-5 w-5" /> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
