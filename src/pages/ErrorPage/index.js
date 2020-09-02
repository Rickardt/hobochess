import React from "react";
import "./style.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: {} };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="error-container">
          <h2>Oh noes! Something went terribly wrong!</h2>
          <h4>
            Plz send this info to the developer and specify what you did to make
            this happen!
          </h4>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
