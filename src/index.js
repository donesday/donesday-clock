import "babel-polyfill"
import React, {Component} from 'react'
import ReactDom from 'react-dom'

import DonesdayClock from './donesdayClock';

require('./style.css')

class App extends Component{

  render() {
    return (
      <div id="container">
        <div className="dd-header">
          <img src="img/logo.png" />
        </div>
        <DonesdayClock />
        <div className="dd-footer">
          2016 | <a href="http://georgestrakhov.com">George Strakhov</a> | <a href="https://creativecommons.org/licenses/by/4.0/">Some Rights Reserved</a> | <a href="https://github.com/donesday/donesday-clock/">Fork me on github</a>
        </div>
      </div>
    )
  }

}

const content = document.getElementById('app')

ReactDom.render(<App />, content)
