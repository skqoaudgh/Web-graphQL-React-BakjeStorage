import React, { Component } from 'react';

import './authNavigation.css';

class authNavigation extends Component {

    constructor(props) {
        super(props);

        this.idRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();

        const id = this.idRef.current.value;
        const password = this.passwordRef.current.value;

        console.log(id, password);
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