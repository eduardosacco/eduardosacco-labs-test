import React, { Component } from 'react';
import ModelViewer from '@metamask/logo';

// Based on: https://bit.cloud/lil/baseth/metamask-logo/~code
export default class MetamaskAnimatedLogo extends Component {
  componentDidMount() {
    this.viewer = ModelViewer({
      // Dictates whether width & height are px or multiplied
      pxNotRatio: true,
      height: 100,
      width: 100,
      followMouse: true,
    });
    console.log(this.viewer);

    if (!this.el.hasChildNodes()) {
      this.el.appendChild(this.viewer.container);
    }
  }

  componentWillUnmount() {
    this.viewer.stopAnimation();
  }

  render() {
    return (
        <div ref={(el) => (this.el = el)} />
    );
  }
}
