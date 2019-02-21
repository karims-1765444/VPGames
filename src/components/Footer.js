import React, { Component } from "react";
import FooterIcon from "./FooterIcon";

class Footer extends Component {
  componentDidMount() {}

  render() {
    let { icons } = this.props;
    var iconList = icons.map(icon=>{
      return(
        <FooterIcon icon={icon} />
      )
    });
    return (
      <div id="footer-content">
        <div id="fbox">
          <h2>About</h2>
          <p>This is Karim Salem's VPGame Solution</p>
          <a href="https://github.com/karims-1765444" class="button-style">More about developer</a> 
          <table id="footer-table">
            {iconList}
          </table>
        </div>
      </div>
    );
  }
}

export default Footer;
