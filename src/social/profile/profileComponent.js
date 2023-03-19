import { Component } from 'react';
import Navbar from '../misc/navbar/navbar';
import contract from '../../constants/ABI';
import follow from '../misc/follow/follow';
import reportPost from '../misc/reportPost';
import URL from '../../constants/websiteURL';
import "./profile.css";
import unfollow from '../misc/follow/unfollow';
import Line from '../misc/line/line';

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [], rowsToDisplay: 10 }
        this.showMore = this.showMore.bind(this);
        this.callData();
    }
    callData() {
        contract.methods.profiles(this.props.params.address).call().then((data) => {
            this.setState({ name: data.name })
        })
        contract.methods.getFollowers(this.props.params.address).call().then((data) => {
            this.setState({ followers: data.length })
        })
        contract.methods.getFollowing(this.props.params.address).call().then((data) => {
            this.setState({ following: data.length })
        })
        contract.methods.getPosts().call().then((posts) => {
            const result = Object.values(posts).filter(item => (item.author == this.props.params.address)).sort(function (a, b) { return b.id - a.id });
            this.setState({ posts: result })
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
                        <p>Welcome to this profile!</p>
                        <p><i>Profile Highlights</i></p>
                        <li>Check up on what your friends are up to</li>
                        <li>See news of your favorite blockchain companies</li>
                        <li>Find other developers and traders</li>
                    </div>
                    <br></br>
                    <Navbar />
                </div>
                <div className='center'>
                    <h1>{this.state.name}</h1>
                    <a className='profileAddress' href={URL + "app/profile/" + this.props.params.address}>@{this.props.params.address}</a><br></br>
                    <p>Followers <b>{this.state.followers}</b> Following <b>{this.state.following}</b></p>
                    <button className="followButton" onClick={() => { follow(this.props.params.address) }}>Follow</button>  <button className="followButton" onClick={() => { unfollow(this.props.params.address) }}>Unfollow</button>
                    <br></br>
                    <br></br>
                    <Line />
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
                    <a onClick={this.showMore} className="showMore">Show More</a>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </div>
            </div>
        )
    }
}