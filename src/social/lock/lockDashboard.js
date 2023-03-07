import {Component} from 'react';
import contract from '../../constants/ABI';
import URL from '../../constants/websiteURL';
import rpc from '../../constants/rpcUrl';
import Navbar from '../misc/navbar/navbar';
import contractAddress from '../../constants/contractAddress';
import "./lock.css"
const { ethereum } = window;
const Web3 = require('web3');
const web3 = new Web3(rpc);

export default class LockSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {value:0, end:0}
        this.unlockFTM = this.unlockFTM.bind(this);
        this.lockFTM = this.lockFTM.bind(this);
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
    connectWallet = async () => {
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
    unlockFTM() {
        this.connectWallet().then((data) => {
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
                            }).then((data) => { console.log(data) })
                        }
                    }
                } else {
                    ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                        web3.eth.estimateGas({
                            to: contractAddress,
                            from: ethereum.selectedAddress,
                            data: contract.methods.unlock().encodeABI(),
                            value: 1000000000000000000
                        }).then((data) => {
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
                                            data: contract.methods.unlock().encodeABI()
                                        },
                                    ],
                                })
                                .then((txHash) => alert(txHash))
                                .catch((error) => { alert(error) });
                        }).catch((error) => alert(error))
                    });
                }

            }
        })
    }
    lockFTM() {
        this.connectWallet().then((data) => {
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
                            }).then((data) => { console.log(data) })
                        }
                    }
                } else {
                    ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                        web3.eth.estimateGas({
                            to: contractAddress,
                            from: ethereum.selectedAddress,
                            data: contract.methods.lock().encodeABI(),
                            value: 1000000000000000000
                        }).then((data) => {
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
                                            data: contract.methods.lock().encodeABI()
                                        },
                                    ],
                                })
                                .then((txHash) => console.log(txHash))
                                .catch((error) => { console.log(error) });
                        }).catch((error) => console.log(error))
                    });
                }

            }
        })
    }

    render() {
        return(
            <div>
                <Navbar />
                <div className='main'>
                <div className="topHeading">
          <div className="headerText">
          <h1>Lock Dashboard</h1>
          <br></br>
          <p><b>Lock your fantom for access to the platform.</b></p>
          </div>
        </div>
                    <div className="dashboard">
                        <br></br>
                        <p>Lock Value: {this.state.value/(10**18)} FTM</p>
                        <p>Lock End: {new Date(this.state.end * 1000).toLocaleString()}</p>
                        <br></br>
                        <p><b>Actions</b></p>
                        <button className="lockbutton" onClick={()=> this.unlockFTM()}>Unlock</button><button className="lockbutton" onClick={()=>this.lockFTM()}>Lock</button>

                    </div>
                </div>
            </div>
        )
    }
}