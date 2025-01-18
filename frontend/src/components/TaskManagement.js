import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowList from "./App/ShowList";
import AddList from "./App/AddList";

const TaskManagement = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lists");
      const formattedLists = response.data.map((list) => ({
        id: list.id,
        list_name: list.list_name,
        cards: [],
      }));
      setLists(formattedLists);
      if (formattedLists.length > 0) {
        loadCards(formattedLists);
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

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

  const loadCards = async (formattedLists) => {
    const updatedLists = await Promise.all(
      formattedLists.map(async (list) => {
        const cards = await getCardsForList(list.id);
        return { ...list, cards };
      })
    );
    setLists(updatedLists);
  };

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

  const deleteList = async (list_id) => {
    try {
      await axios.delete(`http://localhost:5000/lists/${list_id}`);
      setLists((prevLists) => prevLists.filter((list) => list.id !== list_id));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

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

  const deleteCard = async (card_id, list_id) => {
    try {
      await axios.delete(`http://localhost:5000/cards/${card_id}`);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === list_id
            ? { ...list, cards: list.cards.filter((card) => card.id !== card_id) }
            : list
        )
      );
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="App has-background-black">
        <div className="container pt-5">
          <nav className="navbar is-black">
            <div className="navbar-brand">
              <a className="brand-name" href="http://localhost:3000/">
                <p className="title has-text-light">TASK MANAGEMENT</p>
                <p className="subtitle has-text-light">manage your task easier</p>
              </a>
            </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                     {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="button is-light" href="">
                      Home
                    </a>
                    <a className="button is-black" href="http://localhost:3000/labels/">
                      Label
                    </a>
                    <a className="button is-black" href="http://localhost:3000/users/">
                      User
                    </a>
                </div>
              </div>
            </div>
          </nav>
          <br />
          <div className="columns is-multiline">
            {lists.map((list) => (
              <ShowList
                key={list.id}
                list={list}
                deleteList={deleteList}
                addCard={addCard}
                deleteCard={deleteCard}
              />
            ))}
            <AddList addList={addList} />
          </div>
        </div>
    </div>
  );
};

export default TaskManagement;
