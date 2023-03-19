import { Component } from 'react';
import contract from '../../constants/ABI';
import URL from '../../constants/websiteURL';
import Navbar from '../misc/navbar/navbar';
import "./dao.css";
import Line from '../misc/line/line';

export default class DAO extends Component {
    constructor(props) {
        super(props)
        this.state = { proposals: [], posts: [] };
        this.gatherData();
    }
    isEnded(status) {
        if (status === true) {
            return 'Closed';
        } else {
            return 'Open';
        }

    }
    gatherData() {
        contract.methods.getPosts().call().then((data) => {
            this.setState({ posts: data })
            console.log(data);
            contract.methods.getProposals().call().then((data) => {
                console.log(data)
                this.setState({ proposals: data });
            })
        })
    }
    render() {
        return (
            <div>
                <div className="left">
                    <div className="introduction">
                        <p>Welcome to the moderation dao!</p>
                        <p><i>Mod Dao Highlights</i></p>
                        <li>Moderate the platform to make the community a better place</li>
                        <li>Earn tokens by moderating the platform</li>
                        <li>Have your opinion be heard</li>
                    </div>
                    <br></br>
                    <Navbar />
                </div>
                <div className='center'>
                    <h1>Moderation Governance</h1>
                    {(this.state.proposals).map((item, i) => <div key={i}>
                        <h3><a href={URL + 'dao/proposals/' + item.id}>Proposal {item.id} - {this.isEnded(item.finished)}</a></h3>
                        <p><i>"{(this.state.posts[item.postId]).content}"</i> was posted on block {(this.state.posts[item.id]).timeCreated}. This proposal will end on {String(new Date(item.deadline * 1000).toLocaleString())}.</p>
                        <br></br>
                        <Line />
                    </div>)}
                    <p>There is nothing left!</p>
                </div>
            </div>
        )
    }
}