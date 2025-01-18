import React from "react";
import { Link } from "react-router-dom";
import AddCard from "./AddCard";

const ShowList = ({ list, deleteList, addCard, deleteCard }) => {
  return (
    <div className="column is-one-third">
      <div className="box">
        <div className="level">
          <div className="level-left">
            <h2 className="title is-4">{list.list_name}</h2>
          </div>
          <div className="level-right">
            <button
              onClick={() => deleteList(list.id)}
              className="button is-danger"
            >
              ✖
            </button>
          </div>
        </div>
        <ul>
          {list.cards.map((card) => (
            <li key={card.id} className="notification is-light">
              <div className="level">
                <div className="level-left">{card.card_name}</div>
                <div className="level-right">
                  <Link
                    to={`/cards/edit/${card.id}`}
                    className="button is-small is-info"
                  >
                    ✎
                  </Link>
                  <button
                    onClick={() => deleteCard(card.id, list.id)}
                    className="button is-danger"
                  >
                    ✖
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <AddCard list_id={list.id} addCard={addCard} />
      </div>
    </div>
  );
};

export default ShowList;
