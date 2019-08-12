import React, { Component } from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles'  

class ErrorBoundary extends Component {
  state = { hasErroed: false }

  static getDerivedStateFromError(error) {
    // process the error
    return { hasErroed: true }
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErroed === true) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png' />
          <ErrorImageText>This Page is Lost in Space</ErrorImageText>
        </ErrorImageOverlay>
      )
      
    }

    return this.props.children
  }
}

export default ErrorBoundary;