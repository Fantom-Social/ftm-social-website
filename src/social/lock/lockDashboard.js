import {Component} from 'react';
import contract from '../../constants/ABI';
import URL from '../../constants/websiteURL';
import rpc from '../../constants/rpcUrl';
import Navbar from '../misc/navbar/navbar';
import contractAddress from '../../constants/contractAddress';
import "./lock.css"
import lock from '../misc/lock/lock';
import unlock from '../misc/lock/unlock';
const { ethereum } = window;
const Web3 = require('web3');
const web3 = new Web3(rpc);

export default class LockSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {value:0, end:0}
        if (typeof window.ethereum !== 'undefined') {
            ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
                contract.methods.getLock(accounts[0]).call().then((data)=> {
                    this.setState({end : data.end});
                    this.setState({value: data.value})
            })
            });
        } else {
            alert("Please install metamask to your browser.")
        }
    }
    render() {
        return(
            <div>
                <div className="left">
                    <div className="introduction">
                        <p>Welcome to the lock dashboard!</p>
                        <p><i>Lock Highlights</i></p>
                        <li>Manage your access to the platform</li>
                        <li>Unlock your funds if you want</li>
                        <li>Create posts and moderate the platform</li>
                    </div>
                    <br></br>
                    <Navbar />
                </div>
                <div className='center'>
                    <h1>Lock</h1>
                    <div className="dashboard">
                        
                        <p>Lock Value: {this.state.value/(10**18)} FTM</p>
                        <p>Lock End: {new Date(this.state.end * 1000).toLocaleString()}</p>
                        <br></br>
                        <button className="lockButton" onClick={()=> unlock()}>Unlock</button>
                        <br></br>
                        <br></br>
                        <button className="lockButton" onClick={()=>lock()}>Lock</button>

                    </div>
                </div>
            </div>
        )
    }
}