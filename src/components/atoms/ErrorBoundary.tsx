import React, { ReactNode } from 'react';
import logger from '../../services/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to an error reporting service
    //logger.error('ErrorBoundary caught an error',  {error, errorInfo });
    logger.error(`ErrorBoundary caught an error ${error}`);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render a fallback UI when an error occurs
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Our team has been notified.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

