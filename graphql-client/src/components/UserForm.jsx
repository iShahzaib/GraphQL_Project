import React from "react";

const UserForm = ({ form, setForm, handleChange, handleSubmit}) => {
    return (
        <div className="space-y-4">
            <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex justify-between">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {form._id ? 'Update User' : 'Add User'}
                </button>
                {form._id && (
                    <button
                        onClick={() => setForm({ name: '', email: '', _id: null })}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserForm;