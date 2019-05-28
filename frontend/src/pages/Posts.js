import React, { Component } from 'react';

import AuthContext from '../Context/auth';
import PostList from '../components/Posts/List/List';
import Spinner from '../components/Spinner/Spinner';

class Posts extends Component {

    state = {
        posts: [],
        isLoading: false,
        isSearching: false
    }
    isActive = true;
    static contextType = AuthContext;

    componentDidMount() {
        this.fetchPosts();
        this.props.fetchEvent(this.fetchPosts);
    }

    componentWillUnmount() {
        this.isActive = false;
    }

    fetchPosts = (args) => {
        console.log('111');
        this.setState({isLoading: true});
        const requestBody = {
            query: `
                query {
                    posts {
                        _id
                        Title
                        Comment
                        Filedata
                        createdAt
                        updatedAt
                        Author {
                            _id
                            UserID
                            Nickname
                        }
                    }
                }
            `
        };      
        fetch('http://localhost:8000/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.context.token
            }
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            let posts = resData.data.posts;
            if(args) {
                posts = posts.filter(post => post.Author._id === args.id);
            }

            if(this.isActive) {
                this.setState({posts: posts, isLoading: false});
            }
        })
        .catch(err => {
            console.log(err);
            if(this.isActive) {
                this.setState({isLoading: false});
            }
        });           
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading
                    ? (<Spinner />)
                    : (<div style={{textAlign: "center"}}><PostList posts={this.state.posts}/></div>)
                }
            </React.Fragment>
        );
    }
}

export default Posts;