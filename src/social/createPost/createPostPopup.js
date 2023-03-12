import { Component } from "react";
import "./createPost.css"
import post from "../misc/createPost";

export default class CreatePostPopup extends Component {
    constructor(props) {
        super(props)
        this.handleInput = this.handleInput.bind(this);
        this.sendPost = this.sendPost.bind(this);
        document.getElementsByTagName('html')[0].style.overflow = "hidden";
        document.getElementsByTagName('body')[0].style.overflow = "hidden";
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
                <iframe src={this.props.link}></iframe>
                <div id="overlay"></div>
                <div className="sendPost">
                    <a href={this.props.link}>×</a>
                    <br></br>
                    <textarea placeholder='whats up?' className="postArea" onChange={this.handleInput}></textarea>
                    <button className='sendPostButton' onClick={this.sendPost}>Send Post</button>
                </div>
            </div>
        )
    }
}