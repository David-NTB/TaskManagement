import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCard = () => {
    const { cardId } = useParams();
    const navigate = useNavigate();

    const [cardData, setCardData] = useState({
        id: "",
        card_name: "",
        date_start: "",
        date_end: "",
        description: "",
        list_id: "",
        label_id: "",
    });

    useEffect(() => {
        getCardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCardData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cards/${cardId}`);
            setCardData(response.data);
        } catch (error) {
            console.error("Error fetching card data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/cards/${cardId}`, cardData);
            navigate("/");
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    return (
        <div className="EditCard">
        <section className="section has-background-black">
            <div className="container">
                <h1 className="title has-text-light">Edit Card</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label has-text-light">Card Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="card_name"
                                value={cardData.card_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-light">Start Date</label>
                        <div className="control">
                            <input
                                className="input"
                                type="datetime-local"
                                name="date_start"
                                value={cardData.date_start}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-light">End Date</label>
                        <div className="control">
                            <input
                                className="input"
                                type="datetime-local"
                                name="date_end"
                                value={cardData.date_end}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-light">Description</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="description"
                                value={cardData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-light">List ID</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                name="list_id"
                                value={cardData.list_id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-light">Label ID</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                name="label_id"
                                value={cardData.label_id}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        </div>
    );
};

export default EditCard;
