import "./explorerv2.css"
import URL from "../../constants/websiteURL";
import contract from "../../constants/ABI";
import unfollow from "../misc/follow/unfollow";
import follow from "../misc/follow/follow";
import Line from "../misc/line/line";
import reportPost from "../misc/reportPost";

import { Component } from 'react';

export default class Explorer extends Component {
    constructor(props) {
        super(props)
        this.state = { rowsToDisplay: 10, posts: [] }
        this.showMore = this.showMore.bind(this);
        contract.methods.getPosts().call().then((posts_) => {
            let sorted = Object.values(posts_).sort(function (a, b) { return b.id - a.id });
            this.setState({ posts: sorted });
        })
    }
    showMore() {
        this.setState({ rowsToDisplay: this.state.rowsToDisplay + 10 });
    }
    render() {
        return (
            <div>
                <div className="left">
                    <div className="introduction">
                        <p>Welcome to our explorer!</p>
                        <p><i>Explorer Highlights</i></p>
                        <li>Have fun while viewing posts of others and yourself</li>
                        <li>Report posts to earn real money</li>
                        <li>Keep up on the latest news</li>
                    </div>
                    <br></br>
                    <div className="navOptions">
                        <a className="navOption topOption" href={URL}>Home</a>
                        <a className="navOption" href={URL + "app/explorer"}>Explore</a>
                        <a className="navOption" href={URL + "app/new"}>Create</a>
                        <a className="navOption" href={URL + "app/lock"}>Lock</a>
                        <a className="navOption bottomOption" href={URL + "app/dao"}>Moderate</a>
                        <a className="navOption" href="#">Profile (Undeveloped)</a>
                        <a className="navOption" href="#">Settings (Undeveloped)</a>
                    </div>
                </div>

                <div className="center">
                    <h1>Explorer</h1>
                    {this.state.posts.slice(0, this.state.rowsToDisplay).map((item, i) => <div key={i} className="post">
                        <br></br>
                        <div class="dropdown">
                            <div className="menuDrop dropbtn"><center><b>…</b></center></div>
                            <div class="dropdown-content">
                                <a onClick={() => { reportPost(item.id) }}>Report Post</a>
                                <a onClick={() => { follow(item.author) }}>Follow</a>
                                <a onClick={() => { unfollow(item.author) }}>Unfollow</a>
                            </div>
                        </div>
                        <br></br>
                            <div className='limited'><a className="breakWord noOverflow" href={URL + "app/profile/" + item.author}>@{item.author} </a></div>
                            <br></br>
                        <p>{item.content}</p>
                        <Line />
                    </div>)}<br></br>
                    <button onClick={this.showMore} className="showMore">Show More</button>
                </div>
            </div>
        )
    }
}