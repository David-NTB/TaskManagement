import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLabel = () => {
    const [label_name, setName] = useState("");
    const navigate = useNavigate();

    const saveLabel = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/labels', {
                label_name,
            });
            navigate("/labels");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveLabel}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={label_name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
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

export default AddLabel;