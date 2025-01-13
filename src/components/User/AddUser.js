import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [user_name, setName] = useState("");
    const [user_email, setEmail] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                user_name,
                user_email,
            });
            navigate("/users");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveUser}>
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
                        <button type='submit' className='button is-success'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser;