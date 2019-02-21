import React, { Component } from "react";

class FooterIcon extends Component {
  render() {
    let { icon } = this.props;

    return (
      <th>
        <a href={icon.url}> <img src={icon.img}  alt={icon.name}></img> </a>
      </th>
    );
  }
}

export default FooterIcon;
