import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../Context/auth';

import './mainNavigation.css';

const activeStyle = {
    color: 'white',
    background: '#a50928',
    borderRadius: '5px'
}

const mainNavigation = (props) => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-Navigation">
                    <div className="mainNav__Leftside">
                        <h1>박제자료 저장소</h1>
                        <form>
                            <input type="text" placeholder="검색" style={{width: "23rem", height: "1.5rem"}}></input>
                            <button>검색</button>
                        </form>
                    </div>
                    <div className="mainNav__Rightside">
                        <ul>
                            <li><NavLink to={{
                                pathname:"/post",
                                state: {
                                    isSearching: false
                                }
                            }} strict activeStyle={activeStyle} exact>홈</NavLink></li>
                            <li><NavLink to="/write" activeStyle={activeStyle} exact>글쓰기</NavLink></li>
                            <li><NavLink to={{
                                pathname:"/post/",
                                state: {
                                    isSearching: true,
                                    userId: context.userId
                                }
                            }} strict activeStyle={activeStyle} exact>마이페이지</NavLink></li>
                            <li><button onClick={context.logout.bind(this)}>로그아웃</button></li>
                        </ul>
                    </div>
                </header>
            );
        }}
    </AuthContext.Consumer>
);

export default mainNavigation;