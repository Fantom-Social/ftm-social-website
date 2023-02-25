import React from "react";
import { Component } from "react";
import Options from './options';
import contract from "../constants/ABI";
import Navbar from "../misc/navbar";
import createFeedParams from './createFeedParams.js';
import './options.css'
import rpc from '../constants/rpcUrl.js'
import reportPost from "../misc/reportPost";
const { ethereum } = window;
const Web3 = require('web3');
const web3 = new Web3(rpc);

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], rowsToDisplay: 10, custom: []};
    this.showMore = this.showMore.bind(this);
    this.gatherData(this.state.custom);
    contract.methods.lastCall().call().then((data) => {console.log(data)})
  }
  gatherData(params) {
    //call contract to access data
    contract.methods.getPosts().call().then((posts) => {
      console.log(posts)
      //quickly sort data from latest to oldest and filter all account wanted
      const result = Object.values(posts).filter(item => (createFeedParams(params, item.author))).sort(function (a, b) { return b.id - a.id });
console.log(result);
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
      if (e.target.value === 'MyFeed' || e.target.value === undefined) {
        this.isConnected().then((data) => {
          if (data == true) {
            ethereum.request({ method: 'eth_accounts' }).then((addresses) => {
              contract.methods.getFollowing(addresses[0]).call().then((following) => {
                this.gatherData(following)
              }).catch((error) => {
                if (error == 'Error: Returned error: execution reverted: Profile does not exist.') {
                  alert('You must preform an action on the site to look at your feed.')
                } else {
                  alert(error)
                }
              })
            })
          } else {
            alert('To view your feed please connect your wallet so we can identify you.')
          }
        })
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
    console.log(this.state.selectedOption)
    if (this.state.selectedOption === 'Other') {
    this.gatherData(data)
    }
};
  render() {
    return (
        <div>
            <Navbar />
      <div className='content explorercontent'>
        <h1 onClick={this.hide}>Explorer</h1>
        {this.state.posts.slice(0,this.state.rowsToDisplay).map((item, i) => <div>
              <div key={i}>
                <br></br>
                <p className='b'><b></b> <a className='address' href={URL + "profile/" + item.author}>@{item.author}  · {item.timeCreated}</a></p>
                <br></br>
                <p >{item.content}</p>
              </div>
              <button onClick={() => reportPost(item.id)}>Report Post</button>
              <br></br>
              <center><div className='linetwo'></div></center>
            </div>)}<br></br>
            <a className="btn btn-primary" onClick={this.showMore}>Show More</a>
      </div>
      <div className='new'>
                <h2><strong>Options</strong></h2><br></br>
                <div style={{whiteSpace: 'nowrap'}}>
                <input type="radio" id="MyFeed" name="fav_language" value="MyFeed" defaultChecked  onChange={(e) => this.handleOnChange(e)}></input>
  <label htmlFor="MyFeed"> My Feed</label><br></br>
  </div>
  <input type="radio" id="Recommended" name="fav_language" value="Recommended"  onChange={(e) => this.handleOnChange(e)}></input>
  <label htmlFor="Recommended"> Recommended</label><br></br>
  <input type="radio" id="Other" name="fav_language" value="Other" onChange={(e) => this.handleOnChange(e)}></input>
  <label htmlFor="Other"> Other/Custom<br></br><input placeholder=" 0xA, 0xB, 0xC" className='otherInput' onChange={this.handleInput}></input></label>
            </div>
      </div>
    )
  }
}
export default Explore;