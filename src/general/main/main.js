import { Component } from "react";
import "./main.css";
import URL from "../../social/constants/websiteURL";

export default class Main extends Component {
    render() {
        return (
            <div>
                <div className="sectionOne">
                    <center>
                        <h1>Open Source Freedom of Speech</h1>
                        <br></br>
                        <p>Blockchain is more than finance. FTM Social pushes decentralized storage to its limits on the fantom network. Fantom powers high-speed and inexpensive transactions for this application.</p>
                        <br></br>
                        <button className="enterAppButton"><a href={URL + "app"}>Enter App (Beta)</a></button>
                    </center>
                </div>
                <br></br>
                <div className="sectionTwo">
                    <p><b>How does it work?</b></p>
                    <p>All operations are done on-chain. FTM Social aims to provide the first <i>real</i> decentralized social media platform. Our platform is moderated by you. As the worlds beliefs are so unique and it is virtually impossible to decide what is morally right and what is wrong, we have left that up to you. By moderating in our governance you will get paid with our token. We encorporate many forms of modern blockchain technologies such as ERC20 and Governance to create a new and innovative platform for everyone. We chose the amazing fantom mainnet for its inexpensive and fast transactions. To limit network spam, you must lock 1 FTM for 14 days which can always be withdrawn to access the platform.</p>
                    <br></br>
                    <p><b>What is going to happen after beta?</b></p>
                    <p>We are going add amazing updates to the platform that we did not have time to add earlier, such as likes and comment and other features of traditional social media platforms. We will also do a complete UI/UX change to make the site mobile compatible and more eye-catching. We will also add more connection options to site other than metamask. We will also design an algorithim for the social media site. We aim to continue to work on this project to make it the best it possibly can be and add more and more updates.</p>
                    <br></br>
                    <p><b>Who made this platform?</b></p>
                    <p>Hello! I am a beginner blockchain developer hoping to use the fantom chain to build my applications and to learn about blockchain, I have very big plans for this project! I hope to raise enough money from this project to go to a college, and to improve the blockchain space. I hope you have fun here!</p>
                </div>
                <div className="sectionThree">
                    <center><h1>Roadmap</h1></center>
                    <div className="column">
                    <p><b>Q1 2023</b></p>

                        <li>Beta Launch</li>
                        <li>Full Version Launch</li>
                        <li>Coming soon...</li>
                        </div>
                        <div className="column">
                    <p><b>Q2 2023</b></p>
                        <li>Expand into DeFi</li>
                        <li>Release Blog</li>
                        <li>Coming soon...</li>
                        </div>
                        <div className="column">
                    <p><b>Q3 2023</b></p>
                        <li>Expand into NFTs</li>
                        <li>Enhanced Marketingyui</li>
                        <li>Coming soon...</li>
                        </div>
                        <div className="column">
                    <p><b>Q4 2023</b></p>
                    <li>Coming soon...</li>
                    </div>
                </div>
                <center><div className="sectionFour">
                <a href="https://github.com/Fantom-Social"><img src="/assets/images/logos/github-mark.png" alt="image" width="30px" height="30px" /></a>
                    </div></center>
            </div>
        )
    }
}