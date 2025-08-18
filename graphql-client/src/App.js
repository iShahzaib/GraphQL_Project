import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from './services/graphql';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const [addUser] = useMutation(ADD_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);

    const [form, setForm] = useState({ name: '', email: '', _id: null });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email) return alert("All fields required");

        if (form._id) {
            await updateUser({ variables: { id: form._id, name: form.name, email: form.email } });
        } else {
            await addUser({ variables: { name: form.name, email: form.email } });
        }

        setForm({ name: '', email: '', _id: null });
        refetch();
    };

    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email, _id: user._id });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        await deleteUser({ variables: { id } });
        refetch();
    };

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    GraphQL Users (CRUD)
                </h2>

                {/* Form */}
                <UserForm
                    form={form}
                    setForm={setForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>

            {/* Users List */}
            <UserList
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default App;