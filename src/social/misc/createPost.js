import rpc from "../../constants/rpcUrl";
import chainId from "../../constants/chainId";
import contractAddress from '../../constants/contractAddress';
import contract from '../../constants/ABI.js'
import { toast } from 'react-toastify';
import sendError from "./notifications/error";
import sendSuccess from "./notifications/success";
const Web3 = require('web3');
const web3 = new Web3(rpc);
const { ethereum } = window;

export default async function post(content) {
    if (window.ethereum) { //check if Metamask is installed
        ethereum.request({ method: 'eth_requestAccounts' }).then((a) => {
            if (a.length > 0) {
                if (window.ethereum.networkVersion != 4002) {
                    try {
                        window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: web3.utils.toHex(4002) }]
                        });
                        postRequest(content)
                    } catch (err) {
                        if (err.code === 4902) {
                            window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainName: 'Fantom Chain',
                                        chainId: web3.utils.toHex(chainId),
                                        nativeCurrency: { name: 'FTM', decimals: 18, symbol: 'FTM' },
                                        rpcUrls: [rpc]
                                    }
    
                                ]
                            })
                        }
                        sendError("You must be on the fantom chain to use dapp.")
                    }
                } else {
                    
                    postRequest(content)
                }
            }
        }).catch((error) => {
            sendError("You must be connection to this site.")
        })
    } else {
        sendError("Please install metamask to your browser.")
    }
};
async function postRequest(content) {
    ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        web3.eth.estimateGas({
            to: contractAddress,
            from: ethereum.selectedAddress,
            data: contract.methods.createPost(content).encodeABI(),
            value: 0
        }).then((data) => {
            ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: accounts[0],
                            to: contractAddress,
                            value: (0).toString(16),
                            gasPrice: web3.eth.gasPrice,
                            gas: '0x' + data,
                            data: contract.methods.createPost(content).encodeABI()
                        },
                    ],
                })
                .then((txHash) => sendSuccess("Tx Hash: " + txHash))
                .catch((error) => { sendError(error) });
        }).catch((error) => { sendError(error) })
    });
}