import React from 'react';
import { Link } from "react-router-dom";

function UserCard({ userObject }) {
    return (
        <div key={userObject.id}>
            <Link
                to={`/${userObject.id}`}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors duration-200"
            >
                {/* Render user data here */}
                <img
                    src={userObject.userData.profile_pic || "/default-user.png"}
                    alt={`${userObject.userData.name}'s profile`}
                    className="rounded-full h-12 w-12 object-cover"
                />
                <h2 className="text-lg font-semibold">{userObject.userData.name}</h2>
            </Link>
        </div>
    );
}

export default UserCard;
