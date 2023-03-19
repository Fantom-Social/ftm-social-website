import React from "react";
import { Component } from "react";
import contractAddress from '../../../constants/contractAddress';
import rpc from '../../../constants/rpcUrl.js'
import contract from '../../../constants/ABI.js'
import URL from "../../../constants/websiteURL";
import { Link, useNavigate } from 'react-router-dom';
const Web3 = require('web3');
const web3 = new Web3(rpc);
const { ethereum } = window;

export default function Navbar() {
    const navigate = useNavigate();
    const toComponentB = () => {
        navigate('/app/new', { state: {link : window.location.href} });
    }
    return (
        <div>
            <div className='navbar' id='a'>
                <center>
                    <div className="navbarComponent">
                        <a className='navbarLink' href={URL + 'app/lock'}><img src="/assets/images/icons/vault.png" className="icon" width="45px" height="40px" alt="vault"></img></a>
                    </div>
                    <div className="navbarComponent">
                        <a className='navbarLink' href={URL + 'app/explorer'}><img src="/assets/images/icons/telescope.png" className="icon" width="45px" height="40px" alt="vault"></img></a>
                    </div>
                    <div className="navbarComponent">
                        <a onClick={()=>{toComponentB()}}><img src="/assets/images/icons/pencil.png" className="icon" width="45px" height="40px" alt="vault"></img></a>
                    </div>

                    <div className="navbarComponent">
                        <a href={URL + 'app/dao'}><img src="/assets/images/icons/ballot.png" className="icon" width="45px" height="40px" alt="vault"></img></a>
                    </div>

                </center>

            </div>
        </div>
    )
}