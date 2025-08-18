import React from 'react';

const UserList = ({ data, handleEdit, handleDelete }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Users List</h3>
            <ul className="space-y-3">
                {data.getUsers.map((user) => (
                    <li
                        key={user._id}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                    >
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(user)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;