import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Book = () => {
    const {type} = useParams();
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {type} Room.</h1>
            <p>Want a <Link to="/home">different one?</Link> </p>
        </div>
    );
};

export default Book;