import React, { Component } from 'react';

import './Write.css';

class Write extends Component {
    constructor(props) {
        super(props);

        this.titleRef = React.createRef();
        this.commentRef = React.createRef();
        this.uploadRef = React.createRef();

        this.state = {
            file: null
        }
    }

    componentDidMount() {

    }

    uploadPostHandler = async (event) => {
        event.preventDefault();

        if(!this.titleRef.current.value || !this.imageRef.current.value)
            return;

        const input = {
            title: this.titleRef.current.value,
            comment: this.commentRef.current.value,
            upload: this.uploadRef.current.value
        };
        this.image = input.upload;
        console.log(input);
    };

    imagePreviewHandler = (event) => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    imageDeleteHandler = () => {
        this.setState({
            file: null
        });
        this.uploadRef.current.value = "";
    }

    render() {
        return (
            <div className="write">
                <h1>박제자료 업로드</h1>
                <form onSubmit={this.uploadPostHandler}>
                    <div className="write-Form">
                        <input type="text" placeholder="제목을 입력하세요" style={{height:'2rem'}} ref={this.titleRef} />
                    </div>
                    <div className="write-Form">
                        <textarea rows="10" ref={this.commentRef}/>
                    </div>   
                    <div className="write-Form">
                        <label htmlFor="image">사진</label>
                        <input type="file" id="image" accept="image/*" multiple={false} ref={this.uploadRef} onChange={this.imagePreviewHandler.bind(this)}></input>
                    </div>
                    <div className="write-Form">
                        <img src={this.state.file} alt="" />
                        {this.state.file && <p><button onClick={this.imageDeleteHandler}>삭제</button></p>}
                    </div>    
                    <div className="write-Form">
                        <button type="submit">확인</button>
                    </div>            
                </form>
            </div>
        );
    }
}

export default Write;