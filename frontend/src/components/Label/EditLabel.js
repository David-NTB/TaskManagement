import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditLabel = () => {
    const [label_name, setName] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getLabelById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateLabel = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/labels/${id}`, {
                label_name,
            });
            navigate("/labels");
        } catch (error) {
            console.log(error);
        }
    };

    const getLabelById = async () => {
        const response = await axios.get(`http://localhost:5000/labels/${id}`);
        setName(response.data.label_name);
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateLabel}>
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
                        <button type='submit' className='button is-success'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditLabel;