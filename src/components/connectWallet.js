const connectWallet = async () => {
    if (window.ethereum) { //check if Metamask is installed
          try {
              window.ethereum.enable().then(() => {
                this.setState({connectedButtonStatus: 'Connected'})
                  return true;
              }).catch((error) => alert(error));
               
          } catch (error) {
              alert("🦊 Connect to Metamask using the button on the top left.")
              return false;
          }
          
    } else {
      alert('🦊 You must install Metamask into your browser: https://metamask.io/download.html')
          return false;
        } 
  };
export default connectWallet;