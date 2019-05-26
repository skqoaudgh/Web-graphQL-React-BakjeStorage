import React, { Component } from 'react';

import AuthContext from '../Context/auth';
import PostList from '../components/Posts/List/List';
import Spinner from '../components/Spinner/Spinner';

class Posts extends Component {

    state = {
        posts: [],
        isLoading: false
    }
    isActive = true;
    static contextType = AuthContext;

    componentDidMount() {
        console.log('mount 시작');
        this.fetchPosts();
        console.log('mount 끝');
    }

    componentWillUnmount() {
        this.isActive = false;
    }

    fetchPosts = () => {
        console.log('fetch 시작');
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
        console.log('fetch 직전');   
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
            const posts = resData.data.posts;
            if(this.isActive) {
                this.setState({posts: posts, isLoading: false});
            }
            console.log('fetch 끝');   
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