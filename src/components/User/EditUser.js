import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [user_name, setName] = useState("");
    const [user_email, setEmail] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`, {
                user_name,
                user_email,
            });
            navigate("/users");
        } catch (error) {
            console.log(error);
        }
    };

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.user_name);
        setEmail(response.data.user_email);
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={user_name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={user_email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button type='submit' className='button is-success'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser;