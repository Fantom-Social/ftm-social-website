import {Component} from 'react';
import contract from '../constants/ABI';
import URL from '../constants/websiteURL';
import rpc from '../constants/rpcUrl';
import Navbar from '../misc/navbar';
import contractAddress from '../constants/contractAddress';
const { ethereum } = window;
const Web3 = require('web3');
const web3 = new Web3(rpc);

export default class LockSelector extends Component {
    constructor(props) {
        super(props)
        this.checkForConnection = this.checkForConnection.bind(this);
        this.unlockFTM = this.unlockFTM.bind(this);
        this.lockFTM = this.lockFTM.bind(this);
        this.state = { dashboard : <div><p>You must be connected to access the lock dashboard.</p><br></br><button onClick={this.checkForConnection}>Retry</button></div>}
        this.checkForConnection();
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
                                .then((txHash) => console.log(txHash))
                                .catch((error) => { console.log(error) });
                        }).catch((error) => console.log(error))
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
    
    checkForConnection() {
        ethereum.request({ method: 'eth_accounts' }).then((data) => {
            if (data.length === 0) {
                //Not connected
            } else {
                console.log('g')
                contract.methods.getLock(data[0]).call().then((lockdata) => {
                    console.log(lockdata)
                    if (Number(lockdata.value) === 0) {
                        
                        this.setState({dashboard:<p>An automatic transaction should have been sent to your metamask wallet. Lock one 1 FTM for 14 days to have access to the platform.</p>})
                        this.lockFTM();
                        
                    } else {
                        this.setState({dashboard:<div><p><b>Your Lock Dashboard</b></p><p>Your lock of {lockdata.value} ends on {String(new Date(lockdata.end*1000))}</p><button onClick={this.unlockFTM}>Unlock</button></div>})
                    }
                })
            }
        })
    }
    render() {
        return(
            <div>
                <Navbar />
                <div className='content'>
                    <h1>Lock Dashboard</h1>
                    {this.state.dashboard}
                </div>
            </div>
        )
    }
}