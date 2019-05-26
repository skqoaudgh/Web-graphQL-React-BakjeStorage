import React from 'react';

import './Item.css';

const Item = props => (
    <li key={props.postId} className="uploads__item">
        <div>
            <div className="uploads__top"><p>{props.Title}</p><h1>by {props.Author}</h1></div>
            <h2>{props.Comment}</h2>
        </div>
        <div>
            <img src={props.Filedata} alt="" />
        </div>
    </li>
);

export default Item;