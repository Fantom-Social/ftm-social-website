import { Component } from "react";
import "./main.css";
import URL from "../../social/constants/websiteURL";

export default class Main extends Component {
    render() {
        return (
            <div>
                <div className="sectionOneGradient">
                <div className="sectionOne">
                    <center>
                        <h1>Open Source Freedom of Speech</h1>
                        <br></br>
                        <p>Blockchain is more than finance. FTM Social pushes decentralized storage to its limits on the fantom network. Fantom powers high-speed and inexpensive transactions for this application.</p>
                        <br></br>
                        <button className="enterAppButton"><a href={URL + "app"}>Enter App (Beta)</a></button>
                    </center>
                </div>
                </div>
                <div className="sectionTwo">
                    <p><b>How does it work?</b></p>
                    <p>All operations are done on-chain. FTM Social aims to provide the first <i>real</i> decentralized social media platform. Our platform is moderated by you. As the worlds beliefs are so unique and it is virtually impossible to decide what is morally right and what is wrong, we have left that up to you. By moderating in our governance you will get paid with our token. We encorporate many forms of modern blockchain technologies such as ERC20 and Governance to create a new and innovative platform for everyone. We chose the amazing fantom mainnet for its inexpensive and fast transactions. To limit network spam, you must lock 1 FTM for 14 days which can always be withdrawn to access the platform.</p>
                    <br></br>
                    <p><b>What is going to happen after beta?</b></p>
                    
                        <li>Likes + Commenting (Full Version)</li>
                        <li>UI/UX Complete Change (Full Version)</li>
                        <li>Mobile Compatibility (Full Version)</li>
                        <li>Multicall (Full Version)</li>
                        <li>Clear Error Messages (Full Version)</li>
                        <li>Walletconnect, Trust Wallet Connection, etc (Q2)</li>
                        <li>Social Media Algorythim (Full Version)</li>
                        <li>Roadmap</li>
                    
                    <p>We are going add amazing updates to the platform that we did not have time to add. We will continue to work on this project and make it the best it possibly can be and add more and more updates.</p>
                    <br></br>
                    <p><b>Who made this platform?</b></p>
                    <p>Hello! I am a beginner blockchain developer hoping to use the fantom chain to build my applications and to learn about blockchain, I have very big plans for this project! I hope to raise enough money from this project to go to a college, and to improve the blockchain space. I hope you have fun here!</p>
                </div>
                <div className="sectionThree">
                    <center><h1>Roadmap/Goals</h1></center>
                    <div className="column">
                    <p><b>Q1 2023</b></p>

                        <li>Beta Launch (Testnet)</li>
                        <li>Whitepaper and Documentation</li>
                        <li>Full Version Launch (Mainnet)</li>
                        <li>Coming soon...</li>
                        </div>
                        <div className="column">
                    <p><b>Q2 2023</b></p>
                        <li>Blog Launch</li>
                        <li>DeFi Launch</li>
                        <li>Coming soon...</li>
                        </div>
                        <div className="column">
                    <p><b>Q3 2023</b></p>
                        <li>NFTs Launch</li>
                        <li>Enhanced Marketing</li>
                        <li>Coming soon...</li>
                        </div>
                        <div className="column">
                    <p><b>Q4 2023</b></p>
                    <li>Coming soon...</li>
                    </div>
                </div>
                <center><div className="sectionFour">
                <a href="https://github.com/Fantom-Social"><img src="/assets/images/logos/github-mark.png" alt="github" width="30px" height="30px" /></a>
                    </div></center>
            </div>
        )
    }
}