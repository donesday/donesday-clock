import "babel-polyfill"
import React from 'react'

const Howto = React.createClass({
  render() {
    return (
      <div>
        <h1>#DONESDAY</h1>
        <div className="dd-rules">
          <ol>
            <li>List some of your long-dreaded tasks (both mundane ones and hard ones).</li>
            <li>Spend 25 minutes doing mundane tasks in silence and 15 minutes talking to somebody about the hard ones</li>
            <li>Celebrate!</li>
          </ol>
        </div>
      </div>
    )
  }
});

export default Howto;
