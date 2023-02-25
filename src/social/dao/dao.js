import { Component } from 'react';
import contract from '../constants/ABI';
import URL from '../constants/websiteURL';
import Navbar from '../misc/navbar';

export default class DAO extends Component {
    constructor(props) {
        super(props)
        this.state = { proposals: [], posts: [] };
        this.gatherData();
    }
    isEnded(time) {
        if (time < Math.round((new Date()).getTime() / 1000)) {
            return 'Closed';
        } else {
            return ['Open'];
        }

    }
    gatherData() {
        contract.methods.getPosts().call().then((data) => {
            this.setState({ posts: data })
            console.log(data);
            contract.methods.getProposals().call().then((data) => {
                let result = Object.values(data).filter(item => item.deadline > Math.round((new Date()).getTime() / 1000));
                console.log(result);
                this.setState({ proposals: result });
            })
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className='content'>
                    <h1>DAO</h1>
                    <p>Vote and sumbit proposals to help keep the community safe and earn money.</p><br></br><br></br>
                    {(this.state.proposals).map((item, i) => <div key={i}>
                        <h3><a href={URL + 'dao/proposals/' + item.id}>Proposal {item.id} - {this.isEnded(item.deadline)}</a></h3>
                        <p><i>"{(this.state.posts[item.postId]).content}"</i> was posted on block {(this.state.posts[item.id]).timeCreated}. This proposal will end on {String(new Date(item.deadline * 1000).toLocaleString())}.</p>
                        <br></br>
                        <center><div className='linetwo'></div></center>
                    </div>)}
                </div>
            </div>
        )
    }
}