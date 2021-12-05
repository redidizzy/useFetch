import React from "react"

class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          An error has just occured, have you checked whether a provider is set
          for redux ?
        </h1>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
