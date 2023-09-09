import React from "react";

const Account = ({ user }) => {
  return (
    <div className="bg-gray-500 flex flex-col items-center min-h-screen">
      <br />
      <div className="flex bg-navy justify-center items-center">
        <div className="user-card bg-gray-800 rounded-lg p-6 shadow-lg max-w-xl mx-auto border border-white"> {/* Added border classes */}
          <h2 className="text-3xl font-bold mb-6 text-white text-navy">Your Profile</h2>
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Username</label>
            {/* <p className="italic text-white">{user.username}</p> */}
          </div>
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Email</label>
            {/* <p className="italic text-white">{user.email}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
