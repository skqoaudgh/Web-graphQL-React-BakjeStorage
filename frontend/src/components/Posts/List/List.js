import React from 'react';

import Item from '../Item/Item';

import './List.css';

const uploadList = props => {
    const posts = props.posts.map(post => {
        return (
            <Item 
                key={post._id} 
                postId={post._id} 
                Author={post.Author.Nickname} 
                Title={post.Title} 
                Comment={post.Comment}
                Filedata={post.Filedata}
            />
        );
    });
    return <ul className="upload__list">{posts}</ul>   
};

export default uploadList;