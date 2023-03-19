import URL from "../../../constants/websiteURL"
import { Component } from "react"
import sendError from "../notifications/error";
const {ethereum} = window;
export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {loggedIn : <></>}
        if (typeof window.ethereum !== 'undefined') {
           
        ethereum.request({method: 'eth_accounts'}).then((accounts) => {
            if (accounts.length > 0) {
                this.setState({loggedIn : <><a className="navOption" href={URL + "app/profile/" + accounts[0]}>Profile</a>
                <a className="navOption" href="#">Settings (Undeveloped)</a></>})
            }
        })
    }
}
    render() {
        return (
            <div className="navOptions">
                <a className="navOption topOption" href={URL}>Home</a>
                <a className="navOption" href={URL + "app/explorer"}>Explore</a>
                <a className="navOption" href={URL + "app/new"}>Create</a>
                <a className="navOption" href={URL + "app/lock"}>Lock</a>
                <a className="navOption bottomOption" href={URL + "app/dao"}>Moderate</a>
                {this.state.loggedIn}
            </div>
        )
    }
}