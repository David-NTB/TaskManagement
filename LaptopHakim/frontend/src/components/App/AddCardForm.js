import React, { useState } from "react";

const AddCardForm = ({ list_id, addCard }) => {
    const [cardName, setCardName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardName.trim() !== "") {
            addCard(list_id, cardName);
            setCardName("");
        }
    };

    return (
        <form className="pt-5" onSubmit={handleSubmit}>
            <div className="field">
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Add a new card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="submit" className="button is-primary">
                        Add Card
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddCardForm;