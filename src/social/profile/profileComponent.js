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
            this.setState({ name : data.name })
        })
        contract.methods.getFollowers(this.props.params.address).call().then((data) => {
            this.setState({ followers : data.length })
        })
        contract.methods.getFollowing(this.props.params.address).call().then((data) => {
            this.setState({ following : data.length })
        })
        contract.methods.getPosts().call().then((posts) => {
            const result = Object.values(posts).filter(item => (item.author == this.props.params.address)).sort(function (a, b) { return b.id - a.id });
            this.setState({ posts: result })
        })
    }
    showMore() {
        this.setState({rowsToDisplay:this.state.rowsToDisplay + 10});
      }
    render() {
        return (
            <div>
                <Navbar />
                <div className='main'>
                    <h1>{this.state.name}</h1>
                    <a className='profileAddress' href={URL + "app/profile/" + this.props.params.address}>@{this.props.params.address}</a><br></br>
                    <p>Followers <b>{this.state.followers}</b> Following <b>{this.state.following}</b></p><br></br>
                    <button onClick={()=>{follow(this.props.params.address)}}>Follow</button><button onClick={()=>{unfollow(this.props.params.address)}}>Unfollow</button>
                    <Line />
                    {this.state.posts.slice(0,this.state.rowsToDisplay).map((item, i) => <div>
              <div key={i}>
                <br></br>
                <p className='big'><a className='postAddress' href={URL + "app/profile/" + item.author}>@{item.author}  · {item.timeCreated}</a></p>
                <br></br>
                <p >{item.content}</p>
              </div>
              <button onClick={() => reportPost(item.id)}>Report Post</button>
              <br></br>
              <Line /><br></br>
            </div>)}<br></br>
                    <a onClick={this.showMore}>Show More</a>
                </div>
            </div>
        )
    }
}