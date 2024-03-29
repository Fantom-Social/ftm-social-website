import { Component } from "react";
import "./createPost.css"
import post from "../misc/createPost";
import URL from "../../constants/websiteURL";
import Navbar from "../misc/navbar/navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {postData : ""}
        this.handleInput = this.handleInput.bind(this);
        this.sendPost = this.sendPost.bind(this);
    }
    handleInput(e) {
        this.setState({ postData: e.target.value })
    }
    sendPost() {
        post(this.state.postData);
    }
    render() {
        return (
            <div>
             <div className="left">
                    <div className="introduction">
                        <p>Welcome to the post creation!</p>
                        <p><i>Post Highlights</i></p>
                        <li>Post new content for thousands of others to see</li>
                        <li>Reach a large audience of cryptocurrency community</li>
                        <li>Store data in a decentralized manner</li>
                    </div>
                    <br></br>
                    <Navbar />
                </div>
                <div className="center">
                    <h1>Create Post</h1>
                    <textarea className="createPost" onChange={this.handleInput} placeholder="What on your mind?">
                    </textarea>
                    <br></br>
                    <br></br>
                    <button onClick={this.sendPost} className="sendPostButton">Send Post</button>
                </div>
                <ToastContainer />
            </div>
        )
    }
}