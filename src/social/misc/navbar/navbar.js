import React from "react";
import { Component } from "react";
import contractAddress from '../../constants/contractAddress';
import rpc from '../../constants/rpcUrl.js'
import contract from '../../constants/ABI.js'
import URL from "../../constants/websiteURL";
import "./navbar.css"
const Web3 = require('web3');
const web3 = new Web3(rpc);
const { ethereum } = window;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { connectedButtonStatus: "Connect", function: this.connectWallet }
        this.handleInput = this.handleInput.bind(this);
        this.sendPost = this.sendPost.bind(this);
    }

    directWindow() {
        if (document.getElementById("mypopup").style.display == 'block') {
            var popup = document.getElementById('mypopup');
            popup.style.display = 'none';
        } else {
            var popup = document.getElementById('mypopup');
            popup.style.display = 'block';
        }
    }
    handleInput(e) {
        this.setState({ postData: e.target.value })
    }
    connectWallet = async () => {
        contract.methods.lastCall().call().then((data) => { console.log(data) })
        if (window.ethereum) { //check if Metamask is installed
            try {
                await window.ethereum.enable()
                this.setState({ connectedButtonStatus: "Connected" })
                return true;


            } catch (error) {
                this.setState({ connectedButtonStatus: "Connect" })
                return false;
            }

        } else {
            this.setState({ connectedButtonStatus: "Connect" })
            return false;
        }
    };
    sendPost() {
        this.connectWallet().then((data) => {
            console.log(data)
            if (data == true) {
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
                            value: 0,
                            data: contract.methods.createPost(this.state.postData).encodeABI()
                        })
                            .then((data) => {
                                ethereum
                                    .request({
                                        method: 'eth_sendTransaction',
                                        params: [
                                            {
                                                from: accounts[0],
                                                to: contractAddress,
                                                value: 0,
                                                gasPrice: web3.eth.gasPrice,
                                                gas: '0x' + data,
                                                data: contract.methods.createPost(this.state.postData).encodeABI()
                                            },
                                        ],
                                    })
                                    .then((txHash) => {
                                        this.directWindow()
                                        alert('Confirmed: ' + txHash)
                                    })
                                    .catch((error) => { console.log(error) });
                            })
                            .catch((error) => alert(error))
                    })
                }
            }
        })

    }
    render() {
        return (
            <div>
                <div className='navbar' id='a'>
                    <button className='connect' onClick={this.state.function}>{this.state.connectedButtonStatus}</button>
                    <br></br>
                    <center><a className='navbarLink' href={URL + 'app/lock'}>Lock</a></center><br></br>
                    <center><a className='navbarLink' href={URL + 'app/explorer'}>Explore</a></center><br></br>
                    <center><a className='navbarLink' onClick={this.directWindow}>Create</a></center><br></br>
                    <center><a href={URL + 'app/dao'}><p className='right'>DAO</p></a></center>

                </div>
                <div className='sendPost' id='mypopup'>
                    <p className="closeButton" onClick={this.directWindow}>×</p>
                    <center>
                        <textarea className='postText' placeholder='whats up?' onChange={this.handleInput}></textarea>
                        <button className='sendPostButton' onClick={this.sendPost}>Send Post</button>
                    </center>
                </div>
            </div>
        )
    }
}
export default Navbar;