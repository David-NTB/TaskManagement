import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    const [lists, setList] = useState([]);

    useEffect(() => {
            getlists();
        }, []);

    const getlists = async () => {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.get('http://localhost:5000/lists');
    };

    // eslint-disable-next-line no-unused-vars
    const addCard = (listId, content) => {
        const newCard = { id: Date.now(), content };
        setList((prevList) =>
          prevList.map((list) =>
            list.id === listId
              ? { ...list, cards: [...list.cards, newCard] }
              : list
          )
        );
      };

    return (
        <div>
            <div className='hero is-small is-link'>
                <div className='hero-body'>
                    <p className='title'>TITLE</p>
                    <p className='subtitle'>SUBTITLE</p>
                </div>
            </div>

            <div className='section has-background-danger'>
                <div className="columns is-mobile is-multiline">
                    <div className="column has-background-success is-2">
                        {lists.map((lists) => (
                            <div key={lists.id}>
                                <div className='has-background-primary'>
                                    {lists.id}
                                </div>

                                <div className='has-background-primary'>
                                    Card
                                </div>
                                <div className='has-background-primary'>
                                    + addcard
                                </div>
                            </div>
                        ))

                        };
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Test