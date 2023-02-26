import React from "react";
import { Component } from "react";
import contract from "../constants/ABI";
import Navbar from "../misc/navbar/navbar";
import createFeedParams from './createFeedParams.js';
import './options.css'
import rpc from '../constants/rpcUrl.js'
import reportPost from "../misc/reportPost";
import "./explorer.css";
import Line from "../misc/line/line";
const { ethereum } = window;
const Web3 = require('web3');
const web3 = new Web3(rpc);

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], rowsToDisplay: 10, custom: []};
    this.showMore = this.showMore.bind(this);
    
    contract.methods.getAddresses().call().then((addresses) => {
      this.gatherData(addresses)
    })
  }
  gatherData(params) {
    //call contract to access data
    contract.methods.getPosts().call().then((posts) => {
      //quickly sort data from latest to oldest and filter all account wanted
      const result = Object.values(posts).filter(item => (createFeedParams(params, item.author))).sort(function (a, b) { return b.id - a.id });
this.setState({posts : result})
    })
  }
  async isConnected() {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts.length)
    if (accounts.length != 0) {
        return (true);
    } else {
        return (false);
    }
}
  showMore() {
    this.setState({rowsToDisplay:this.state.rowsToDisplay + 10});
  }
  handleOnChange(e) {
    console.log('selected option', e.target.value);
    this.setState({ selectedOption: e.target.value});
    if (e.target.value === 'Other') {
      this.gatherData(this.state.custom);
    } else {
      if (e.target.value === 'MyFeed') {
        ethereum.request({ method: 'eth_requestAccounts' }).then((accounts)=> {
          if (accounts.length == 0) {
              alert("Please connect your metamask wallet.")
          } else  {
            contract.methods.getFollowing(accounts[0]).call().then((following)=>{
              this.gatherData(following);
            }).catch((error)=>{

              contract.methods.profiles(accounts[0]).call().then((profile)=>{
                if (profile.owner != accounts[0]) {
                  alert("You must have locked FTM at least once.")
                } else {
                  alert("An unknown error occured. " + error)
                }
              })
            })
          }
        });
      } else {
        if (e.target.value === 'Recommended') {
          contract.methods.getAddresses().call().then((addresses) => {
            this.gatherData(addresses)
          })
        }
      }
    }
  }
  handleInput = event => {
    let data = event.target.value
    data = data.split(',')
    this.setState({ custom: data });
    if (this.state.selectedOption === 'Other') {
    this.gatherData(data)
    }
};
  render() {
    return (
        <div>
            <Navbar />
      <div className='mainExplorer'>
        <div className="topHeading">
          <div className="headerText">
          <h1>Explorer</h1>
          <br></br>
          <p><b>Access the world of blockchain.</b></p>
          </div>
        </div>
        {this.state.posts.slice(0,this.state.rowsToDisplay).map((item, i) => <div>
              <div key={i}>
                <br></br>
                <p className='big'><a className='postAddress' href={URL + "app/profile/" + item.author}>@{item.author}  · {item.timeCreated}</a></p>
                <br></br>
                <p >{item.content}</p>
              </div>
              <button onClick={() => reportPost(item.id)}>Report Post</button>
              <br></br>
              <Line /><br></br>
            </div>)}<br></br>
            <a onClick={this.showMore}>Show More</a>
      </div>
      <div className='optionsBox'>
                <h2><strong>Options</strong></h2><br></br>
                <div style={{whiteSpace: 'nowrap'}}>
                <input type="radio" id="MyFeed" name="fav_language" value="MyFeed"  onChange={(e) => this.handleOnChange(e)}></input>
  <label htmlFor="MyFeed"> My Feed</label><br></br>
  </div>
  <input type="radio" id="Recommended" name="fav_language" value="Recommended" defaultChecked onChange={(e) => this.handleOnChange(e)}></input>
  <label htmlFor="Recommended"> Recommended</label><br></br>
  <input type="radio" id="Other" name="fav_language" value="Other" onChange={(e) => this.handleOnChange(e)}></input>
  <label htmlFor="Other"> Other/Custom<br></br><input placeholder=" 0xA, 0xB, 0xC" className='otherInput' onChange={this.handleInput}></input></label>
            </div>
      </div>
    )
  }
}
export default Explore;