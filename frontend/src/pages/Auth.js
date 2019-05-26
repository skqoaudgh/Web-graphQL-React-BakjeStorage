import React, { Component } from 'react';

import AuthNavigation from '../components/Navigation/authNavigation';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './Form.css';

class Auth extends Component {
    state = {
        isSignupFail: false
    }

    constructor(props) {
        super(props);
        this.idRef = React.createRef();
        this.nicknameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordRef2 = React.createRef();
        this.authCodeRef = React.createRef();
    }
    
    submitHandler = async (event) => {
        event.preventDefault();

        const id = this.idRef.current.value;
        const nickname = this.nicknameRef.current.value;
        const password = this.passwordRef.current.value;
        const password2 = this.passwordRef2.current.value;
        const authCode = this.authCodeRef.current.value;

        if(id.trim().length === 0 || nickname.trim().length === 0 || password.trim().length === 0 || authCode.trim().length === 0)
            return;

        if(password !== password2) {
            this.setState({isSignupFail: true});
            return;
        }

        let requestBody = {
            query: `
                mutation SignUp($id: String!, $nickname: String!, $password: String!, $authCode: String!) {
                    signUp(userInput: {UserID: $id, Password: $password, Nickname: $nickname, Authcode: $authCode}) {
                        _id
                        UserID
                        Nickname                     
                    }
                }
            `,
            variables: {
                id: id,
                nickname: nickname,
                password: password,
                authCode: authCode
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
            console.log(resData);
            
            this.idRef.current.value = "";
            this.nicknameRef.current.value = "";
            this.passwordRef.current.value = "";
            this.passwordRef2.current.value = "";
            this.authCodeRef.current.value = "";
        })
        .catch(err => {
            console.log(err);
            this.setState({isSignupFail: true});
        });           
    }

    onConfirm = () => {
        this.setState({isSignupFail: false});
    }

    render() {
        return (
            <React.Fragment>
                <AuthNavigation />
                {this.state.isSignupFail && <React.Fragment>
                <Backdrop />
                <Modal
                    title="회원가입 실패"
                    onConfirm={this.onConfirm}
                    canConfirm
                    confirmText="확인">
                        입력 정보를 다시 확인해주세요.
                </Modal></React.Fragment>}
                {!this.state.isSignupFail && <div className="form-page">
                    <h1>새 게정 만들기</h1>
                    <h2>항상 지금처럼 무료로 즐기실 수 있습니다.</h2>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-control">
                            <input type="text" placeholder="아이디" style={{width:'19.1rem'}} ref={this.idRef}></input>
                            <input type="text" placeholder="닉네임" style={{width:'20rem'}} ref={this.nicknameRef}></input>
                        </div>
                        <div className="form-control">

                        </div>
                        <div className="form-control">
                            <input type="password" placeholder="새 비밀번호" style={{width:'19.1rem'}} ref={this.passwordRef}></input>
                            <input type="password" placeholder="새 비밀번호 확인" style={{width:'20rem'}} ref={this.passwordRef2}></input>
                        </div>
                        <div className="form-control">
                            <input type="text" placeholder="인증코드" ref={this.authCodeRef}></input>
                        </div>
                        <div className="form-control">
                            <button type="submit">가입하기</button>
                        </div>
                    </form>
                </div>}
            </React.Fragment>
        );
    }
}

export default Auth;