import { Component } from "react";
import contract from "../../constants/ABI";
import Navbar from "../misc/navbar/navbar";
import contractAddress from "../../constants/contractAddress";
import rpc from "../../constants/rpcUrl";
import URL from "../../constants/websiteURL";
import "./dao.css"
const Web3 = require('web3');
const web3 = new Web3(rpc);
const { ethereum } = window;

export default class ProposalComponent extends Component {
    constructor(props) {
        super(props)
        this.voteYes = this.voteYes.bind(this);
        this.voteNo = this.voteNo.bind(this);
        contract.methods.lastCall().call().then((data)=>{console.log(data)});
        contract.methods.balanceOf("0x46451175070A75CfF85209A333368149DA85551b").call().then((data)=>console.log(data))
        this.state = {};
        this.getData();
        
    }
    getData() {
        contract.methods.getProposals().call().then((data) => {
            console.log(data[this.props.params.id]);
            this.setState({ deadline : String(new Date(data[this.props.params.id].deadline*1000).toUTCString())});
            this.setState({ id : Number(data[this.props.params.id].id)})
            this.setState({reporter:data[this.props.params.id].reporter});
            this.setState({desc : data[this.props.params.id].desc});
            contract.methods.getPosts().call().then((posts)=> {
                this.setState({postsData : posts[data[this.props.params.id].postId].content});
            })
        });
    }
    async connectWallet() {
        if (window.ethereum) { //check if Metamask is installed
            try {
                await window.ethereum.enable()
                return true;


            } catch (error) {
                return false;
            }

        } else {
            return false;
        }
    };
    voteNo() {
        this.connectWallet().then((data) => {
            console.log('2')
            if(data == true){
                if (window.ethereum.networkVersion != 4002) {
                    try {
                        window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: web3.utils.toHex(4002) }]
                        });
                    } catch (err) {
                        // This error code indicates that the chain has not been added to MetaMask
                        if (err.code === 4902) {
                            window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainName: 'Fantom Testnet Chain',
                                        chainId: web3.utils.toHex(4002),
                                        nativeCurrency: { name: 'tFTM', decimals: 18, symbol: 'tFTM' },
                                        rpcUrls: ['Https://rpc.ftm.tools']
                                    }
            
                                ]
                            });
                        } else {
                            
                        }
                    }
                } else {
                    console.log('3')
                    console.log(this.state.id)
            ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                web3.eth.estimateGas({
                    to: contractAddress,
                    from: ethereum.selectedAddress,
                    value: 1000000000000000000,
                    data: contract.methods.vote(false, Number(this.state.id)).encodeABI()
                })
                    .then((data) => {
                        console.log('4')
                        ethereum
                        .request({
                          method: 'eth_sendTransaction',
                          params: [
                            {
                              from: accounts[0],
                              to: contractAddress,
                              value: (1000000000000000000).toString(16),
                              gasPrice: web3.eth.gasPrice,
                              gas: '0x' + data,
                              data: contract.methods.vote(false, Number(this.state.id)).encodeABI()
                            },
                          ],
                        })
                        .then((txHash) => alert('Confirmed: ' + txHash))
                        .catch((error) => {console.log(error)});
                    })
                    .catch((error) => alert(error))
            })
          }
            }
        })
    }
    voteYes() {
        this.connectWallet().then((data) => {
            console.log('2')
            if(data == true){
                if (window.ethereum.networkVersion != 4002) {
                    try {
                        window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: web3.utils.toHex(4002) }]
                        });
                    } catch (err) {
                        // This error code indicates that the chain has not been added to MetaMask
                        if (err.code === 4902) {
                            window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainName: 'Fantom Testnet Chain',
                                        chainId: web3.utils.toHex(4002),
                                        nativeCurrency: { name: 'tFTM', decimals: 18, symbol: 'tFTM' },
                                        rpcUrls: ['Https://rpc.ftm.tools']
                                    }
            
                                ]
                            });
                        } else {
                            
                        }
                    }
                } else {
            ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                web3.eth.estimateGas({
                    to: contractAddress,
                    from: ethereum.selectedAddress,
                    value: 1000000000000000000,
                    data: contract.methods.vote(true, Number(this.state.id)).encodeABI()
                })
                    .then((data) => {
                        console.log('4')
                        ethereum
                        .request({
                          method: 'eth_sendTransaction',
                          params: [
                            {
                              from: accounts[0],
                              to: contractAddress,
                              value: (1000000000000000000).toString(16),
                              gasPrice: web3.eth.gasPrice,
                              gas: '0x' + data,
                              data: contract.methods.vote(true, Number(this.state.id)).encodeABI()
                            },
                          ],
                        })
                        .then((txHash) => alert('Confirmed: ' + txHash))
                        .catch((error) => {console.log(error)});
                    })
                    .catch((error) => alert(error))
            })
          }
            }
        })
                
    }

    render() {
        return(
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
            <div className='center'>
                <h1>Proposal Number {this.props.params.id}</h1>
                <p>Deadline: {this.state.deadline}</p>
                <p>Description: {this.state.desc}</p>
                <p>Reporter: {this.state.reporter}</p>
                <p>Content: "{this.state.postsData}"</p><br></br>

                <h3>Does this post follow your beliefs?</h3><br></br>
                <code>
                <h4>§ Posting</h4>
                <p>1. Our platform is very open to any views and opinions and is very breif. Any opinions can be expressed on the platform as long as the opinions do not reflect censorship or attempt to make others unheard. Descussion of sensetive topics is completely allowed as long as it is not preformed.</p>
                <p>2. We do not want anyone to be physically harmed so posts containing realistic threats which will lead to harm of an/a individual or group is not safe for the platform.</p></code>
                <br></br>
                <button onClick={this.voteYes}>Yes, this post is harmful.</button><button onClick={this.voteNo}>No, this post is safe.</button>
            </div>
            </div>
        )
    }
}