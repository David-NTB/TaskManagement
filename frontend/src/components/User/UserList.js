import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="App">
            <div className="container pt-5">
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a className="brand-name" href="http://localhost:3000/">
                            <p className="title">TASK MANAGEMENT</p>
                            <p className="subtitle">manage your task easier</p>
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-white" href="http://localhost:3000/">
                                    Home
                                </a>
                                <a className="button is-white" href="http://localhost:3000/labels/">
                                    Label
                                </a>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="button is-dark" href="">
                                    User
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <br />
                <div className="columns mt-5 is-centered">
                    <div className="column is-half">
                        <Link to={'add'} className='button is-success'>Add New</Link>
                        <table className="table is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.user_name}</td>
                                        <td>{user.user_email}</td>
                                        <td>
                                            <Link to={`edit/${user.id}`} className="button is-small is-info">Edit</Link>
                                            <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserList