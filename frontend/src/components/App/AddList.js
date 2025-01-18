import React, { useState } from "react";

const AddList = ({ addList }) => {
  const [listName, setListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim() !== "") {
      addList(listName);
      setListName("");
    }
  };

  return (
    <form className="column is-one-third" onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Add a new List"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-primary">
            Add List
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddList;
