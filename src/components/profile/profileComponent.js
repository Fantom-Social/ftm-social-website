import { Component } from 'react';
import Navbar from '../navbar';
import contract from '../constants/ABI';

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: [], rowsToDisplay: 1 }
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
        this.setState({rowsToDisplay:this.state.rowsToDisplay + 1});
      }
    render() {
        return (
            <div>
                <Navbar />
                <div className='content'>
                    <h1>{this.state.name}</h1>
                    <p className='profileAddress'>@{this.props.params.address}</p><br></br>
                    <p>Followers <b>{this.state.followers}</b> Following <b>{this.state.following}</b></p><br></br>
                    <center><div className='linetwo'></div></center>
                    {this.state.posts.slice(0, this.state.rowsToDisplay).map((item, i) => <div key={i}>
                        <div>
                            <br></br>
                            <p className='b'><b></b> <a className='address'>@{item.author}  · {item.timeCreated}</a></p>
                            <br></br>
                            <p>{item.content}</p>
                        </div>
                        <br></br>
                        <center><div className='linetwo'></div></center>
                    </div>)}<br></br>
                    <a className="btn btn-primary" onClick={this.showMore}>Show More</a>
                </div>
            </div>
        )
    }
}