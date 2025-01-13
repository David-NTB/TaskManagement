import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const LabelList = () => {
    const [labels, setLabel] = useState([]);

    useEffect(() => {
        getLabels();
    }, []);

    const getLabels = async () => {
        const response = await axios.get('http://localhost:5000/labels');
        setLabel(response.data);
    };

    const deleteLabel = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/labels/${id}`);
            getLabels();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to={'add'} className='button is-success'>Add New</Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labels.map((label, index) => (
                            <tr key={label.id}>
                            <td>{index + 1}</td>
                            <td>{label.label_name}</td>
                            <td>
                                <Link to={`edit/${label.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={()=> deleteLabel(label.id)} className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default LabelList;