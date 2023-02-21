const Web3 = require('web3');
const web3 = new Web3('https://rpc.ankr.com/fantom/');
export default async function change(chainId) {
    if (window.ethereum.networkVersion !== chainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainId) }]
            });
        } catch (err) {
            // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainName: 'Fantom Testnet Chain',
                            chainId: web3.utils.toHex(chainId),
                            nativeCurrency: { name: 'tFTM', decimals: 18, symbol: 'tFTM' },
                            rpcUrls: ['Https://rpc.ftm.tools']
                        }

                    ]
                });
            } else {
                
            }
        }
    }
}