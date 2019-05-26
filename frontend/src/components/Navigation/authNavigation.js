import React, { Component } from 'react';

import AuthContext from '../../Context/auth';

import './authNavigation.css';

class authNavigation extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.idRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();

        const id = this.idRef.current.value;
        const password = this.passwordRef.current.value;

        if(id.trim().length === 0 || password.trim().length === 0)
            return;

        let requestBody = {
            query: `
                query Login($id: String!, $password: String!) {
                    login(UserID: $id, Password: $password) {
                        UserId
                        token
                        tokenExpiration
                    }
                }
            `,
            variables: {
                id: id,
                password: password
            }
        }
        fetch('http://localhost:8000/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            if(resData.data.login.token) {
                this.context.login(
                    resData.data.login.UserId,
                    resData.data.login.token,
                    resData.data.login.tokenExpiration
                );
            }
        })
        .catch(err => {
            console.log(err);
        }); 
    }

    render() {
        return (
            <header className="auth-Navigation">
                <div className="authNav__Leftside">
                    <h1>박제자료 저장소</h1>
                </div>
                <div className="authNav__Rightside">
                    <form onSubmit={this.submitHandler}>
                        <div className="authNav__form">
                            <label htmlFor="id">아이디</label>
                            <input type="text" id="id" ref={this.idRef}></input>
                        </div>
                        <div className="authNav__form">
                            <label htmlFor="password">비밀번호</label>
                            <input type="password" id="password" ref={this.passwordRef}></input>
                        </div>
                        <div className="authNav__form">
                            <button type="submit">로그인</button>
                        </div>
                    </form>
                </div>
            </header>
        );
    }
};

export default authNavigation;