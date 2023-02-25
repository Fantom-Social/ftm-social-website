import {Component} from 'react';
import './options.css'

export default class Options extends Component {
    handleOnChange(e) {
        console.log('selected option', e.target.value);
        this.setState({ selectedOption: e.target.value});
      }
    render() {
        return(
            <div className='new'>
                <h2><strong>Options</strong></h2><br></br>
                <div style={{whiteSpace: 'nowrap'}}>
                <input type="radio" id="MyFeed" name="fav_language" value="MyFeed" defaultChecked  onChange={(e) => this.handleOnChange(e)}></input>
  <label for="MyFeed"> My Feed</label><br></br>
  </div>
  <input type="radio" id="Recommended" name="fav_language" value="Recommended"  onChange={(e) => this.handleOnChange(e)}></input>
  <label for="Recommended"> Recommended</label><br></br>
  <input type="radio" id="Other" name="fav_language" value="Other" onChange={(e) => this.handleOnChange(e)}></input>
  <label for="Other"> Other/Custom<br></br><input placeholder=" 0xA, 0xB, 0xC" className='otherInput'></input></label>
            </div>
        )
    }
}