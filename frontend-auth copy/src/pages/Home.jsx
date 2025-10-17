import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-lg">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome {user.firstname}!</h1>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Username:</span> {user.user.username}
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold">Email:</span> {user.user.email}
        </p>
        {user.bio && (
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Bio:</span> {user.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
