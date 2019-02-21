import React, { Component } from "react";

class Team extends Component {
  componentDidMount() {}

  render() {
    let { name, logo } = this.props;
    return (
    <div className= "team">
      <table>
        <tr>
          <p>{name}</p>
        </tr>
        <tr>
          <img src = {logo} alt={name}/> 
        </tr>
      </table>
    </div>
    )
  }
}

export default Team;
