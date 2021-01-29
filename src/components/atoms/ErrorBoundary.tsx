import React from 'react';
import logger from '../../services/logger';

interface IProps {
}
interface IState {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error:any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error:any, errorInfo:any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error: TypeError, errorInfo);
    logger.error(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
