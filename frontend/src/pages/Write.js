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

    encodeBase64ImageFile = (image) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = (event) => {
                resolve(event.target.result)
            }
            reader.onerror = (error) => {
                reject(error)
            }
        })
    }

    submitHandler = async (event) => {
        event.preventDefault();

        const title = this.titleRef.current.value;
        const comment = this.commentRef.current.value;
        const upload = this.imageData;

        if(title.trim().length === 0 || comment.trim().length === 0 || upload === null)
            return;

        const encodedImage = await this.encodeBase64ImageFile(this.imageData);

        let requestBody = {
            query: `
                mutation CreatePost($title: String!, $comment: String!, $filedata: String!) {
                    createPost(postInput: {Title: $title, Comment: $comment, Filedata: $filedata}) {
                        _id
                        Title
                        Comment
                        Filedata
                    }
                }
            `,
            variables: {
                title: title,
                comment: comment,
                filedata: encodedImage
            }
        };

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
            
            this.titleRef.current.value = "";
            this.commentRef.current.value = "";
            this.uploadRef.current.value = "";
            this.setState({
                file: null
            });
        })
        .catch(err => {
            console.log(err);
        });
    };

    imagePreviewHandler = (event) => {
        this.imageData = event.target.files[0];
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    imageDeleteHandler = () => {
        console.log(this.state.file);
        this.setState({
            file: null
        });
        this.uploadRef.current.value = "";
    }

    render() {
        return (
            <div className="write">
                <h1>박제자료 업로드</h1>
                <form onSubmit={this.submitHandler}>
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