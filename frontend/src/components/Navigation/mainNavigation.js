import React from 'react';
import { NavLink } from 'react-router-dom';

import './mainNavigation.css';

const mainNavigation = props => {
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
                    <li><NavLink to="/list">홈</NavLink></li>
                    <li><NavLink to="/write">글쓰기</NavLink></li>
                </ul>
            </div>
        </header>
    );
};

export default mainNavigation;