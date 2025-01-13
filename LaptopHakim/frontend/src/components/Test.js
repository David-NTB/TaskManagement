import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Test.css";

const Test = () => {
  const [lists, setLists] = useState([]);

  // Fetch all lists on component mount
  useEffect(() => {
    getLists();
  }, []);

  // Fetch lists from the server
  const getLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lists");
      const formattedLists = response.data.map((list) => ({
        id: list.id,
        list_name: list.list_name,
        cards: [],
      }));
      setLists(formattedLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  // Add a new list
  const addList = async (list_name) => {
    try {
      const response = await axios.post("http://localhost:5000/lists", {
        list_name,
      });
      const newList = {
        id: response.data.id,
        list_name: response.data.list_name,
        cards: [],
      };
      setLists((prevLists) => [...prevLists, newList]);
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  // Delete a list
  const deleteList = async (list_id) => {
    try {
      await axios.delete(`http://localhost:5000/lists/${list_id}`);
      setLists((prevLists) => prevLists.filter((list) => list.id !== list_id));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  // Fetch cards for a specific list
  const getCardsForList = async (list_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cardList?list_id=${list_id}`
      );
      return response.data.map((card) => ({
        id: card.id,
        card_name: card.card_name,
      }));
    } catch (error) {
      console.error(`Error fetching cards for list ${list_id}:`, error);
      return [];
    }
  };

  // Load cards for all lists
  const loadCards = async () => {
    const updatedLists = await Promise.all(
      lists.map(async (list) => {
        const cards = await getCardsForList(list.id);
        return { ...list, cards };
      })
    );
    setLists(updatedLists);
  };

  // Load cards when lists are updated
  useEffect(() => {
    if (lists.length > 0) loadCards();
  }, [lists]);

  // Add a new card to a specific list
  const addCard = async (list_id, card_name) => {
    try {
      const response = await axios.post("http://localhost:5000/cards", {
        card_name,
        list_id,
      });
      const newCard = {
        id: response.data.id,
        card_name: response.data.card_name,
      };
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === list_id
            ? { ...list, cards: [...list.cards, newCard] }
            : list
        )
      );
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  // Delete a card
  const deleteCard = async (card_id) => {
    try {
      await axios.delete(`http://localhost:5000/cards/${card_id}`);
      setLists((prevLists) =>
        prevLists.map((list) => ({
          ...list,
          cards: list.cards.filter((card) => card.id !== card_id),
        }))
      );
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="App has-background-grey-dark">
      <section className="section">
        <div className="container">
          <h1 className="title">Task Management</h1>
          <div className="columns lists-container">
            {lists.map((list) => (
              <div key={list.id} className="column is-one-third">
                <div className="box list-box">
                  <div className="level">
                    <div className="level-left">
                      <h2 className="title is-4">{list.list_name}</h2>
                    </div>
                    <div className="level-right">
                      <button
                        onClick={() => deleteList(list.id)}
                        className="button is-dark"
                      >
                        X
                      </button>
                    </div>
                  </div>
                  <ul>
                    {list.cards.map((card) => (
                      <li key={card.id} className="notification is-light">
                        <div className="level">
                          <div className="level-left has-text-black">{card.card_name}</div>
                          <div className="level-right">
                            <button
                              onClick={() => deleteCard(card.id)}
                              className="button is-light"
                            >
                              X
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <AddCardForm list_id={list.id} addCard={addCard} />
                </div>
              </div>
            ))}
            <AddListForm addList={addList} />
          </div>
        </div>
      </section>
    </div>
  );
};

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

const AddListForm = ({ addList }) => {
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

export default Test;
