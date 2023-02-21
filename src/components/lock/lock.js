import { Component } from 'react';
import Navbar from '../navbar';
import rpc from '../constants/rpcUrl';
import contractAddress from '../constants/contractAddress';
import checkConnection from '../checkConnection';
import contract from '../constants/ABI';
import LockSelector from './lockDashboard';
const Web3 = require('web3');
const web3 = new Web3(rpc);
const { ethereum } = window;

export default class Lock extends Component {
    /*constructor(props) {
        super(props)
        this.state = {};
        this.lockFTM();
        if (window.ethereum) {
            ethereum.request({ method: 'eth_accounts' }).then((data)=>{
                if (data.length === 0) {
                    this.setState({ connected : <p>"Your metamask wallet is not connected. Please connect and lock to view the dashboard."</p>});
                } else {
                    this.setState({ connected : <lockDashboard />})
                }
            })
        } else {
            this.setState({ connected : <p>"Your have not download metamask browser extension."</p>})
        }
    }*/
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
                        }).catch((error) => alert(error))
                    });
                }

            }
        })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div class='content'>
                    <h1>Lock</h1>
                    <LockSelector />
                </div>
            </div>
        )
    }
}