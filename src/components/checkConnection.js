const { ethereum } = window;

export default function checkConnection() {
    ethereum.request({ method: 'eth_accounts' }).then((data)=>{
        if (data.length === 0) {
            return false;
        } else {
            return true;
        }
    })
}